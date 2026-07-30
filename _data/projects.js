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
    {
        key: "aspark-graph",
        name: "aSPARK-graph",
        repo: "https://github.com/a-lottes/aSPARK-graph",
        license: "MIT",
        year: 2026,
        topics: ["knowledge-graph", "code-graph", "mcp", "tree-sitter", "python", "aspark"],
        install: [
            "pip install aspark-graph",
            "claude mcp add aspark-graph -- uvx aspark-graph serve",
        ],
        de: {
            tagline: "Ein lokaler Wissensgraph, der Code und Delivery-Artefakte verbindet",
            description: "aspark-graph liest ein Repository — den Quellcode und den aSPARK-Delivery-Pfad unter .spark/ mit Specs, Plänen, Reviews und QA-Berichten — und baut daraus einen einzigen abfragbaren Graphen, bereitgestellt über CLI und MCP-Server. Damit lassen sich zwei Fragen ohne Grepping beantworten: Welcher Code implementiert diese User Story? Und welche Stories liegen im Blast Radius einer Änderung?",
            detail: "Der Graph ist deterministisch — tree-sitter plus deklarierte Artefakt-Verknüpfungen, kein LLM, kein Netzwerk. Zwei Builds eines unveränderten Repositories erzeugen byte-identische Ergebnisse. Und er ist bewusst wegwerfbar: ein jederzeit neu baubares Read Model, niemals die Quelle der Wahrheit.",
        },
        en: {
            tagline: "A local knowledge graph joining code to delivery artifacts",
            description: "aspark-graph reads one repository — its source code and its aSPARK delivery trail under .spark/ with specs, plans, reviews, and QA reports — and builds a single queryable graph, served over a CLI and an MCP server. It answers two questions without grepping: which code implements this user story, and which stories sit in the blast radius of a change?",
            detail: "The graph is deterministic — tree-sitter plus declared artifact links, no LLM and no network — so two builds of an unchanged repo produce byte-identical results. And it is deliberately disposable: a rebuildable read model, never a source of truth.",
        },
        fr: {
            tagline: "Un graphe de connaissances local reliant le code aux artefacts de livraison",
            description: "aspark-graph lit un dépôt — son code source et sa piste de livraison aSPARK sous .spark/ avec specs, plans, revues et rapports QA — et en construit un graphe unique interrogeable, exposé via une CLI et un serveur MCP. Il répond à deux questions sans grep: quel code implémente cette user story, et quelles stories se trouvent dans le rayon d'impact d'une modification?",
            detail: "Le graphe est déterministe — tree-sitter et liens d'artefacts déclarés, sans LLM ni réseau: deux builds d'un dépôt inchangé produisent des résultats identiques au byte près. Et il est volontairement jetable: un read model reconstructible à tout moment, jamais une source de vérité.",
        },
    },
    {
        key: "aspark-policy",
        name: "aSPARK-policy",
        repo: "https://github.com/a-lottes/aSPARK-policy",
        license: "MIT",
        year: 2026,
        topics: ["policy-as-code", "engineering-standards", "governance", "compliance", "json-schema", "aspark"],
        de: {
            tagline: "Engineering-Standards als ausführbare Policy-Packs",
            description: "aSPARK-policy macht aus Architekturrichtlinien, Secure-Coding-Standards, Namenskonventionen und Review-Checklisten eine maschinenlesbare Policy-Schicht. Markdown-Dateien erklären die Standards, eine policy.yaml aktiviert sie, und jeder aSPARK-Agent liest dieselbe Policy — ohne duplizierte Prompts, ohne angepasste Agenten.",
            detail: "Eine Policy wird nicht installiert, sondern eingebunden: Die Organisation pflegt ihre Standards im eigenen Repository, jedes Projekt hängt es als Git-Submodul unter .spark/policy ein. Stand heute: ein dokumentiertes Format, ein getestetes JSON Schema, ein installierbares Python-Paket und acht Katalog-Packs. Die Durchsetzung über CLI und Facilitator-Anbindung steht noch aus — das Projekt ist in früher Entwicklung.",
        },
        en: {
            tagline: "Engineering standards as executable policy packs",
            description: "aSPARK-policy turns architecture guidelines, secure coding standards, naming conventions, and review checklists into a machine-readable policy layer. Markdown files explain the standards, a policy.yaml activates them, and every aSPARK agent consumes the same policy — no duplicated prompts, no custom agent modifications.",
            detail: "A policy is not a package you install, it is a repository you mount: your organization keeps its standards in its own repo, and each project pulls it in as a Git submodule at .spark/policy. Where it stands today: a documented format, a tested JSON Schema, an installable Python package, and eight catalog packs. Enforcement via CLI and the Facilitator binding is still ahead — the project is in early development.",
        },
        fr: {
            tagline: "Des standards d'ingénierie en policy packs exécutables",
            description: "aSPARK-policy transforme les guides d'architecture, les standards de codage sécurisé, les conventions de nommage et les checklists de revue en une couche de politique lisible par machine. Des fichiers Markdown expliquent les standards, un fichier policy.yaml les active, et chaque agent aSPARK consomme la même politique — sans prompts dupliqués ni agents modifiés.",
            detail: "Une politique ne s'installe pas, elle se monte: l'organisation conserve ses standards dans son propre dépôt, et chaque projet l'intègre en sous-module Git sous .spark/policy. État actuel: un format documenté, un JSON Schema testé, un paquet Python installable et huit packs de catalogue. L'application via CLI et l'intégration du Facilitator restent à venir — le projet est en début de développement.",
        },
    },
];
