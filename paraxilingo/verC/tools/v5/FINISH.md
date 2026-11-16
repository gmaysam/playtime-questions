# Finish the 7 new games (voices generated Nov 10, not yet downloaded)
ElevenLabs flow iHAfESBqaFtcYaVeSFHT
- Farsi instructions + facts: session 2kqpKnAJE9LjYJevawLM, generation wgGXOvUL74N7XBCQ71J2 (133.7 s) -> v5/fa.mp3, lines v5/fa_lines.json
- English sentences: session o3tIbSoU2g7IVM7nQJba, generation lwc9mZanHrUWCPO2qiJk (56.2 s) -> v5/en.mp3, lines v5/en_lines.json
Steps: fresh links via creative_get_flow_run_status; download through the Mac browser (base64 slices);
python3 tools/cutalign.py v5/fa.mp3 v5/fa_lines.json v5/cut ; same for en; copy v5/cut/*.mp3 to appC/audio/w;
games switch on by themselves (G3_READY checks PX_G3_PUZZLE.mp3); run qcheck, clipcheck, g3test, fitaudit; release; pool clips + CHANGES.
