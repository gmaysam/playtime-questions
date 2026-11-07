#!/bin/bash
# Rebuild verC, the iPad Web folder and the website, then publish the site.
set -e
S=/tmp/claude-0/-home-claude/4b546809-d061-5b8c-bae2-78a259824393/scratchpad
cd $S
git -C /home/claude/playtime-library pull -q || true
python3 tools/sync_watcher.py /home/claude/playtime-library/library .
python3 tools/buildC2.py appB/index.html appC/index.html watcher/wq.json
python3 tools/mkweb.py appC ios/Paraxilingo/Paraxilingo/Web ios/node_modules/.bin/esbuild
python3 tools/export_library.py .
python3 tools/mksite.py ios/Paraxilingo/Paraxilingo/Web /home/claude/px-site ios/Paraxilingo/Paraxilingo/Assets.xcassets/AppIcon.appiconset/icon1024.png
cd /home/claude/px-site && git add -A && git commit -qm "Update Paraxilingo site$( [ -n "$1" ] && echo ": $1")

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01EcyxC2czjXNAMyjx8J9YLr" && git push -q origin gh-pages && git log --oneline -1
