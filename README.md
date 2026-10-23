# Play Time! daily questions

The Watcher downloads `packs/YYYY-MM-DD.pak` (today and the next 6 days) once a day over Wi-Fi from
https://raw.githubusercontent.com/gmaysam/playtime-questions/main/packs/

- `bank.py`: the questions (English on screen, Farsi spoken).
- `make_packs.py`: builds the packs (`python3 make_packs.py --start 2026-10-23 --days 60`).
- `voice/`: the spoken question and explanation for each child's voice.

The repository must be public, so the Watcher can read it without a password.
