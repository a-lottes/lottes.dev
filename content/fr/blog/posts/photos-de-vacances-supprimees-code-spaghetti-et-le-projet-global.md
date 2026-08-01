---
title: "Photos de vacances supprimees, code spaghetti et la question de savoir qui veille sur le projet dans son ensemble"
description: Comment des photos de vacances supprimees ont mene a un outil open source — et comment sa construction a revele un probleme structurel qui frappe chaque equipe des qu'elle passe de l'experimentation des agents de codage a un usage productif a grande echelle.
date: 2026-08-01
draft: false
translationKey: deleted-photos-spaghetti-code-whole-project
tags:
  - agents
  - workflows-agentiques
  - claude-code
  - bonnes-pratiques
---
**Ceci n'est pas une annonce produit. C'est l'histoire d'un probleme qui a failli me couter deux projets — et qui frappera chaque equipe au moment ou elle cessera de simplement experimenter les agents de codage pour les utiliser en production, a grande echelle.**

## Tout commence avec un appareil photo numerique

En vacances, ma fille a supprime les photos de son appareil photo numerique. Par accident, irreversiblement — croyait-elle. Si vous avez deja tente de recuperer des photos effacees sur une carte SD, vous connaissez le marche qui s'ouvre a ce moment-la : des outils qui ne revelent qu'apres l'analyse que la recuperation est payante. Des outils avec des interfaces d'une autre decennie. Des outils dont, en tant que parent, on ne peut sincerement pas dire s'ils vont sauver la carte ou l'achever.

Je n'ai pas trouve un seul outil qui soit a la fois gratuit *et* assez simple pour etre confie a quelqu'un qui n'a jamais ouvert un terminal. J'ai donc decide d'en construire un moi-meme : [Datrivo](https://datrivo.app) — un outil de recuperation de photos qui sera publie en open source, pour que le prochain parent dans cette situation dispose d'une option honnete et gratuite.

Voila pour la jolie histoire. La veritable raison de ce texte, c'est ce qui s'est passe *pendant la construction*.

## La lune de miel

Je developpe Datrivo avec Claude Code, et les premieres semaines ont ete exactement ce que promet l'enthousiasme autour des agents de codage. Un carver de fichiers pour un format que je n'avais jamais vu dans un editeur hexadecimal : un apres-midi. Une interface graphique qui ne submerge pas mon public cible : une soiree. Des fonctionnalites qui m'auraient autrefois coute une semaine de soirees ont vu le jour en quelques heures.

Je ne veux pas minimiser cela, et si vous ne l'avez pas encore vecu, vous devriez : la vitesse est reelle. C'est precisement pour cela que ce qui a suivi est si perfide — pendant longtemps, cela ne ressemble pas du tout a un probleme.

## La rupture : localement brillant, globalement spaghetti

Apres plusieurs iterations, j'ai regarde ma propre base de code et je ne l'ai plus reconnue. Trois endroits differents qui faisaient la meme chose de trois manieres differentes. Des abstractions qui se contredisaient. Des modules concus sans se voir — chacun propre isolement, un noeud une fois assembles.

Le reflexe classique serait l'autocritique : mal planifie, construit trop vite, j'aurais du nettoyer en chemin. Mais plus je regardais, plus cela devenait clair : ce n'est pas un echec de discipline. C'est une propriete structurelle de cette maniere de travailler.

Chaque session Claude Code commence par une tache. « Construis la fonctionnalite X. » « Corrige le bug Y. » Et l'agent fait exactement cela — avec competence, avec determination, et **du point de vue de cette seule tache**. Le contexte d'une session est ephemere : la decision d'architecture de la session 3 n'est plus presente dans la session 12. La convention qui a emerge dans la session 5 est inconnue de la session 9. Chaque session optimise localement, et la somme de decisions localement optimales ne donne pas un systeme globalement coherent — elle donne du spaghetti avec une excellente couverture de tests.

Autrement dit : **au sein de la session, le projet dans son ensemble n'a pas d'avocat.** L'agent represente la tache. Moi, je represente — les bons jours — le produit. Mais personne autour de la table ne represente l'architecture, la coherence, le systeme comme un tout. Dans les equipes humaines, ce role est porte par des structures qui ont mis des decennies a emerger : les revues, les comites d'architecture, la definition of done, la memoire institutionnelle des collegues experimentes. Dans une session d'agent, rien de tout cela n'existe par defaut.

## Pourquoi « mieux prompter » ne regle rien

J'ai essaye les remedes evidents, et je soupconne que chaque utilisateur serieux de Claude Code connait la liste :

- **Un CLAUDE.md avec le contexte et les conventions du projet.** Ca aide — et ca ne passe pas a l'echelle. Le fichier grossit, se perime, et au-dela d'une certaine longueur il entre en concurrence avec la tache elle-meme pour l'attention. Surtout, il est *descriptif*, pas *contraignant* : rien n'oblige une session a le respecter, et personne ne verifie apres coup.
- **Un prompting plus discipline.** « Respecte l'architecture existante » est un voeu pieux quand la session n'a jamais vu l'architecture existante en entier.
- **Des sessions de nettoyage regulieres.** C'est du refactoring comme dette permanente — on rembourse l'erosion apres coup au lieu de la prevenir. Agacant dans un projet de loisir ; une ligne budgetaire dans un systeme de production.

Le defaut commun de ces trois approches : elles tentent de resoudre un probleme structurel par du comportement. Cela ne fonctionne deja pas avec les humains — c'est exactement pour cela que les equipes ont des processus au lieu de compter sur « nous ferons tous bien attention ».

## Multipliez maintenant par une equipe

Jusqu'ici, c'est l'histoire d'un developpeur solo et d'un projet de week-end. La raison pour laquelle je l'ecris, c'est la multiplication.

Ce qui m'est arrive seul apres quinze sessions arrive a une equipe de dix developpeurs, tous travaillant productivement avec des agents de codage, des la premiere semaine. Dix personnes, chacune menant plusieurs sessions par jour, chaque session optimisant localement — et le rythme auquel le code est produit depasse d'un ordre de grandeur le rythme auquel quiconque peut verifier la vue d'ensemble. Le goulot d'etranglement se deplace visiblement : **generer du code est devenu bon marche. La coherence, la tracabilite et la supervision sont le nouveau goulot d'etranglement.**

Et les vraies organisations ajoutent des facteurs aggravants que mon projet de loisir n'a pas :

- **Le brownfield.** La plupart des equipes ne partent pas d'une page blanche. Elles travaillent dans une base de code historique qu'*aucune session n'a jamais vue en entier*. Chaque tache est resolue contre un fragment ; les effets de bord sur le reste sont laisses au hasard.
- **L'erosion du savoir.** Le lien entre exigence et code ne vit deja que trop souvent dans les tetes. Les agents aggravent la situation : la transcription du chat dans laquelle une decision a ete prise disparait a la fin de la session. Ce qui reste, c'est du code sans justification.
- **Les obligations d'audit.** Au moment ou la conformite demande quel standard s'appliquait a quelle release et qui a pris quelle decision, « c'est comme ca que l'agent l'a construit » n'est pas une reponse acceptable.

Pris isolement, ce sont des lacunes d'outillage. Pris ensemble, c'est la raison pour laquelle tant de pilotes Claude Code brillent — puis le deploiement a l'echelle de l'organisation cale.

## Ce qu'il faudrait, structurellement

J'ai longtemps cherche quelque chose qui s'attaque a ce probleme, et je suis reste bredouille. Ce qui existe se repartit en deux categories qui passent toutes deux a cote du sujet : des assistants de codage qui optimisent le *debit individuel*, et des suites de processus qui gerent *tickets et reporting* mais ne savent rien du code. L'espace entre les deux — l'endroit ou le projet dans son ensemble aurait besoin d'un avocat — reste vide.

A quoi devrait ressembler une solution ? Formule de maniere neutre vis-a-vis de tout produit, je suis arrive a quatre exigences :

1. **Les decisions doivent survivre a la fin de la session.** Les specs, les plans et les conclusions de revue ont leur place dans le depot, comme artefacts — versionnes, lisibles, a cote du code — pas dans une transcription de chat ephemere.
2. **Il faut des roles qui ne construisent pas.** L'instance qui remet une idee en question ne doit avoir aucun interet a l'implementer. L'instance qui fait la revue ne doit pas etre celle qui a ecrit le code. Chez les humains, on appelle cela la separation des pouvoirs — pour les agents, c'est tout aussi necessaire.
3. **Les passages de relais ont besoin de gates capables de dire non.** Un processus qu'on peut sauter sous pression est du folklore. Un gate qui refuse de demarrer la phase suivante tant que la precedente n'est pas proprement close, c'est de la structure.
4. **Les exigences doivent etre tracables jusque dans le code.** Quand plus personne ne peut repondre a la question de savoir quel code remplit quelle exigence, le savoir est deja perdu — on ne s'en apercoit simplement que plus tard.

Rien de tout cela n'est une decouverte. C'est ce que les equipes logicielles qui fonctionnent font depuis des decennies. La seule nouveaute, c'est le constat que ces structures ne sont pas livrees avec les agents — il faut les reconstruire explicitement, sinon on travaille avec une equipe tres rapide et aucun processus.

## Ce que j'en ai construit

Voici la transparence promise : j'ai construit un outil a partir de ces quatre exigences, et je suis evidemment partial. [aSPARK](https://github.com/a-lottes/aSPARK) est un plugin open source pour Claude Code qui donne a un projet exactement cette structure : des roles specialises (un Product Owner qui remet les idees en question, un Reviewer qui n'a pas ecrit le code, un QA Tester qui clique dans l'application dans un vrai navigateur), une boucle en cinq phases avec des gates, et une trace de decision ecrite sous forme d'artefacts Markdown dans le depot.

Quant a savoir si le concept tient ses promesses, je l'ai teste sur mon propre projet : les fonctionnalites de Datrivo passent desormais par cette boucle. Le resultat a ete plus instructif que je ne l'esperais — entre autres, la phase Specify a enterre une hypothese perimee de mon propre backlog avant qu'une seule ligne de code ne soit ecrite, et la QA manuelle a attrape deux bugs visibles par l'utilisateur qu'une suite de tests entierement verte et une revue de code reussie avaient tous deux manques. Le retour d'experience complet — une vraie fonctionnalite, les cinq phases, y compris les moments ou la boucle m'a ralenti — se trouve dans un [article dedie](/fr/blog/une-personne-toute-une-equipe-aspark-livraison-agile-ia/).

Mais le point sous-jacent m'importe plus que l'outil : meme si aSPARK disparaissait demain, le probleme resterait. Quiconque veut utiliser des agents de codage en production a grande echelle — en equipe, dans du code historique, sous obligations d'audit — a besoin d'*une* reponse a la question de savoir qui represente le projet dans son ensemble quand chaque session ne voit que sa tache.

## Une fin ouverte

Datrivo n'est pas encore publie — les photos de vacances de ma fille, au passage, sont revenues. aSPARK est open source et en developpement actif. Et la question de savoir comment une equipe travaille avec des agents de codage de maniere productive et durable est, a mes yeux, l'une des questions les plus importantes en pratique des prochaines annees — et loin d'etre tranchee.

Si vous reconnaissez ce probleme dans votre propre projet ou votre equipe — ou si vous avez trouve une autre reponse — vos objections, vos experiences et vos idees sont sincerement les bienvenues.
