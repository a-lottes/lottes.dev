---
title: "Il manquait à mon agent un critère d'arrêt"
description: "Pourquoi une boucle de fonctionnalité ne convient pas à une migration, ce qui me manquait pour un long travail mécanique, et à quoi ressemble un agent qui s'arrête de lui-même."
date: 2026-10-04
draft: false
translationKey: agent-stop-condition
tags:
  - agents
  - claude-code
  - workflows-agentiques
---
Ma boucle dans aSPARK est construite autour d'une user story. Spec, plan, réalisation, revue, QA, release, et à chaque passage c'est moi qui décide. Pour une fonctionnalité, c'est exactement ce qu'il faut.

Puis vient le travail qui n'est pas une story. Remplacer un vieux module par un nouveau, morceau par morceau. Fermer tous les findings Major encore ouverts. L'objectif est un état vérifiable : tout au vert. D'ici là, le même geste se répète vingt fois, quarante fois.

J'avais deux mauvaises options. Habiller le tout en fausse story, avec des critères d'acceptation dont personne n'a besoin. Ou écrire « continue » à l'agent et regarder.

« Continue » est le prompt qui me coûte le plus de confiance. L'agent n'a aucun objectif vérifiable, donc il s'arrête quand il a l'impression d'avoir fini. Il n'a pas de budget, donc il brûle des tokens sur la troisième variante du même correctif. Et quand quelque chose qui marchait casse, il le rafistole en silence au lieu de dire que deux parties du travail se contredisent.

Ce qui me manquait, ce n'était pas plus d'autonomie, mais trois choses que tout projet avec des humains tient pour acquises :

1. un objectif qu'une machine peut trancher,
2. un budget,
3. des règles pour savoir quand s'arrêter et demander.

## Les campagnes

Dans aSPARK, c'est devenu une campagne. J'approuve un objectif, par exemple « chaque tranche est parity-green », plus des itérations, des tokens et des règles d'arrêt. L'agent n'itère qu'à l'intérieur de ce cadre.

Le premier type est une migration. Un Archaeologist fige d'abord l'ancien comportement dans des tests qui doivent passer sur l'ancien code. Un Migrator déplace ensuite exactement une tranche par itération et ne committe que les chemins de cette tranche. Puis un Parity Verifier vérifie, dans un contexte neuf, pas celui qui a écrit le code. Seule sa sortie citée peut déclarer une tranche verte.

Le moment pour lequel j'ai construit tout ça est arrivé pendant la QA, sur un petit dépôt de test. La tranche 1 était verte. La tranche 2 avait besoin qu'une fonction partagée renvoie `float(x)`. Le Verifier a ensuite affiché :

```
S1 PARITY-RED add(1, 2): old=3 new=3.0
S2 PARITY-GREEN
S3 NOT-MIGRATED
```

3 contre 3.0, ça passe facilement inaperçu quand on clique partout. L'agent s'est arrêté sur la règle SR-5 : une tranche verte est devenue rouge. Il a laissé la tranche 2 committée, noté la cause et posé trois options : annuler la tranche 2, redécouper les tranches ou prendre une autre approche. Avec en prime l'indication qu'environ 190k des 200k tokens étaient consommés.

Lors d'un autre essai, il n'a reçu que « Please continue it. » Sa réponse :

> "Continue" doesn't say which way.

C'est exactement ce qui me manquait. Un agent qui sait que continuer est ici une décision, pas une corvée.

## Le hic : le démarrage

Lancer une campagne était laborieux. Il fallait trouver le dossier du plugin installé sous `~/.claude/plugins/`, le nommer dans le prompt et assembler le modèle à la main, parce qu'un agent hors d'un skill ne sait pas résoudre `${CLAUDE_PLUGIN_ROOT}`. Sans le chemin, lors d'une session de QA, l'agent s'est tout simplement inventé une structure. Personne ne fait ça deux fois de son plein gré.

C'est pourquoi la deuxième boucle tourne en ce moment : une commande, `/campaign <name> [kind]`. Elle trouve le modèle toute seule, ne demande que ce que le type choisi laisse ouvert et écrit un brouillon de `campaign.md`. Approuver et démarrer reste mon rôle. La spec est approuvée, le reste de la boucle est en cours.

Deux points comptent pour moi. L'agent suit les règles d'arrêt, rien ne les impose, puisque Core est du Markdown sans runtime. Seul un hook hors du modèle pourrait les imposer, comme aspark-guard le fait pour les gates ; pour les campagnes, ce hook n'existe pas encore. Et jusqu'ici, tout a tourné sur des dépôts de test, pas sur un vrai projet. Je saurai si les campagnes valent le coup au quotidien après la première vraie migration.

Mais pour la première fois, j'ai pour le travail long et mécanique un outil à côté duquel je n'ai pas besoin de rester assis pour voir quand il devrait s'arrêter.

La documentation des campagnes se trouve dans le [dépôt aSPARK](https://github.com/a-lottes/aSPARK/tree/main/campaigns), et le moment SR-5 existe aussi en [vidéo de 60 secondes](https://youtube.com/shorts/yD54Mq4JLJw).
