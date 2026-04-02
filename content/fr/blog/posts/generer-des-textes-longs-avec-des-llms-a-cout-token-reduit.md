---
title: Generation de textes longs avec des LLMs a faible cout token Rapport d'ingenierie
description: Enseignements d'ingenierie issus de pipelines LLM proches de la production avec retrieval borne, segmentation et forte observabilite.
date: 2026-04-02
draft: false
translationKey: long-text-lower-token-cost
tags:
  - llm
  - prompt-engineering
  - retrieval
  - optimisation
---
Quand nous avons commence a generer des textes longs via une pipeline LLM, le probleme principal semblait etre la qualite du modele. En realite, c'etait surtout un sujet de systems engineering: taille des requetes, variance de latence, timeouts proxy et sorties non bornees.

Ce rapport resume ce qui a fonctionne dans des conditions proches de la production quand les objectifs etaient:

- Generer des textes longs de maniere fiable,
- Garder la consommation de tokens previsible,
- Reduire le risque de timeout,
- Preserver la qualite sur des sorties multi-sections.

## 1) Pourquoi le single-shot prompting a echoue

L'approche naive etait une grosse requete unique avec le texte source complet et beaucoup de contexte. Cela a provoque trois problemes:

- Cout eleve en tokens d'entree a chaque execution,
- Forte variance de latence selon la longueur du prompt et la charge du modele,
- Erreurs gateway 504 meme quand le modele finissait par produire une reponse.

Lecon cle: une reponse modele correcte ne sert a rien si un composant amont expire avant. La fiabilite doit etre concue au niveau pipeline, pas seulement au niveau modele.

## 2) Architecture qui a stabilise la generation longue

Nous sommes passes d'une generation one-shot a une pipeline bornee, en plusieurs etapes.

### Etape A: Contexte retrieval, avec budgets stricts

Au lieu d'envoyer tout le materiel associe, nous avons:

- Decoupe les sources en segments bases sur les paragraphes,
- Genere les embeddings une fois puis mis en cache,
- Selectionne seulement les chunks les plus pertinents pour chaque requete,
- Applique des limites: total de chunks, chunks par fichier, longueur des extraits, budget caracteres du retrieval.

Cela a reduit le gaspillage de tokens repete et ameliore la predictibilite des requetes.

### Etape B: Budgeting adaptatif des entrees

Avant chaque appel modele, nous calculons un budget dynamique a partir de:

- Longueur du contenu courant,
- Longueur du prompt,
- Overhead attendu du system prompt.

Si l'entree depasse le budget:

- Reduire d'abord le contexte retrieval,
- Puis tronquer le contenu principal avec une strategie de middle-trim controlee,
- Conserver la tete et la fin pour garder le cadrage et le contexte de conclusion.

Cette approche donne une meilleure qualite qu'une troncature brutale d'un seul cote.

### Etape C: Generation segmentee pour les gros textes

Pour les grands documents, nous arretons la generation en passe unique.

Flux:

- Decouper le texte en segments qui se chevauchent,
- Reviser chaque segment independamment avec un max output plus bas,
- Fusionner dans l'ordre d'origine,
- Lancer un passage final de coherence sur le texte fusionne.

On remplace ainsi un appel fragile et massif par plusieurs appels plus fiables.

### Etape D: Passage de coherence

Apres la fusion des segments, nous appliquons un court passage global centre sur:

- Cohérence terminologique,
- Alignement du ton,
- Normalisation du style.

Le prompting regle est essentiel ici: pas de nouveau contenu, pas de reecriture structurelle, pas de meta-commentaire.

## 3) Controles tokens et latence les plus utiles

Les controles les plus impactants ont ete:

- Max output tokens par appel, ajuste selon la taille d'entree,
- Budget retrieval reduit pour les documents volumineux,
- Moins de chunks retrieval pour les tres grosses entrees,
- Mode segmente active au-dessus d'un seuil de contenu,
- Contexte retrieval raccourci pendant les appels segmentes,
- Cache d'embeddings persistant indexe par hash de contenu.

Le cache est critique. Sans lui, les workflows long-form paient les embeddings a repetition et perdent l'essentiel du gain d'efficacite.

## 4) Controles operationnels et observabilite

Nous avons ajoute un logging structure autour de chaque etape:

- Metadonnees de requete: model, input_chars, context_chars, max_tokens, timeout,
- Metadonnees retrieval: cache hits, fichiers nouvellement embeddes, chunks selectionnes, temps ecoule,
- Metadonnees segment: nombre de segments, taille de sortie par segment, statut du passage de coherence,
- Metadonnees outcome: modele source, raison du fallback, temps ecoule par fichier.

Cela a transforme le debogage, passant de l'intuition a un ajustement mesurable.

Par exemple, quand les appels echouaient exactement a la limite de timeout, nous savions qu'il s'agissait d'un comportement de timeout local ou client, et non d'un probleme de qualite de sortie du modele.

## 5) Pattern d'implementation pratique

Strategie simple pour les developpeurs:

- Precalculer les limites a partir de la longueur du contenu et du prompt,
- Construire le contexte retrieval sous ces limites,
- Si le contenu depasse le seuil, activer le mode segmente,
- Appliquer un max output tokens a chaque appel modele,
- Fusionner et, si besoin, executer le passage de coherence,
- Persister la proposition et les metadonnees pour observabilite et retries.

Pseudo-flux:

```text
compute limits
retrieval_context = bounded_retrieval(...)
if segmented_mode:
  segments = split_with_overlap(...)
  revised_segments = map(revise_segment)
  merged = join(revised_segments)
  final = consistency_pass(merged)
else:
  final = revise_single_pass(...)
store result with source and error metadata
```

## 6) Compromis et points de vigilance

Le mode segmente ameliore la fiabilite et la maitrise des couts, mais peut introduire des artefacts de fusion si le chevauchement est trop faible. Un chevauchement court plus un passage de coherence regle generalement ce point.

Un trimming trop agressif degrade la qualite. Il faut toujours reduire d'abord le retrieval, puis le contenu seulement si necessaire.

Un max output trop haut augmente le risque de timeout, trop bas produit des sorties tronquees. Utiliser des bandes dynamiques selon la taille d'entree plutot qu'une valeur fixe.

## 7) Defaults recommandes pour commencer

- Seuil de segmentation: environ 26k caracteres,
- Taille de segment: environ 5k caracteres avec 300-350 de chevauchement,
- Budget retrieval: plus eleve pour les petits documents, plus bas pour les grands,
- Max output tokens: plus bas pour petits documents, modere pour grands documents, avec plafond,
- Timeout: timeout modele au-dessus du temps moyen de reponse, timeout gateway au-dessus du timeout modele.

## Conclusion essentielle

La generation long-form avec faible cout token est surtout un probleme de design de pipeline, pas une astuce de prompting. Le pattern gagnant est:

- Recuperer moins mais mieux,
- Budgeter agressivement les entrees,
- Segmenter les gros travaux,
- Plafonner les sorties,
- Instrumenter l'ensemble.

Cette combinaison donne des couts plus faibles, moins de 504 et une qualite de texte long plus previsible pour des workflows d'ingenierie reels.
