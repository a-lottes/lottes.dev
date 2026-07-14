---
title: "Une personne, toute une equipe: comment aSPARK transforme Claude Code en processus de livraison agile"
description: Pourquoi j'ai construit une equipe IA agile en plugin Claude Code, comment fonctionne la boucle SPARK, et ce qui s'est passe quand une vraie fonctionnalite a traverse la boucle.
date: 2026-07-13
draft: false
translationKey: aspark-one-person-whole-team
tags:
  - agents
  - workflows-agentiques
  - claude-code
  - bonnes-pratiques
---
**Les agents de codage ont resolu la vitesse. Ils n'ont pas resolu la fiabilite.**

aSPARK est ma reponse a cette lacune: un plugin Claude Code qui place une equipe agile complete — Product Owner, Designer, Engineering Manager, Reviewer, QA Tester, Release Manager — autour d'un seul developpeur, et fait passer chaque fonctionnalite par une boucle de livraison a portes de qualite. Cet article explique l'idee, parcourt la boucle SPARK et partage un retour d'experience: une vraie fonctionnalite passee dans la boucle sur l'un de mes propres projets.

## Pourquoi c'est important

Qui travaille aujourd'hui avec un agent de codage est rapide. Effroyablement rapide.

Mais en tant que developpeur solo, vous etes aussi, simultanement, le product owner, l'architecte, le reviewer et le departement QA. En pratique, certaines de ces casquettes restent au vestiaire. L'agent construit ce que vous avez demande — immediatement, avec assurance, et sans que personne ne demande jamais si c'etait la bonne chose a construire, si le plan tenait la route, ou si quelqu'un a teste au-dela du happy path.

C'est le mode de defaillance silencieux du "vibe coding": le goulot d'etranglement se deplace de l'ecriture du code vers tout ce qui l'entoure. La vitesse est resolue. La discipline, non.

## L'idee: des roles comme agents, des ceremonies comme skills

Les vraies equipes logicielles ne reposent pas sur un generaliste brillant. Elles reposent sur des roles specialises avec des passations explicites: quelqu'un challenge les exigences, quelqu'un planifie, quelqu'un construit, quelqu'un relit, quelqu'un teste, quelqu'un livre.

aSPARK traduit cette structure dans Claude Code:

- **Six agents** incarnent les roles: Product Owner, Designer, Engineering Manager, Reviewer, QA Tester, Release Manager.
- **Les skills jouent les ceremonies**: `/story-time`, `/look-and-feel`, `/sprint-plan`, `/increment`, `/peer-review`, `/demo-day`, `/go-live`.
- **Un orchestrateur**, `/spark`, fait tourner toute la boucle de bout en bout — en s'arretant a chaque porte pour une decision humaine.

Le but n'est pas le jeu de role. Le but est la separation des responsabilites: l'agent qui relit le code n'est pas celui qui l'a ecrit, et l'agent qui challenge votre idee n'a aucun interet a la construire.

## La boucle SPARK

Chaque fonctionnalite traverse cinq phases, et chaque phase se termine par une porte:

1. **Specify** — le Product Owner interroge l'idee et en fait une spec avec des criteres d'acceptation testables; le Designer examine l'utilisabilite quand une UI est concernee.
2. **Plan** — l'Engineering Manager produit une decision d'architecture (avec les alternatives rejetees), un decoupage ordonne des taches et une strategie de test.
3. **Act** — l'increment est construit, en suivant strictement le plan approuve.
4. **Review** — un Reviewer audite le diff; un QA Tester valide l'application en fonctionnement dans un vrai navigateur, au-dela du happy path.
5. **Keep** — le Release Manager execute les verifications pre-vol, redige le changelog et livre.

Deux proprietes en font un processus plutot qu'un pipeline de prompts:

- **Chaque phase produit un artefact** — `spec.md`, `plan.md`, `review.md`, `qa.md`, `release.md` — range dans un dossier `.spark/<feature>/` au sein de votre projet. La trace de decision est lisible, auditable et versionnable.
- **Chaque porte exige *votre* decision.** La boucle n'avance jamais de sa propre autorite. Quand une porte echoue, la boucle escalade en arriere — une review echouee renvoie le travail vers le plan ou le build, pas vers un merge.

Vous restez l'humain dans la boucle. Vous cessez simplement d'etre la *seule* instance de controle de la boucle.

## Retour d'experience: une fonctionnalite a travers la boucle

La theorie ne coute rien. Voici donc ce qui s'est reellement passe quand j'ai fait passer une vraie fonctionnalite par aSPARK dans **Datrivo**, un outil de recuperation de photos que je construis (pas encore publie). La fonctionnalite: recuperer les photos dans les formats modernes que produisent aujourd'hui les iPhones et les appareils Android.

### Specify: l'IA a verifie mon backlog

J'ai lance `/story-time` avec un element de backlog que je croyais bien compris — formule, comme le sont les demandes de developpeurs, sous forme de solution: "il nous faut un vrai carver pour ce format."

Deux choses se sont produites que je n'attendais pas.

D'abord, le Product Owner a refuse d'accepter ma solution comme exigence. Il a traduit la demande en besoin sous-jacent — *les utilisateurs doivent recuperer leurs photos intactes, correctement nommees et honnetement etiquetees* — et a consigne ma formulation d'origine a part, comme l'exige sa regle no-solutions.

Ensuite, et c'est plus remarquable: le PO a enquete dans la base de code et **a refute la premisse de mon element de backlog**. Le probleme que je croyais avoir — certains fichiers introuvables — avait deja ete resolu des mois plus tot. Les *vraies* lacunes etaient ailleurs: un format etait recupere sous un mauvais nom, et des photos parfaitement intactes etaient signalees comme "possiblement incompletes", erodant silencieusement la confiance des utilisateurs.

La fonctionnalite a ete redecoupee avant qu'une seule ligne de code n'existe. Seul, j'aurais construit une solution a un probleme qui n'existait plus.

La phase Specify a aussi produit trois decisions explicites escaladees vers moi a la porte — dont le report conscient d'une sous-exigence a un cycle ulterieur, documente comme sa propre story "Won't, this cycle" pour que le *non* soit consigne plutot qu'oublie. La review du Designer a ete marquee N/A avec une justification ecrite (aucune nouvelle surface UI), au lieu d'etre sautee en silence.

### Plan: une decision sans alternatives est une supposition

`/sprint-plan` a remis la spec approuvee a l'Engineering Manager, et le plan qui en est sorti m'a surpris autrement: non par ce qu'il decidait, mais par ce qu'il *documentait*.

La decision d'architecture venait avec trois alternatives explicitement rejetees, chacune avec sa raison. L'option la moins chere — rafistoler l'existant — a ete rejetee parce qu'elle ne pouvait manifestement pas satisfaire les criteres d'acceptation de la spec. Integrer une bibliotheque externe a ete rejete au nom de la regle selon laquelle toute dependance est un passif — la partie dont nous avions reellement besoin etait assez petite pour la posseder en propre. Et la solution maximale — validation complete avec des dependances lourdes — a ete rejetee comme du gold-plating, disproportionnee pour la fonctionnalite. La porte du plan l'impose litteralement: *"a decision without alternatives is a guess."*

Le reste du plan suivait la meme discipline. Huit taches ordonnees, chacune reliee a une user story, chacune avec une definition of done verifiable — et la story reportee en Specify n'a recu aucune tache, *by design*. La strategie de test nommait explicitement ce que les tests automatises ne peuvent pas prouver (la photo recuperee s'ouvre-t-elle vraiment pour un utilisateur reel?) et deleguait exactement cela a la session QA manuelle, avec une justification ecrite expliquant pourquoi c'est la verification proportionnee et non un raccourci.

Mon detail prefere se trouvait dans la table des risques: le risque en tete de liste etait que la nouvelle etiquette "honnete" de completude puisse elle-meme mentir. La regle de mitigation: dans le doute, rester conservateur — ne jamais annoncer faussement un succes. Une equipe qui planifie les modes de defaillance de ses propres signaux de confiance fait quelque chose de bien.

### Act: un ecart est documente, pas passe en contrebande

`/increment` a traite les huit taches dans l'ordre, et le build lui-meme fut sans histoire — c'est precisement l'interet d'un bon plan. Le moment interessant fut un conflit: deux enonces des documents approuves se contredisaient sur un cas limite. Les deux avaient passe des portes. Un developpeur solo dans le flow en aurait choisi un en silence et serait passe a la suite.

Au lieu de cela, le builder a resolu le conflit en faveur des criteres d'acceptation *testables*, a consigne l'ecart dans le plan avec son raisonnement, et a couvert la decision par un test. Plus tard, le Reviewer a explicitement evalue cet ecart et l'a accepte par ecrit. Rien n'est passe en contrebande; chaque ecart au plan a laisse une trace que quelqu'un d'autre peut auditer.

### Review: la table des risques s'est realisee

`/peer-review` ne s'est pas contente de lire le diff. Le Reviewer a fait tourner la suite de tests complete puis a ecrit sa *propre* sonde pour exercer des cas limites que les tests commites ne couvraient pas — et cette sonde a trouve quelque chose que les tests du developpeur avaient manque.

Le finding etait exactement le mode de defaillance predit par la table des risques du plan: un cas limite ou un fichier endommage aurait ete faussement declare intact. La seule chose que la fonctionnalite existait pour empecher — un signal de confiance qui ment — avait un trou. Le finding compagnon etait la lacune de test correspondante: la maniere dont le trou etait passe inapercu.

Tout aussi revelateur: ce que le Reviewer a fait ensuite. Rien. Parce que le correctif impliquait un choix de conception, les findings sont retournes au developpeur au lieu d'etre rapieces sur place par le Reviewer. Correctif, re-review, deux nouveaux tests verrouillant le comportement. Deux broutilles cosmetiques sont restees ouvertes — documentees et explicitement acceptees, plutot qu'oubliees en silence.

### QA: la review est passee — et la demo a quand meme echoue

Voici la partie qui m'a convaincu que les roles voient vraiment des choses differentes.

La revue de code etait passee. Puis `/demo-day` a fait tourner le produit reellement compile comme le ferait un utilisateur — et **a fait echouer la porte** sur deux bugs majeurs:

- Des fichiers ressemblant a des donnees du monde reel (et non aux fixtures de test simplifiees) etaient mal identifies, produisant un doublon fantome sous le mauvais nom — exactement la classe de bug que la fonctionnalite devait eliminer.
- Le signal honnete de completude — la tete d'affiche de toute la fonctionnalite — etait calcule correctement en interne mais *invisible dans la sortie reelle du produit*. Tous les tests unitaires au vert; un utilisateur reel n'aurait jamais vu la fonctionnalite marcher.

La boucle a fait ce pour quoi une boucle existe: elle a escalade en arriere vers la phase de build, et apres les correctifs, la QA a tout rejoue — la deuxieme manche est passee, se concluant sur la question que l'agent QA se pose a lui-meme: *"Would I demo this to a stakeholder right now? Yes."*

La QA a aussi documente ce qu'elle ne *pouvait pas* verifier avec des donnees de test synthetiques, le consignant comme limitation connue au lieu de l'escamoter — une frontiere honnete plutot qu'une coche verte.

La lecon a laquelle je reviens sans cesse: le Reviewer a trouve un bug dans le *code*; la QA a trouve des bugs dans le *produit*. Aucun n'aurait fait les trouvailles de l'autre. C'est l'argument pour des roles separes, en une phrase.

### Keep: la release qui refuse de se pousser elle-meme

`/go-live` a clos le cycle — en se comportant moins comme un script de deploiement presse que comme un release manager soigneux. Les verifications pre-vol ont ete relancees *a neuf* sur le commit de release au lieu d'etre copiees des rapports precedents: la suite de tests complete a nouveau, les deux builds a nouveau, plus la verification qu'aucun element etranger n'etait embarque. Le changelog est sorti en langage utilisateur — que peuvent faire les utilisateurs maintenant qu'ils ne pouvaient pas avant — hashes de commit et jargon explicitement bannis.

Deux details ressortaient. Le commit de release etait deliberement circonscrit: seulement les fichiers de la fonctionnalite, stages par chemins explicites, tandis que les problemes preexistants connus ailleurs dans le repo etaient consignes comme suites a donner au lieu d'etre balayes dans la release. Et le chemin de rollback a ete ecrit *avant* toute livraison, sous la regle enoncee dans l'artefact lui-meme: *"a release you can't roll back is a bet, not a release"* — y compris une regle fix-forward: un defaut post-release repasse par toute la boucle comme version suivante, jamais comme hot patch sur le commit de release.

Le tout dernier pas est mon prefere. Le Release Manager a tout prepare — montee de version, commit circonscrit, tag local — puis *s'est arrete*. Chaque commande tournee vers l'exterieur (push, PR, publication) est preparee dans la note de release mais explicitement non executee, en attente du feu vert de l'utilisateur. Datrivo n'etant pas encore public, c'est exactement la que le cycle repose: done-done, sauf l'appui sur le bouton. Et c'est bien le point — la boucle n'accomplit jamais l'unique pas irreversible de sa propre autorite.

Et parce que Keep est le K de SPARK, la phase a consigne les enseignements du cycle: ce qui a bien marche (l'etape QA hands-on a gagne sa place), ce qu'il faudrait faire autrement (les tests adversariaux s'ecrivent *avec* le code, pas apres qu'un reviewer a trouve le trou), et des motifs reutilisables pour les cycles futurs — dont la lecon que la QA nous a apprise: ne jamais calculer un signal de qualite sans prouver aussi qu'il atteint l'utilisateur.

### Ce que les portes ont attrape, au total

Une fonctionnalite, un cycle: une premisse de backlog perimee enterree avant tout code, une solution retraduite en besoin, trois alternatives d'architecture rejetees par ecrit, un conflit de plan resolu en transparence, un trou dans le signal de confiance attrape par la review, deux bugs majeurs visibles par l'utilisateur attrapes par la QA hands-on apres que la review etait passee, et une release preparee avec un chemin de rollback ecrit et des enseignements consignes — s'arretant juste avant l'unique pas irreversible, qui reste humain. Chacune de ces prises a eu lieu *avant* la release — et chacune est ecrite dans cinq fichiers markdown que je pourrai relire dans six mois.

## Quand le surcout se justifie — et quand non

Une evaluation honnete, car un processus a portes n'est pas gratuit:

**Justifie:** les fonctionnalites a risque reel — tout ce qui touche l'integrite des donnees, tout ce qui est visible par l'utilisateur, tout ce ou "ca a l'air de marcher" vous a deja brule. Dans l'exemple Datrivo, la phase Specify s'est payee a elle seule en enterrant une hypothese perimee avant qu'elle ne devienne du code — et le demo-day a attrape deux bugs visibles par l'utilisateur qu'une suite de tests entierement verte et une revue de code reussie avaient manques.

**Pas justifie:** les correctifs d'une ligne, les typos, les refactorings mecaniques. Derouler une ceremonie a six roles sur une coquille de `README`, c'est du theatre. aSPARK est deliberement modulaire — vous pouvez invoquer une seule phase (par exemple juste `/peer-review` sur un diff) sans toute la boucle.

La regle empirique que j'ai adoptee: si je souhaiterais une seconde paire d'yeux d'un collegue humain, je lance la boucle.

## Demarrer

aSPARK est open source et s'installe comme plugin Claude Code en deux commandes:

```
/plugin marketplace add a-lottes/aSPARK
/plugin install aspark@aspark
```

Ensuite, lancez des ceremonies individuelles par phase, ou demarrez `/spark` et laissez toute l'equipe porter une fonctionnalite de l'idee a la release — en decidant a chaque porte.

Le depot, avec la documentation complete des agents, des skills et des regles de portes: [github.com/a-lottes/aSPARK](https://github.com/a-lottes/aSPARK)

## Conclusion

Les agents de codage ont rendu la construction rapide. aSPARK est ma tentative de la rendre *digne de confiance* — non pas en ralentissant l'agent, mais en l'entourant de la meme structure qui rend les equipes humaines fiables: des roles specialises, des passations explicites, des portes de qualite et une trace de decision ecrite.

En une ligne:

Une personne plus aSPARK travaille comme toute une equipe — et la difference ne se voit pas dans la vitesse a laquelle vous construisez, mais dans ce que vous attrapez avant de construire.

Feedback, issues et pull requests sont les bienvenus.
