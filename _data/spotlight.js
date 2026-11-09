// Content of the highlight band on the homepage, per language.
// media takes either { video, poster } or { image, alt, width, height }.
const video = {
    video: "https://aspark.lottes.dev/assets/video/aspark-demo-voice.mp4",
    poster: "https://aspark.lottes.dev/assets/video/aspark-demo-poster.jpg",
};

module.exports = {
    de: {
        label: "Open Source",
        title: "aSPARK: Determinismus für Teams aus Menschen und Agenten",
        text: "Agenten machen Teams schneller. Sie machen es aber auch schwerer zu sagen, wer was entschieden hat, welche Regel galt und ob sich das Ergebnis reproduzieren lässt. aSPARK ist meine offene Antwort darauf.",
        points: [
            {term: "Gates", text: "jedes Feature durchläuft fünf Phasen, und nur ein Mensch öffnet die nächste"},
            {term: "Nachvollziehbarkeit", text: "Stories, Code, Tests und Releases in einem lokalen Wissensgraphen verknüpft"},
            {term: "Policy-as-Code", text: "Engineering-Standards, die geprüft und nicht nur aufgeschrieben werden"},
        ],
        actions: [
            {label: "aSPARK entdecken", url: "https://aspark.lottes.dev/de/"},
            {label: "Auf GitHub ansehen", url: "https://github.com/a-lottes/aSPARK", ghost: true},
        ],
        media: {...video, caption: "100-Sekunden-Demo: ein Feature durch die komplette aSPARK-Schleife."},
    },
    en: {
        label: "Open source",
        title: "aSPARK: determinism for teams of people and agents",
        text: "Agents make teams faster. They also make it harder to say who decided what, which rule applied, and whether the result can be reproduced. aSPARK is my open answer to that.",
        points: [
            {term: "Gates", text: "every feature passes five phases, and only a person opens the next one"},
            {term: "Traceability", text: "stories, code, tests, and releases linked in a local knowledge graph"},
            {term: "Policy as code", text: "engineering standards that are checked, not just written down"},
        ],
        actions: [
            {label: "Explore aSPARK", url: "https://aspark.lottes.dev/en/"},
            {label: "View on GitHub", url: "https://github.com/a-lottes/aSPARK", ghost: true},
        ],
        media: {...video, caption: "100-second demo: one feature through the full aSPARK loop."},
    },
};
