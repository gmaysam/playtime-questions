# Grade 3-5 (ages 9-12) fixed questions: English (Letters & Reading sections), more Farm and People.
# (topic, age, question, [options] (first = right), [emoji], fact EN, question FA ("@KEY" = a shared question clip), fact FA)
T={"MEAN":"این کلمه‌یِ انگلیسی یعنی چی؟","FILL":"کدوم کلمه جایِ خالیِ جمله رو درست پر می‌کنه؟","SAME":"کدوم کلمه هم‌معنیِ این کلمه‌ست؟",
   "OPP":"کدوم کلمه برعکسِ این کلمه‌ست؟","IDIOM":"این اصطلاحِ انگلیسی یعنی چی؟","SIM":"کدوم جمله یه تشبیهه؟","MET":"کدوم جمله یه استعاره‌ست؟",
   "KIND":"تویِ این جمله، این کلمه چه نوع کلمه‌ایه؟","VERB":"کدوم کلمه فعله؟","READ":"متن رو بخون و به سؤال جواب بده."}
Q=[
# ---------- prefixes and suffixes ----------
("english",9,"What does 'unhappy' mean?",["Not happy","Very happy","Happy again"],["🙁","😄","🔁"],"The prefix un- means 'not'.","@MEAN","پیشوندِ اَن یعنی «نه»؛ پس یعنی خوشحال نیست."),
("english",9,"What does 'rewrite' mean?",["Write again","Not write","Write badly"],["🔁","🚫","✏️"],"The prefix re- means 'again'.","@MEAN","پیشوندِ ری یعنی «دوباره»؛ پس یعنی دوباره نوشتن."),
("english",10,"What does 'careless' mean?",["Without care","Full of care","Caring again"],["🙈","💗","🔁"],"The suffix -less means 'without'.","@MEAN","پسوندِ لِس یعنی «بدونِ»؛ پس یعنی بی‌دقت."),
("english",10,"What does 'helpful' mean?",["Full of help","Without help","Helping again"],["🤝","🚫","🔁"],"The suffix -ful means 'full of'.","@MEAN","پسوندِ فول یعنی «پر از»؛ پس یعنی پر از کمک، یعنی مفید."),
("english",10,"What does 'preview' mean?",["See before","See again","Not see"],["👀","🔁","🙈"],"The prefix pre- means 'before'.","@MEAN","پیشوندِ پری یعنی «قبل از»؛ پس یعنی از قبل دیدن."),
("english",11,"What does 'disagree' mean?",["Not agree","Agree again","Agree a lot"],["🙅","🔁","👍"],"The prefix dis- means 'not' or 'the opposite of'.","@MEAN","پیشوندِ دیس معنی رو برعکس می‌کنه؛ پس یعنی موافق نبودن."),
("english",11,"What does 'misspell' mean?",["Spell wrongly","Spell again","Spell quickly"],["❌","🔁","⚡"],"The prefix mis- means 'wrongly'.","@MEAN","پیشوندِ میس یعنی «اشتباه»؛ پس یعنی غلط نوشتن."),
# ---------- words that sound the same ----------
("english",9,"The dog wagged ___ tail.",["its","it's"],["🐕","💬"],"'It's' means 'it is'. 'Its' shows that something belongs to it.","@FILL","اینجا دُم مالِ سگه، پس کلمه‌ای رو می‌خوایم که نشون بده یه چیزی مالِ اونه."),
("english",9,"I can ___ the birds singing.",["hear","here"],["👂","📍"],"We hear with our ears. 'Here' means this place.","@FILL","با گوش می‌شنویم؛ اینجا یعنی شنیدن."),
("english",9,"___ going to the park.",["They're","There","Their"],["👫","📍","🎒"],"'They're' is short for 'they are'.","@FILL","اینجا یعنی «اونا دارن می‌رن»؛ کوتاه‌شده‌یِ دو تا کلمه‌ست."),
("english",10,"I have ___ apples.",["two","too","to"],["2️⃣","➕","➡️"],"'Two' is the number 2.","@FILL","اینجا عددِ دو رو می‌خوایم."),
("english",10,"Please put the books over ___.",["there","their","they're"],["📍","🎒","👫"],"'There' points to a place.","@FILL","اینجا داریم یه جا رو نشون می‌دیم، یعنی «اونجا»."),
("english",10,"___ coat is this?",["Whose","Who's"],["🧥","💬"],"'Who's' means 'who is'. 'Whose' asks who owns something.","@FILL","اینجا می‌پرسیم این کت مالِ کیه."),
# ---------- same meaning / opposite ----------
("english",9,"Which word means the same as 'enormous'?",["huge","tiny","quiet"],["🐘","🐜","🤫"],"Enormous means very, very big.","@SAME","یعنی خیلی خیلی بزرگ."),
("english",10,"Which word means the same as 'furious'?",["very angry","very happy","very tired"],["😡","😄","😴"],"Furious is much stronger than angry.","@SAME","یعنی خیلی خیلی عصبانی."),
("english",10,"Which word means the same as 'rapid'?",["fast","slow","loud"],["⚡","🐢","📢"],"A rapid river moves very fast.","@SAME","یعنی سریع."),
("english",11,"Which word means the same as 'fragile'?",["easily broken","very strong","very heavy"],["🥚","💪","🏋️"],"Glass and eggs are fragile.","@SAME","یعنی چیزی که زود می‌شکنه، مثلِ شیشه."),
("english",11,"Which word means the same as 'brave'?",["courageous","scared","lazy"],["🦁","😱","😴"],"Brave people do hard things even when they feel afraid.","@SAME","یعنی شجاع."),
("english",9,"Which word is the opposite of 'ancient'?",["modern","old","broken"],["📱","🏛️","💔"],"Ancient means very, very old.","@OPP","یعنی خیلی قدیمی؛ برعکسش امروزیه."),
("english",10,"Which word is the opposite of 'generous'?",["selfish","kind","rich"],["🙅","💗","💰"],"Generous people like to share.","@OPP","یعنی دست‌ودل‌باز؛ برعکسش خودخواهه."),
("english",10,"Which word is the opposite of 'whisper'?",["shout","talk","sing"],["📢","💬","🎤"],"We whisper very quietly.","@OPP","یعنی پچ‌پچ کردن؛ برعکسش داد زدنه."),
("english",11,"Which word is the opposite of 'include'?",["leave out","add","invite"],["🚪","➕","💌"],"Include means to make someone part of a group.","@OPP","یعنی کسی رو جزوِ گروه کردن؛ برعکسش کنار گذاشتنه."),
# ---------- idioms, similes, metaphors ----------
("english",10,"'It's raining cats and dogs.' What does it mean?",["It's raining very hard","Animals are falling","It's a little cloudy"],["🌧️","🐱","☁️"],"An idiom means something different from its words.","@IDIOM","یعنی بارون خیلی شدید می‌باره!"),
("english",10,"'This test is a piece of cake.' What does it mean?",["It's very easy","It's tasty","It's very hard"],["😎","🍰","😓"],"'A piece of cake' means very easy.","@IDIOM","یعنی خیلی آسونه."),
("english",11,"'I'm feeling under the weather.' What does it mean?",["I feel a bit sick","I'm outside","I'm very happy"],["🤒","🌦️","😄"],"People say this when they don't feel well.","@IDIOM","یعنی یه کم مریضم."),
("english",11,"'Don't let the cat out of the bag!' What does it mean?",["Don't tell the secret","Don't open the bag","Don't lose the cat"],["🤫","👜","🐈"],"It means to keep a secret.","@IDIOM","یعنی رازو لو نده!"),
("english",12,"'Let's break the ice.' What does it mean?",["Start talking so everyone feels friendly","Smash some ice","Make it colder"],["💬","🧊","❄️"],"People break the ice when they meet someone new.","@IDIOM","یعنی شروع کنیم با هم حرف بزنیم تا راحت‌تر بشیم."),
("english",11,"Which sentence is a simile?",["She runs as fast as the wind.","She runs fast.","She is the wind."],["🌬️","🏃","💨"],"A simile compares two things using 'like' or 'as'.","@SIM","تشبیه دو تا چیز رو با کلمه‌یِ «مثلِ» با هم مقایسه می‌کنه."),
("english",12,"Which sentence is a metaphor?",["The classroom was a zoo.","The classroom was like a zoo.","The classroom was noisy."],["🦁","🦓","📢"],"A metaphor says one thing IS another thing.","@MET","استعاره می‌گه یه چیز خودِ یه چیزِ دیگه‌ست، بدونِ کلمه‌یِ «مثلِ»."),
# ---------- kinds of words ----------
("english",9,"In 'The tall girl ran', what kind of word is 'tall'?",["Adjective (describing word)","Verb (action word)","Noun (naming word)"],["🎨","🏃","🏷️"],"Adjectives describe nouns.","@KIND","صفت یه اسم رو توصیف می‌کنه."),
("english",10,"In 'He ran quickly', what kind of word is 'quickly'?",["Adverb (how it is done)","Noun (naming word)","Adjective (describing a thing)"],["⚡","🏷️","🎨"],"Many adverbs end in -ly.","@KIND","قید می‌گه یه کار چطوری انجام شد."),
("english",9,"Which word is a verb?",["jump","chair","green"],["🤸","🪑","🟩"],"Verbs are action words.","@VERB","فعل کلمه‌ایه که یه کار رو نشون می‌ده."),
# ---------- reading ----------
("english",9,"Sara put on her coat, hat and gloves before going out. What was the weather probably like?",["Cold","Very hot","Sunny and warm"],["🥶","🥵","☀️"],"Clues in a story help us work out things it does not say.","@READ","سرنخ‌هایِ داستان کمک می‌کنن چیزی رو بفهمیم که مستقیم نگفته."),
("english",10,"Ali's plant was dry and brown. He forgot to water it for two weeks. Why did the plant look bad?",["It had no water","It was too cold","It was a toy"],["💧","🥶","🧸"],"The second sentence gives the reason.","@READ","گیاه دو هفته آب نخورده بود."),
("english",10,"Bees visit flowers to drink nectar. While they do this, they carry pollen from flower to flower. What is the main idea?",["Bees help flowers while getting food","Bees are yellow","Flowers smell nice"],["🐝","🟡","🌸"],"The main idea is what the whole text is mostly about.","@READ","ایده‌یِ اصلی همون چیزیه که کلِ متن بیشتر درباره‌شه."),
("english",11,"Nima practised the piano every day for a month. At the concert, he played without a mistake. What is the lesson?",["Practice helps us improve","Pianos are big","Concerts are long"],["🎹","📏","🎼"],"The lesson of a story is called its theme or moral.","@READ","به درسی که از داستان می‌گیریم پیامِ داستان می‌گن."),
# ---------- farm & plants ----------
("farm",9,"Which of these is a fruit?",["Tomato","Carrot","Potato"],["🍅","🥕","🥔"],"Tomatoes have seeds inside, so scientists call them fruits.","کدوم یکی از اینا میوه‌ست؟","گوجه‌فرنگی دونه داره؛ برایِ همین دانشمندها بهش میوه می‌گن."),
("farm",9,"Why do farmers put scarecrows in fields?",["To keep birds away from crops","To water the plants","To count the cows"],["🐦","💧","🐄"],"Scarecrows look like people, so birds stay away.","چرا کشاورزها تویِ مزرعه مترسک می‌ذارن؟","مترسک پرنده‌ها رو می‌ترسونه تا دونه‌ها رو نخورن."),
("farm",10,"What does a seed need to start growing?",["Water and warmth","Darkness only","Salt"],["💧","🌑","🧂"],"A seed starts to sprout when it is wet and warm.","یه دونه برایِ اینکه شروع کنه به رشد، به چی نیاز داره؟","دونه برایِ جوونه زدن آب و گرما لازم داره."),
("farm",10,"Why do many leaves change colour in autumn?",["They stop making their green colour","The cold paints them","Animals change them"],["🍂","🎨","🐿️"],"As days get shorter, leaves stop making green chlorophyll.","چرا برگِ خیلی از درخت‌ها تویِ پاییز رنگشون عوض می‌شه؟","تویِ پاییز برگ‌ها دیگه رنگِ سبز نمی‌سازن و رنگ‌هایِ زرد و نارنجی پیدا می‌شن."),
("farm",11,"What is a food web?",["Many food chains linked together","A spider's web","A kind of farm"],["🕸️","🕷️","🚜"],"In a food web, one animal can be food for many others.","شبکه‌یِ غذایی چیه؟","شبکه‌یِ غذایی از به هم وصل شدنِ چند تا زنجیره‌یِ غذایی درست می‌شه."),
("farm",11,"Why are earthworms good for farm soil?",["Their tunnels let air and water in","They eat all the plants","They make the soil dry"],["🪱","🌿","🏜️"],"Worms also turn dead leaves into food for plants.","چرا کرمِ خاکی برایِ خاکِ مزرعه خوبه؟","کرم‌ها تویِ خاک تونل درست می‌کنن و هوا و آب راحت‌تر به ریشه‌ها می‌رسه."),
("farm",11,"Which of these will never run out?",["Sunlight","Coal","Oil"],["☀️","⚫","🛢️"],"Sunlight is a renewable resource; coal and oil will run out one day.","کدوم یکی از اینا هیچ‌وقت تموم نمی‌شه؟","نورِ خورشید تموم نمی‌شه، ولی زغال‌سنگ و نفت یه روز تموم می‌شن."),
("farm",12,"What happens to a plant kept in the dark for weeks?",["It turns pale and weak","It grows faster","It turns blue"],["🥀","🌳","🔵"],"Without light, a plant cannot make its food.","اگه یه گیاه چند هفته تویِ تاریکی بمونه چی می‌شه؟","گیاه بدونِ نور نمی‌تونه غذا بسازه و رنگش می‌پره و ضعیف می‌شه."),
# ---------- people ----------
("people",9,"You find a lost wallet. What should you do?",["Give it to a grown-up or the police","Keep the money","Throw it away"],["👮","💰","🗑️"],"Giving back what is not ours is called honesty.","یه کیفِ پولِ گم‌شده پیدا می‌کنی. چیکار باید بکنی؟","برگردوندنِ چیزی که مالِ ما نیست یعنی امانت‌داری."),
("people",9,"What is a good way to end an argument with a friend?",["Talk calmly and listen","Shout louder","Never speak again"],["🗣️","📢","🤐"],"Listening helps both friends feel understood.","یه راهِ خوب برایِ تموم کردنِ دعوا با دوستت چیه؟","آروم حرف زدن و گوش دادن دعوا رو حل می‌کنه."),
("people",10,"Who fixes the water pipes in a house?",["Plumber","Pilot","Librarian"],["🔧","✈️","📚"],"Plumbers fix pipes, taps and toilets.","کی لوله‌هایِ آبِ خونه رو درست می‌کنه؟","لوله‌کش لوله‌ها، شیرِ آب و دستشویی رو تعمیر می‌کنه."),
("people",10,"What is a community?",["People who live, work or play together in one place","A kind of shop","A big building"],["🏘️","🏪","🏢"],"Your school and your neighbourhood are communities.","جامعه یا اجتماع یعنی چی؟","همسایه‌ها، مدرسه و مغازه‌هایِ محله با هم یه اجتماع‌ان."),
("people",11,"You earn 10 coins and save half. How many coins do you save?",["5","2","10"],["🪙","🪙","🪙"],"Half of 10 is 5.","ده تا سکه به دست میاری و نصفش رو پس‌انداز می‌کنی. چند تا سکه پس‌انداز کردی؟","نصفِ ده می‌شه پنج."),
("people",11,"What does a journalist do?",["Finds and writes the news","Cooks food","Fixes cars"],["📰","🍳","🔧"],"Journalists check facts before they share news.","روزنامه‌نگار چیکار می‌کنه؟","روزنامه‌نگارها خبر پیدا می‌کنن، درستیش رو بررسی می‌کنن و می‌نویسن."),
("people",12,"What does being responsible mean?",["Doing what you said you would do","Always winning","Never helping"],["✅","🏆","🙅"],"Responsible people keep their promises.","مسئولیت‌پذیر بودن یعنی چی؟","مسئولیت‌پذیری یعنی کاری که قول دادی رو انجام بدی."),
("people",12,"Why do countries trade with each other?",["To get things they cannot make themselves","To make maps","To change the weather"],["🚢","🗺️","🌦️"],"Every country has things others need.","چرا کشورها با هم تجارت می‌کنن؟","هر کشوری چیزهایی داره که بقیه ندارن؛ با تجارت همه چیزهایِ لازم رو به دست میارن."),
]
