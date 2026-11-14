"""Cut a long take into lines when pauses inside lines can be as long as pauses between them:
choose the N-1 cut pauses that best match each line's expected length (from its text length), preferring long pauses."""
import json,re,subprocess,sys
mp3,lines,out=sys.argv[1],json.load(open(sys.argv[2])),sys.argv[3]   # lines: [[name,text],...]
dur=float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
log=subprocess.run(['ffmpeg','-i',mp3,'-af','silencedetect=n=-38dB:d=0.15','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',log)];en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',log)]
sil=[(a,b) for a,b in zip(st,en) if a>0.05 and b<dur-0.05]
L=[len(t) for _,t in lines];N=len(L);tot=sum(L)
speech=dur-sum(b-a for a,b in sil)*0.6
exp=[l/tot*speech for l in L]
C=len(sil);INF=1e18
# dp[i][j]: best cost having placed i cuts, last cut at silence j
mid=lambda j:(sil[j][0]+sil[j][1])/2
cost=lambda d,e:((d-e)/max(e,0.6))**2
dp=[[INF]*C for _ in range(N)];bk=[[-1]*C for _ in range(N)]
for j in range(C):dp[1][j]=cost(mid(j),exp[0]+ (sil[j][1]-sil[j][0])/2)-0.8*(sil[j][1]-sil[j][0])
for i in range(2,N):
    for j in range(C):
        best=INF;bj=-1
        for k in range(j):
            if dp[i-1][k]>=INF:continue
            c=dp[i-1][k]+cost(sil[j][0]-sil[k][1],exp[i-1])-0.8*(sil[j][1]-sil[j][0])
            if c<best:best,bj=c,k
        dp[i][j]=best;bk[i][j]=bj
fin=min(range(C),key=lambda j:dp[N-1][j]+cost(dur-sil[j][1],exp[N-1]) if dp[N-1][j]<INF else INF)
cuts=[];j=fin
for i in range(N-1,0,-1):cuts.append(j);j=bk[i][j]
cuts=cuts[::-1];top=[sil[c] for c in cuts]
segs=[(0,top[0][0]+0.08)]+[(top[i][1]-0.06,top[i+1][0]+0.1) for i in range(len(top)-1)]+[(top[-1][1]-0.06,dur)]
for (a,b),(n,t),e in zip(segs,lines,exp):
    d=b-a;subprocess.run(['ffmpeg','-y','-v','error','-ss',f'{a:.3f}','-t',f'{d:.3f}','-i',mp3,'-af',f'afade=t=in:d=0.02,afade=t=out:st={max(0,d-0.08):.3f}:d=0.06','-b:a','128k',f'{out}/{n}.mp3'],check=True)
    print(f'{n} {d:.2f} (expected {e:.2f})')
