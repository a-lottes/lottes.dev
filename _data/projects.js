/**
 * Open source projects, rendered by content/<lang>/open-source/.
 * Language-neutral facts live at the top level; prose is keyed by language.
 */
module.exports = [
    {
        key: "aspark",
        name: "aSPARK",
        repo: "https://github.com/a-lottes/aSPARK",
        license: "MIT",
        year: 2026,
        featured: true,
        topics: ["claude-code-plugin", "ai-agents", "sdlc", "code-review", "qa-automation", "llm"],
        install: [
            "/plugin marketplace add a-lottes/aSPARK",
            "/plugin install aspark@aspark",
        ],
        // Phase labels are the SPARK acronym itself and stay untranslated;
        // only the explanation moves between languages.
        phases: ["Specify", "Plan", "Act", "Review", "Keep"],
        de: {
            tagline: "Ein agiles KI-Team als Plugin für Claude Code",
            description: "aSPARK macht aus Claude Code ein Werkzeug mit Prozess: ein Produktteam aus Product Owner, Designer, Engineering Manager, Reviewer, QA-Tester und Release Manager. Jedes Feature läuft durch den SPARK-Loop und muss an jedem Gate bestehen, bevor es weitergeht.",
            detail: "Entscheidungen verschwinden nicht im Chatverlauf, sondern landen als Artefakte im Projekt — spec.md, plan.md, review.md, qa.md. Stabile IDs für User Stories, Akzeptanzkriterien und nicht-funktionale Anforderungen halten alle Phasen nachvollziehbar miteinander verbunden. Getestet wird nicht behauptet, sondern im echten Browser.",
            phaseDescriptions: [
                "Idee schärfen, User Stories und Akzeptanzkriterien festlegen",
                "Architekturentscheidung treffen, Aufgaben schneiden",
                "Das Inkrement strikt nach Plan bauen",
                "Code-Review und QA im echten Browser",
                "Release, Dokumentation und Learnings festhalten",
            ],
        },
        en: {
            tagline: "An agile AI team as a plugin for Claude Code",
            description: "aSPARK turns Claude Code from a coding tool into a tool with a process: a product team of Product Owner, Designer, Engineering Manager, Reviewer, QA Tester, and Release Manager. Every feature runs through the SPARK loop and has to pass each gate before it moves on.",
            detail: "Decisions do not vanish into the chat log — they land in the project as artifacts: spec.md, plan.md, review.md, qa.md. Stable IDs for user stories, acceptance criteria, and non-functional requirements keep every phase traceable. QA is not claimed, it is run in a real browser.",
            phaseDescriptions: [
                "Sharpen the idea, settle user stories and acceptance criteria",
                "Decide the architecture, break the work down",
                "Build the increment strictly to plan",
                "Code review and QA in a real browser",
                "Release, document, and record the learnings",
            ],
        },
        fr: {
            tagline: "Une équipe IA agile en plugin pour Claude Code",
            description: "aSPARK transforme Claude Code en un outil doté d'un processus: une équipe produit composée d'un Product Owner, d'un Designer, d'un Engineering Manager, d'un Reviewer, d'un testeur QA et d'un Release Manager. Chaque fonctionnalité traverse la boucle SPARK et doit franchir chaque gate avant de poursuivre.",
            detail: "Les décisions ne disparaissent pas dans l'historique de conversation: elles deviennent des artefacts du projet — spec.md, plan.md, review.md, qa.md. Des identifiants stables pour les user stories, les critères d'acceptation et les exigences non fonctionnelles assurent la traçabilité entre les phases. La QA n'est pas déclarée, elle est exécutée dans un vrai navigateur.",
            phaseDescriptions: [
                "Préciser l'idée, définir user stories et critères d'acceptation",
                "Décider l'architecture, découper les tâches",
                "Construire l'incrément en suivant strictement le plan",
                "Revue de code et QA dans un vrai navigateur",
                "Livrer, documenter et consigner les enseignements",
            ],
        },
    },
];
