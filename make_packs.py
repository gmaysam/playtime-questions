#!/usr/bin/env python3
"""
Builds the daily question packs the Watcher downloads over Wi-Fi.

  python3 make_packs.py --start 2026-10-23 --days 60 --out packs/

Questions come from bank.py (each has a stable id). Every day gets PER_DAY questions, chosen so that
young (3-5) and older (6-8) children both have enough, and no question comes back for BANK/PER_DAY days.
Voices: voice/<id>_q_<lulu|valf>.mp3 and voice/<id>_e_<lulu|valf>.mp3 (question and explanation, Farsi
with English words). A missing file is simply left out; the Watcher then says a general prompt.

Pack format (little-endian), at most 256 KB:
  "PTPK" u8 version=1 u8 n u16 day(days since 1970) u32 body_len u32 crc32(body)
  per question: u8 kind(0 tf,1 choice) amin amax answer pic_set pic_idx nopt topic
                question\\0 [option\\0 ...] explanation\\0
                4 clips (q lulu, q valf, e lulu, e valf): u32 bytes u32 samples data([u16 len][opus packet]...)
"""
import argparse, datetime, os, random, struct, sys, zlib
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import bank

PER_DAY = 10   # 6 for every age + 4 for six and up
PIC_SETS = {"": 0, "sky": 1, "planet": 2, "word": 3, "home": 4, "food": 5, "shape": 6}
TOPICS = {"animals": 0, "body": 1, "nature": 2, "sky": 3, "space": 4, "earth": 5, "food": 6, "math": 7, "words": 8, "life": 9, "science": 10}

def days_since_epoch(d): return (d - datetime.date(1970, 1, 1)).days

def norm(x):
    """the voice builder's trim to speech, 15 ms fades and level (voice/build_voice.py)"""
    import numpy as np
    from split import segments
    segs = segments(x, 0.3, -42)
    if not segs: return np.zeros(len(x))
    a = max(0, segs[0][0] - 800); b = min(len(x), segs[-1][1] + 1600)
    y = x[a:b].copy(); f = 240
    y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
    return np.clip(y / (np.abs(y).max() + 1) * 32767 * 0.63, -32768, 32767)

def clip_bytes(path):
    """mp3/wav -> (opus run bytes, samples) at 16 kHz, trimmed and normalised like the built-in voices"""
    if not os.path.exists(path): return b"", 0
    sys.path.insert(0, os.path.join(HERE, "..", "voice"))
    import numpy as np
    from split import load
    from opus_pack import opus_packets
    y = norm(load(path)).astype(np.int16)
    pk = opus_packets(y)
    return b"".join(struct.pack("<H", len(q)) + q for q in pk), len(y)

def item_bytes(q, voice_dir, with_voice=True):
    kind = 0 if q["kind"] == "tf" else 1
    opts = [] if kind == 0 else q["opts"]
    ans = (0 if q["answer"] else 1) if kind == 0 else q["answer"]
    pic = q.get("pic", ("", 0))
    b = bytes([kind, q["age"][0], q["age"][1], ans, PIC_SETS[pic[0]], pic[1], 2 if kind == 0 else len(opts), TOPICS[q["topic"]]])
    for s in [q["q"]] + opts + [q.get("explain", "")]:
        e = s.encode("utf-8"); assert b"\0" not in e; b += e + b"\0"
    for part in ("q", "e"):
        for v in ("lulu", "valf"):
            data, n = clip_bytes(os.path.join(voice_dir, f"{q['id']}_{part}_{v}.mp3")) if with_voice else (b"", 0)
            b += struct.pack("<II", len(data), n) + data
    return b

def pick(day_index, qs):
    """deterministic: a shuffled order of the bank, PER_DAY at a time; young/old balanced"""
    order = qs[:]
    random.Random(1234).shuffle(order)
    young = [q for q in order if q["age"][0] <= 5]
    old = [q for q in order if q["age"][0] > 5]
    ny, no = 6, PER_DAY - 6
    a = [young[(day_index * ny + i) % len(young)] for i in range(ny)]
    b = [old[(day_index * no + i) % len(old)] for i in range(no)] if old else []
    return a + b

def build(day, qs, voice_dir, with_voice=True):
    body = b"".join(item_bytes(q, voice_dir, with_voice) for q in qs)
    hdr = b"PTPK" + struct.pack("<BBHII", 1, len(qs), days_since_epoch(day) & 0xFFFF, len(body), zlib.crc32(body) & 0xFFFFFFFF)
    out = hdr + body
    assert len(out) <= 256 * 1024, (day, len(out))
    return out

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", default=str(datetime.date.today()))
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--out", default=os.path.join(HERE, "packs"))
    ap.add_argument("--voice", default=os.path.join(HERE, "voice"))
    ap.add_argument("--epoch", default="2026-10-23", help="day 0 of the question order")
    ap.add_argument("--novoice", action="store_true")
    ap.add_argument("--test-day", type=int, help="write one pack for this day number (simulator)")
    a = ap.parse_args()
    qs = bank.QUESTIONS
    bank.check()
    os.makedirs(a.out, exist_ok=True)
    if a.test_day is not None:
        d = datetime.date(1970, 1, 1) + datetime.timedelta(days=a.test_day)
        open(os.path.join(a.out, "test.pak"), "wb").write(build(d, pick(0, qs), a.voice, not a.novoice))
        sys.exit(0)
    start = datetime.date.fromisoformat(a.start); epoch = datetime.date.fromisoformat(a.epoch)
    for i in range(a.days):
        d = start + datetime.timedelta(days=i)
        data = build(d, pick((d - epoch).days, qs), a.voice, not a.novoice)
        open(os.path.join(a.out, f"{d}.pak"), "wb").write(data)
        print(d, len(data), "bytes")
