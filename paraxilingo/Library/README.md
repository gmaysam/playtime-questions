# Paraxilingo library (shared with the Watcher Device)

Same layout as the Watcher's `Version B/Library`. Everything Paraxilingo adds goes here, so the Watcher can use it too.

| Folder | What is in it |
|---|---|
| `voices/` | Lulu saying answer words in Farsi (`PX_FA_*`) and English (`PX_EN_*`), the painting intro, and the dinosaur questions (`x01_q_lulu.mp3` ...). `clips.csv` lists every file with its word |
| `questions/` | `paraxilingo_questions.csv` (new fixed questions, same columns as the Watcher's questions.csv) and `paraxilingo_games.csv` (Paraxilingo's games and whether they suit the Watcher) |
| `pictures/` | `domi.svg`, the beaver mascot |
| `games/` | `painting_pages.js`, the colouring pages |

Paraxilingo reads the Watcher library on every build, so new Watcher questions, stories, voices and pictures show up in Paraxilingo automatically.
