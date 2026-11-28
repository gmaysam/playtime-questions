import json
F=json.load(open('fa45.json'))
# owner (28 Nov): everything in the edited list is correct -> back into the Farsi voice list; the "New" tab is for what comes next
F['show']=[];F['showDel']=[];F['move']=[];F['qchg']=[];F.pop('alt',None)
json.dump(F,open('fa45.json','w'),ensure_ascii=False);print('ok')
