# QC page (Paraxilingo Question Check)

Owner's rules for the QC page:
- **Every new or changed thing (voice or game) goes into the "New" tab first**, with what it was before. Nothing new is mixed into the other tabs until the owner says it is fine; then it moves into its usual tab (`show` / `move` lists in `fa45.json` are emptied, see `mkdata50.py`).
- Never overwrite the owner's notes; only set `status`, `reply`, `doneAt` / `checkedAt`.
- Check every new recording on its own: decode, join with 2 s silence at known times, Scribe, and judge each clip only by the words in its own time window.

Build: `mkdata.py → mkdata46.py → mkdata47.py → mkdata48.py → mkdata49.py → mkdata50.py → page45.py`, then publish `index.html` + `aud/fa4*.mp3`, and `mkoff.py <site>` for the offline copy.
