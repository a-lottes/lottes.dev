---
title: "D'un enregistrement d'ecran de 47 minutes a une demo commentee — sans ouvrir de logiciel de montage"
description: Comment l'enregistrement brut d'une session aSPARK est devenu, le jour meme, une demo de 100 secondes sous-titree, aux couleurs de la marque et commentee — planifiee a partir d'un registre de hachages plutot que d'une timeline, rendue avec ce que macOS fournit d'origine, et doublee par ElevenLabs.
date: 2026-09-19
draft: false
translationKey: screen-recording-to-narrated-demo
tags:
  - claude-code
  - agents
  - workflows-agentiques
---
**J'avais un enregistrement d'ecran de 47 minutes et aucun logiciel de montage, sur un Mac equipe d'un macOS un peu ancien. Le soir meme, une demo de 100 secondes, sous-titree et commentee, tournait sur mon site et directement dans un README GitHub. Voici comment — et pourquoi l'ingredient le plus important etait un fichier de journal que j'avais construit pour une tout autre raison.**

<video controls playsinline preload="none"
  poster="https://aspark.lottes.dev/assets/video/aspark-demo-poster.jpg"
  src="https://aspark.lottes.dev/assets/video/aspark-demo-voice.mp4"
  style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0"></video>

## Pourquoi une video

[aSPARK](https://github.com/a-lottes/aSPARK) transforme Claude Code en equipe agile: un Product Owner qui remet votre idee en question, un Designer, un Engineering Manager, un Reviewer, un QA Tester qui parcourt votre application dans un vrai navigateur, et un Release Manager — avec une porte de qualite entre chaque phase, que vous seul pouvez ouvrir.

Cela fait beaucoup de mots. Et les mots etaient justement le probleme. Quand j'ai demande a Claude un avis honnete sur le projet, la reponse a ete franche: le README consacrait quatre mille mots a expliquer ce que fait la boucle, et pas une seule seconde a la *montrer*. La chose que personne d'autre ne fait — un agent qui teste votre application dans un navigateur et trouve un vrai bug — etait invisible.

Nous avons donc reduit le README a un tiers de sa taille et place une ligne tout en haut: `<!-- TODO: 90-second screencast -->`. Restait a le faire.

## Etape 1: une fonctionnalite qui tient en une seance

Une boucle de demonstration doit etre reelle, et elle doit etre courte. Claude a mis en place un minuscule projet de demo — une application de todo en JavaScript pur, trois fichiers, aucune dependance — ainsi qu'une constitution de projet qui garde chaque porte legere: une seule lens active, QA dans le navigateur, aucun framework de test a monter.

Puis il a propose la fonctionnalite: une barre de filtres *All / Active / Done* et un compteur "N items left". L'astuce tenait a la formulation de l'idee elle-meme. La phrase unique que j'ai collee dans `/spark` repondait deja a l'essentiel de ce que demande la passe de clarification du Product Owner — les limites, les etats vides, l'usage au clavier, ce qui est explicitement hors perimetre. Le Product Owner a tout de meme pose ses questions, mais quelques reponses rapides ont suffi pour la spec.

J'ai lance l'enregistrement. Quarante-sept minutes plus tard, `todo-filter-bar` etait publie en `v0.1.0`: specifie, verifie cote design, planifie, construit, relu (le Reviewer a trouve un vrai bug de contour de focus, corrige puis reverifie) et valide sur les 29 criteres d'acceptation dans Chrome, sur ordinateur et en largeur de telephone.

## Etape 2: planifier le montage a partir d'un registre, pas d'une timeline

Voici la partie qui a rendu tout le reste facile.

Quarante-sept minutes, cela represente environ 2 800 secondes de materiau. La methode habituelle pour trouver les quinze secondes qui valent la peine d'etre montrees consiste a faire defiler. Nous n'avons pas fait defiler une seule fois.

aSPARK a un plugin compagnon, [aspark-guard](https://github.com/a-lottes/aSPARK-guard). Son role est de faire respecter les regles: il refuse une ecriture qui sauterait une porte de qualite, et il consigne **chaque ecriture sur un artefact `.spark/` dans un registre en ajout seul** — avec le SHA-256 de l'artefact, son statut, l'agent qui l'a ecrit et un horodatage. Je l'ai construit pour qu'aucune porte ne puisse etre franchie en silence. Je ne l'avais jamais vu comme un outil video.

Mais un registre horodate est une table des matieres. En soustrayant l'heure de debut de l'enregistrement, on obtient ceci:

| Dans l'enregistrement | Ce qui s'est passe |
|---|---|
| 1:44 | Le Product Owner ecrit le premier brouillon de spec |
| 7:32 | Le Designer ajoute la revue de design |
| 12:40 | L'Engineering Manager ecrit le plan |
| 23:44 | Le Reviewer ouvre la revue |
| 37:23 | Le QA Tester ecrit le rapport de QA |
| 42:55 | Le Release Manager prepare la release |

**Le registre d'aspark-guard a fourni la carte des phases de toute la session — et c'est precisement ce qui a rendu tout ce processus possible.** Claude l'a fusionne avec le journal de la session Claude Code (chaque question de porte et ma reponse, a la seconde pres) et avec le log git, en une seule chronologie. De la est ne le scenario: la commande `/spark`, la premiere question difficile du Product Owner, les constats du Designer, chaque porte, le bug du Reviewer, la QA dans le navigateur, la release.

L'outil qui rend le processus verifiable l'a aussi rendu *filmable*. J'adore quand cela arrive.

## Etape 3: ne regarder que la ou cela compte

C'est seulement ensuite que nous avons ouvert des images — des planches contact de l'enregistrement, une vignette toutes les deux minutes, et des images fixes recadrees exactement aux secondes candidates, pour verifier que le texte du terminal resterait lisible en 720p.

Ces images ont revele trois choses que je n'aurais jamais voulues dans une video publique: une ancienne version de mon propre site ouverte dans un onglet (avec des affirmations que j'ai reecrites plus tard le jour meme), une page de nouvel onglet affichant des noms de fichiers de mon Google Drive, et ma photo de profil dans la barre du navigateur. Chaque recadrage du navigateur commence desormais sous cette barre, et ces secondes ne figurent tout simplement pas dans le montage. Claude m'a dit ce qu'il avait laisse de cote et pourquoi, au lieu de couper en silence.

## Etape 4: faire le rendu avec ce que macOS fournit

Mon Mac tourne sous Ventura. Pas d'iMovie, pas de ffmpeg, pas de Homebrew. Il s'est avere que rien de tout cela n'etait necessaire: Swift et AVFoundation sont fournis avec le systeme.

Claude a ecrit un petit programme de rendu qui lit un unique fichier JSON decrivant le montage: quinze scenes, chacune avec un extrait source, un recadrage (panoramique et zoom sur le terminal ou le navigateur) et une vitesse. La phase de construction defile a 30×, les questions de porte en temps reel. Chaque scene acceleree porte un **badge d'acceleration** dans un coin — personne ne croit plus une demo qui cache ses accelerations des qu'il en remarque une.

Il exporte un master, puis le reencode deux fois: une fois sous la limite de 10 Mo des pieces jointes GitHub, une fois en qualite superieure pour le site.

## Etape 5: "La police fait un peu sec"

Le premier montage etait correct et sobre. J'ai dit une phrase — *la typographie fait ennuyeuse, peut-on faire plus moderne?* — et j'ai obtenu une refonte tiree de mon propre site: Inter Display et JetBrains Mono, charges directement depuis les fichiers de polices du site, le degrade turquoise-orange des titres sur le logotype, et des cartes de sous-titres avec un libelle de role en haut (`PRODUCT OWNER`, `GATE · PLAN`, `QA TESTER`) et une phrase en dessous.

S'y est ajoute quelque chose que je n'avais pas demande et dont je ne voudrais plus me passer: un **suivi de phase** en haut a gauche — *Specify · Plan · Act · Review · Keep* — qui met en evidence la phase que vous regardez. Vous savez toujours ou vous en etes dans la boucle.

## Etape 6: lui donner une voix

Avec les seuls sous-titres, cela restait un peu muet. J'ai un compte ElevenLabs gratuit, nous avons donc ajoute un commentaire.

Claude a ecrit une courte phrase parlee par scene — la jumelle du sous-titre, pas sa copie — et un script qui envoie chaque phrase separement a ElevenLabs en transmettant les phrases voisines, pour que l'intonation reste continue. Le connecteur MCP d'ElevenLabs est bien relie a mon compte, mais il n'etait pas disponible dans cette session precise, alors le script parle directement a l'API. La cle se trouve dans le trousseau macOS et n'est jamais apparue dans la conversation.

La synchronisation s'est revelee la partie facile, car rien n'a du etre ajuste a l'oreille. Chaque clip est mesure a la fraction de seconde pres et place un tiers de seconde apres le debut de sa scene. Si une phrase est plus longue que sa scene, l'acceleration de la scene ralentit un peu, et le badge affiche la nouvelle vitesse, honnete. Une mesure de niveau sonore du fichier final a ensuite confirme que la voix commence exactement la ou commencent les scenes.

Tout le commentaire a coute 871 des 10 000 credits mensuels gratuits, et la mention que le plan gratuit exige figure sur la carte de fin.

## Etape 7: livrer

La version haute qualite est hebergee sur [aspark.lottes.dev](https://aspark.lottes.dev/en/#showcase). Pour le README, GitHub exige une piece jointe televersee via un navigateur — Claude a donc ouvert une issue dans mon Chrome connecte, charge le fichier dans le champ de commentaire sans rien publier, recupere l'URL de la piece jointe et verifie via l'API markdown de GitHub qu'elle s'affiche comme lecteur pour les visiteurs anonymes, avant de la committer. La video se lit maintenant [directement sur la page du depot](https://github.com/a-lottes/aSPARK).

## Ce qui m'a surpris

Pas que cela fonctionne. Mais que cela fonctionne **sans friction aux mauvais endroits**.

La friction etait exactement la ou elle doit etre: chez moi. Quelle fonctionnalite montrer. Si le design convenait. Si la voix sonnait bien. Tout le reste — la planification, le controle de confidentialite, le rendu, les verifications — s'est fait tout seul, et les petites choses qui ont mal tourne ont ete detectees par des controles, pas par moi: un texte en surimpression qui s'affichait comme des cases vides au premier passage, une cle d'API enregistree sous la forme de huit mauvais caracteres, un push qui a cale sur un fichier video de 13 Mo. Chacune est apparue, a ete nommee, a ete corrigee.

Et l'honnetete etait integree, pas ajoutee apres coup. Le badge signale chaque acceleration. Le montage ecarte ce qui ne doit pas etre public. La mention figure sur la carte. C'est le meme principe qu'aSPARK applique au code: ce qui n'est pas verifie n'a pas le droit d'avoir l'air verifie.

## C'est maintenant un skill

Tout ce qui precede vit desormais dans un skill Claude Code: le script de chronologie qui lit le registre et le journal, les outils de planches contact et de rendu, les regles de design, l'etape de commentaire et chaque piege rencontre en chemin. Le prochain enregistrement est a un prompt de distance: *fais une video de demo a partir de cet enregistrement d'ecran.*

## Essayez aSPARK

Si vous travaillez avec Claude Code et voulez une equipe agile autour de chaque fonctionnalite — avec des portes que vous decidez et une trace que vous pouvez lire, comparer et, visiblement, meme filmer:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Ajoutez [aspark-guard](https://github.com/a-lottes/aSPARK-guard) si vous voulez que les portes soient appliquees dans le code — et le registre qui s'est revele etre le meilleur scenario video que j'aie jamais eu.

Tout est open source: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK). Et si vous l'utilisez sur l'un de vos projets, un [retour d'experience](https://github.com/a-lottes/aSPARK/issues/new?template=field_report.yml) compte plus pour moi que n'importe quelle etoile — surtout si cela s'est mal passe.
