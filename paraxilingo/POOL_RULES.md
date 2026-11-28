# Shared question pool: Paraxilingo + Watcher Device

Standing rule from Maysam (Nov 7, 2026), for every session working on either app:

1. **One pool.** The Watcher's `Desktop/Watcher/Version B/Library` and Paraxilingo's `Desktop/Paraxilingo/Library` (also in GitHub `gmaysam/playtime-questions`, branch `paraxilingo`, folder `paraxilingo/Library`) together are the shared pool. Both use the same layout: `questions/`, `voices/` (+ `clips.csv`), `pictures/`, `games/`.
2. **Reuse before you make.** Before generating anything with ElevenLabs, look in both libraries for a voice clip, picture, question or story that already fits. Generate only what is missing, to save credits.
3. **Every new question goes into the pool.** When either app adds a question, story, voice clip or picture, it is written to its own library right away so the other app can use it.
4. **Read the other side on every build.** Paraxilingo re-reads the Watcher library on every update; the Watcher should import `Desktop/Paraxilingo/Library/questions/paraxilingo_questions.csv` and its voices where they fit the device.
5. Voices: Lulu (ElevenLabs voice `ocZQ262SsZb9RIxcQBOj`) for Farsi narration. Farsi for questions and answers; English words are said too; dinosaur names stay English.
