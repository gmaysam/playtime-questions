# Paraxilingo library (for the Watcher Device and other apps)

Same layout as the Watcher's `Version B/Library`, so either app can reuse the other's files.

| Folder | What is in it |
|---|---|
| `voices/` | Lulu's Farsi names for answer words (`PX_FA_<WORD>.mp3`, 59 words: body parts, colours, animals, food, places...) and the painting intro (`PX_PAINT_INTRO.mp3`). `clips.csv`: file, voice, English word, Farsi text |
| `pictures/` | `domi.svg`, the beaver mascot as a vector picture |
| `games/` | `painting_pages.js`: the colouring pages (simple SVG shapes) |

Paraxilingo reads the Watcher library on every build (questions, stories, voices), so new Watcher questions and stories show up in Paraxilingo by themselves.
