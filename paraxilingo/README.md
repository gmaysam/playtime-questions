# Paraxilingo

A Duolingo-style learning app for kids. Domi the beaver hops up a map from the forest to the Rainbow Castle; each sign on the map is a stop with a short lesson. Words on screen are English; Domi's voice is Farsi.

## Open it

Open `index.html` in Chrome or Safari. Everything it needs is in this folder (`img/`, `audio/`).
The microphone exercises only listen when the page is opened directly in a browser (or later in the phone app).

## What's inside

- `index.html` – the whole app (map, lessons, games, parents' settings).
- `img/w/z00.webp … z11.webp` – the map, cut into 12 lands, bottom (Green Forest) to top (Rainbow Castle).
- `img/beaver*.webp` – Domi.
- `audio/` – Farsi narration (Lulu voice) plus 6 English sentences (`rep1–6`) for "Repeat after Domi".

## Parents' area

Top-left button → Parents (code: 1). Choose the course topics (Numbers & Math, Clock & Calendar, Money Market; more coming), the child's age, level, questions per day and the prize theme.

## Data

Progress is saved on the device (browser storage). No server is needed yet; one is only needed later to sync between phones or send parents a weekly recap.
