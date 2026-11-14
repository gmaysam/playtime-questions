#!/usr/bin/env python3
"""join B64 slices saved by the browser tool into one file. usage: join64.py out.mp3 expected_len file1 file2 ..."""
import sys,json,re,base64
out,exp=sys.argv[1],int(sys.argv[2]);s=""
for f in sys.argv[3:]:
    t=json.load(open(f))[0]['text'];m=re.search('B64START(.*?)B64END',t,re.S);s+=m.group(1)
print('b64',len(s),'expected',exp);assert len(s)==exp
open(out,'wb').write(base64.b64decode(s))
