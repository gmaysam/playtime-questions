#!/usr/bin/env python3
"""Paraxilingo picture upgrade: word/sky/home/food pictures as Fluent 3D (MIT, @lobehub/fluent-emoji-3d), 256px PNG.
Written to tools/picover/; release copies them over the shared-pool pictures after the pool sync."""
import os,sys
from PIL import Image
A='/tmp/claude-0/fl/node_modules/@lobehub/fluent-emoji-3d/assets'
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'picover')
W=dict(bird="🐦",honey="🍯",cow="🐄",cake="🍰",rainbow="🌈",key="🔑",baby="👶",salad="🥗",sun="☀️",star="⭐",balloon="🎈",bed="🛏️",duck="🦆",socks="🧦",ten="🔟",tree="🌳",chicken="🐔",bus="🚌",bag="👜",fan="🪭",map="🗺️",web="🕸️",leg="🦵",hen="🐓",jet="✈️",pig="🐷",fox="🦊",mug="☕",dog="🐶",frog="🐸",box="📦",bee="🐝",bug="🐛",cat="🐱",hat="🎩",bat="🦇",car="🚗",snake="🐍",truck="🚚",net="🥅",can="🥫",cap="🧢",pin="📌",ship="🚢",nut="🥜")
WORDS=["bird","honey","cow","cake","rainbow","key","baby","salad","sun","star","balloon","bed","duck","socks","ten","tree","chicken","bus","bag","fan","map","web","leg","hen","jet","pig","fox","mug","dog","frog","box","bee","bug","cat","hat","bat","car","snake","truck","net","can","cap","pin","ship","nut"]
SKY=["☀️","🌙","⭐","☁️","🌧️","🌈","⚡","❄️","🚀","🧑‍🚀","🔭","🌌","☄️","🛰️","🪐","🌕"]
HOME={0:"🪺",4:"🏠",6:"🌳",9:"🌊",10:"🪨"}
FOOD=["🪱","🌱","🌾","🦴","🐟","🪰","💐","🍃","🦟","🍎","🐭","🥚","🌽"]
def code(e):
    cs=[f"{ord(c):04x}" for c in e]
    for cand in ["-".join(cs),"-".join(c for c in cs if c!="fe0f")]:
        if os.path.exists(f"{A}/{cand}.webp"):return f"{A}/{cand}.webp"
    return None
os.makedirs(OUT,exist_ok=True);miss=[];n=0
def put(name,e):
    global n
    f=code(e)
    if not f: miss.append((name,e));return
    im=Image.open(f).convert("RGBA").resize((256,256),Image.LANCZOS);im.save(f"{OUT}/{name}.png");n+=1
for i,w in enumerate(WORDS):put(f"wd_{i}",W[w])
for i,e in enumerate(SKY):put(f"sky_{i}",e)
for i,e in HOME.items():put(f"home_{i}",e)
for i,e in enumerate(FOOD):put(f"food_{i}",e)
print(n,"pictures; missing:",miss)
