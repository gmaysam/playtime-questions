# The question bank for the daily packs. English is shown on screen; the Farsi lines (with English words)
# are spoken in Lulu's voice for Leanna and Valf's voice for Suren.
# T(...) true/false   C(...) choose one of 2-3 short answers (each at most 12 letters)
# age: the youngest age the question is for (3: everyone, 6: six and up). pic: one of the Watcher's own pictures.
QUESTIONS = []

def T(id, topic, age, en, truth, explain, fa, fa_explain, pic=None):
    QUESTIONS.append(dict(id=id, kind="tf", topic=topic, age=(age, 8), q=en, answer=truth, explain=explain,
                          fa_q=fa + " درسته یا غلط؟", fa_e=fa_explain, **({"pic": pic} if pic else {})))

def C(id, topic, age, en, opts, answer, explain, fa, fa_explain, pic=None):
    QUESTIONS.append(dict(id=id, kind="choice", topic=topic, age=(age, 8), q=en, opts=opts, answer=answer, explain=explain,
                          fa_q=fa, fa_e=fa_explain, **({"pic": pic} if pic else {})))

def check():
    ids = set()
    for q in QUESTIONS:
        assert q["id"] not in ids, q["id"]; ids.add(q["id"])
        assert len(q["q"]) <= 90, q["id"]
        assert len(q["explain"]) <= 120, q["id"]
        if q["kind"] == "choice":
            assert 2 <= len(q["opts"]) <= 3 and 0 <= q["answer"] < len(q["opts"]), q["id"]
            for o in q["opts"]: assert len(o) <= 12, (q["id"], o)

SKY = {n: ("sky", i) for i, n in enumerate("sun moon star cloud rain rainbow lightning snow rocket astronaut telescope galaxy comet satellite planet fullmoon".split())}
PLANET = {n: ("planet", i) for i, n in enumerate("sun mercury venus earth mars jupiter saturn uranus neptune".split())}
W = {n: ("word", i) for i, n in enumerate("bird honey cow cake rainbow key baby salad sun star balloon bed duck socks ten tree chicken bus cab mad bag ham fan map web leg hen jet bib lid pig shark lip hit mix pod log mom mop hot fox tub mud mug gum cut dog frog box bee caterpillar cat hat bat car snake truck net can cap pin ship nut".split())}
HOME = {n: ("home", i) for i, n in enumerate("nest barn pond doghouse house hive tree cave den sea rocks".split())}
FOOD = {n: ("food", i) for i, n in enumerate("worms grass seeds bone fish flies flowers leaves mosquitoes apples mice eggs corn".split())}
SHAPE = {n: ("shape", i) for i, n in enumerate("circle square triangle rectangle star oval rhombus trapezoid pentagon hexagon octagon parallelogram cube cylinder sphere cone pyramid prism".split())}

# ------------------------------------------------------------------ animals
C("a01", "animals", 3, "Which animal says moo?", ["Cow", "Duck", "Cat"], 0, "Cows say moo, and they give us milk.",
  "کدوم حیوون می‌گه ماااا؟ Cow، Duck یا Cat؟", "گاو می‌گه ماااا، و به ما شیر می‌ده.", W["cow"])
C("a02", "animals", 3, "Which animal can fly?", ["Pig", "Bird", "Dog"], 1, "Birds fly with their wings.",
  "کدوم حیوون می‌تونه پرواز کنه؟ Pig، Bird یا Dog؟", "پرنده‌ها با بال‌هاشون پرواز می‌کنن.", W["bird"])
T("a03", "animals", 3, "Fish live in water.", True, "Fish breathe in water with their gills.",
  "ماهی‌ها توی آب زندگی می‌کنن.", "ماهی‌ها با آبشش‌هاشون توی آب نفس می‌کشن.", FOOD["fish"])
T("a04", "animals", 3, "A frog can jump.", True, "Frogs have long strong back legs for jumping.",
  "قورباغه می‌تونه بپره.", "قورباغه پاهای عقبیِ بلند و قوی داره واسه پریدن.", W["frog"])
C("a05", "animals", 3, "Who makes honey?", ["Bee", "Fox", "Duck"], 0, "Bees make honey from the sweet juice of flowers.",
  "کی عسل درست می‌کنه؟ Bee، Fox یا Duck؟", "زنبور از شهدِ شیرینِ گل‌ها عسل درست می‌کنه.", W["bee"])
T("a06", "animals", 3, "A cat has wings.", False, "Cats have four legs and a tail, but no wings.",
  "گربه بال داره.", "گربه چهار تا پا و یه دُم داره، ولی بال نداره.", W["cat"])
C("a07", "animals", 3, "How many legs does a dog have?", ["2", "4", "6"], 1, "Dogs walk on four legs.",
  "سگ چند تا پا داره؟ two، four یا six؟", "سگ روی چهار تا پا راه می‌ره.", W["dog"])
C("a08", "animals", 3, "Where does a bird sleep?", ["Nest", "Hive", "Pond"], 0, "Birds build nests from twigs and grass.",
  "پرنده کجا می‌خوابه؟ Nest، Hive یا Pond؟", "پرنده‌ها با شاخه‌های کوچیک و علف لونه می‌سازن.", HOME["nest"])
T("a09", "animals", 3, "A baby cat is called a kitten.", True, "Baby cats are kittens and baby dogs are puppies.",
  "به بچه‌گربه می‌گن kitten.", "به بچه‌گربه می‌گن kitten، و به بچه‌سگ می‌گن puppy.", W["cat"])
C("a10", "animals", 3, "Which animal is the biggest?", ["Mouse", "Elephant", "Cat"], 1, "Elephants are the biggest animals that live on land.",
  "کدوم حیوون از همه بزرگ‌تره؟ Mouse، Elephant یا Cat؟", "فیل بزرگ‌ترین حیوونیه که روی خشکی زندگی می‌کنه.")
T("a11", "animals", 3, "Ducks can swim.", True, "Ducks have webbed feet that work like paddles.",
  "اردک‌ها می‌تونن شنا کنن.", "پاهای اردک پرده داره و مثلِ پارو کار می‌کنه.", W["duck"])
C("a12", "animals", 3, "Which one lays eggs?", ["Hen", "Cow", "Dog"], 0, "Hens lay eggs. Chicks hatch out of them.",
  "کدوم تخم می‌ذاره؟ Hen، Cow یا Dog؟", "مرغ تخم می‌ذاره، و جوجه‌ها از توی تخم بیرون میان.", W["hen"])
T("a13", "animals", 3, "A snake has legs.", False, "Snakes have no legs. They slide on their bellies.",
  "مار پا داره.", "مار پا نداره. روی شکمش سُر می‌خوره و می‌ره.", W["snake"])
C("a14", "animals", 3, "What does a cow eat?", ["Grass", "Fish", "Bones"], 0, "Cows eat grass all day long.",
  "گاو چی می‌خوره؟ Grass، Fish یا Bones؟", "گاو تمامِ روز علف می‌خوره.", FOOD["grass"])
C("a15", "animals", 3, "Which animal has a long trunk?", ["Lion", "Elephant", "Bear"], 1, "An elephant uses its trunk like a hand and a straw.",
  "کدوم حیوون خرطومِ بلند داره؟ Lion، Elephant یا Bear؟", "فیل از خرطومش مثلِ دست و نِی استفاده می‌کنه.")
T("a16", "animals", 3, "Bats sleep upside down.", True, "Bats hang upside down by their feet to sleep.",
  "خفاش‌ها سر و ته می‌خوابن.", "خفاش‌ها با پاهاشون آویزون می‌شن و سر و ته می‌خوابن.", W["bat"])
C("a17", "animals", 6, "A caterpillar grows into a...", ["Butterfly", "Bee", "Bird"], 0, "A caterpillar makes a cocoon, then comes out as a butterfly!",
  "کرمِ پروانه بزرگ می‌شه و می‌شه چی؟ Butterfly، Bee یا Bird؟", "کرم یه پیله درست می‌کنه، بعد پروانه می‌شه و بیرون میاد!", W["caterpillar"])
T("a18", "animals", 6, "A whale is a fish.", False, "Whales live in the sea but they breathe air, like us. They are mammals.",
  "نهنگ یه ماهیه.", "نهنگ توی دریا زندگی می‌کنه ولی مثلِ ما هوا نفس می‌کشه. نهنگ پستانداره.")
C("a19", "animals", 6, "How many legs does a spider have?", ["6", "8", "10"], 1, "Spiders have 8 legs. Insects have 6.",
  "عنکبوت چند تا پا داره؟ six، eight یا ten؟", "عنکبوت هشت تا پا داره. حشره‌ها شش تا پا دارن.", W["web"])
T("a20", "animals", 6, "Penguins can fly.", False, "Penguins cannot fly, but they are amazing swimmers.",
  "پنگوئن‌ها می‌تونن پرواز کنن.", "پنگوئن‌ها نمی‌تونن پرواز کنن، ولی شناگرهای فوق‌العاده‌ای هستن.")
C("a21", "animals", 6, "Which animal is the fastest runner?", ["Cheetah", "Turtle", "Cow"], 0, "A cheetah can run as fast as a car on the highway.",
  "کدوم حیوون از همه تندتر می‌دوه؟ Cheetah، Turtle یا Cow؟", "یوزپلنگ می‌تونه به سرعتِ ماشین توی اتوبان بدوه.")
T("a22", "animals", 6, "A frog starts life as a tadpole.", True, "Tadpoles live in water and slowly grow legs.",
  "قورباغه اول بچه‌قورباغه‌ست، یعنی tadpole.", "بچه‌قورباغه‌ها توی آب زندگی می‌کنن و کم‌کم پا درمیارن.", W["frog"])
C("a23", "animals", 6, "Which animal sleeps all winter?", ["Bear", "Hen", "Cow"], 0, "Many bears sleep through the cold winter. This is called hibernation.",
  "کدوم حیوون کلِ زمستون می‌خوابه؟ Bear، Hen یا Cow؟", "خیلی از خرس‌ها کلِ زمستونِ سرد رو می‌خوابن. بهش می‌گن خوابِ زمستونی.")
T("a24", "animals", 6, "Bees help flowers make fruit.", True, "Bees carry pollen from flower to flower, and that helps fruit grow.",
  "زنبورها به گل‌ها کمک می‌کنن میوه بدن.", "زنبورها گرده رو از یه گل به گلِ دیگه می‌برن، و این به میوه دادن کمک می‌کنه.", W["bee"])
C("a25", "animals", 6, "Where does a shark live?", ["Sea", "Cave", "Barn"], 0, "Sharks swim in the sea. They have been around longer than dinosaurs!",
  "کوسه کجا زندگی می‌کنه؟ Sea، Cave یا Barn؟", "کوسه‌ها توی دریا شنا می‌کنن. حتی از دایناسورها هم قدیمی‌ترن!", W["shark"])
T("a26", "animals", 6, "A giraffe has a very short neck.", False, "Giraffes have the longest necks of all animals, to reach high leaves.",
  "زرافه گردنِ خیلی کوتاهی داره.", "زرافه درازترین گردن رو بینِ همه‌ی حیوون‌ها داره، تا به برگ‌های بالا برسه.")
C("a27", "animals", 6, "Which is an insect?", ["Ant", "Fish", "Frog"], 0, "Ants are insects: six legs and three body parts.",
  "کدوم حشره‌ست؟ Ant، Fish یا Frog؟", "مورچه حشره‌ست: شش تا پا و سه تیکه بدن داره.")
T("a28", "animals", 6, "An octopus has eight arms.", True, "Octo means eight. An octopus has eight arms and three hearts!",
  "هشت‌پا هشت تا بازو داره.", "اختاپوس هشت تا بازو داره و سه تا قلب!")

# ------------------------------------------------------------------ the body and healthy life
C("b01", "body", 3, "What do we see with?", ["Eyes", "Ears", "Nose"], 0, "We see with our eyes and hear with our ears.",
  "با چی می‌بینیم؟ Eyes، Ears یا Nose؟", "با چشم‌هامون می‌بینیم و با گوش‌هامون می‌شنویم.")
C("b02", "body", 3, "What do we hear with?", ["Hands", "Ears", "Feet"], 1, "Our ears catch sounds.",
  "با چی می‌شنویم؟ Hands، Ears یا Feet؟", "گوش‌هامون صداها رو می‌گیرن.")
T("b03", "body", 3, "We should wash our hands before we eat.", True, "Washing with soap takes the germs away.",
  "قبل از غذا خوردن باید دست‌هامون رو بشوریم.", "شستن با صابون میکروب‌ها رو از بین می‌بره.")
C("b04", "body", 3, "How many fingers are on one hand?", ["4", "5", "10"], 1, "Five fingers on each hand: ten in all!",
  "یه دست چند تا انگشت داره؟ four، five یا ten؟", "هر دست پنج تا انگشت داره؛ روی هم ده تا!")
T("b05", "body", 3, "Sleeping helps you grow.", True, "Your body grows and rests while you sleep.",
  "خوابیدن کمک می‌کنه بزرگ بشی.", "وقتی می‌خوابی بدنت استراحت می‌کنه و رشد می‌کنه.", W["bed"])
C("b06", "body", 3, "What do we smell with?", ["Nose", "Knee", "Hair"], 0, "Our nose smells flowers, cake and everything else.",
  "با چی بو می‌کنیم؟ Nose، Knee یا Hair؟", "با دماغمون بوی گل و کیک و همه‌چیز رو حس می‌کنیم.")
T("b07", "body", 3, "Brushing teeth keeps them healthy.", True, "Brush in the morning and before bed.",
  "مسواک زدن دندون‌ها رو سالم نگه می‌داره.", "صبح‌ها و قبل از خواب مسواک بزن.")
C("b08", "body", 3, "Which food is good for you?", ["Candy", "Apple", "Chips"], 1, "Fruit and vegetables help your body stay strong.",
  "کدوم غذا برات خوبه؟ Candy، Apple یا Chips؟", "میوه و سبزی کمک می‌کنن بدنت قوی بمونه.", FOOD["apples"])
T("b09", "body", 6, "Your heart is a muscle.", True, "Your heart is a strong muscle that pumps blood all day and night.",
  "قلبت یه ماهیچه‌ست.", "قلبت یه ماهیچه‌ی قویه که شب و روز خون رو پمپ می‌کنه.")
C("b10", "body", 6, "What do our lungs do?", ["Breathe", "Think", "Walk"], 0, "Lungs take in air when we breathe in.",
  "شُش‌هامون چی‌کار می‌کنن؟ Breathe، Think یا Walk؟", "وقتی نفس می‌کشیم، شُش‌ها هوا رو می‌گیرن.")
T("b11", "body", 6, "Babies have more bones than grown-ups.", True, "Babies have about 300 bones. Some join together as they grow, so adults have 206.",
  "نوزادها از بزرگ‌ترها استخونِ بیشتری دارن.", "نوزادها حدود سیصد تا استخون دارن. بعضی‌هاش موقعِ بزرگ شدن به هم می‌چسبن، واسه همین بزرگ‌ترها دویست و شش تا دارن.", W["baby"])
C("b12", "body", 6, "Which part of you thinks?", ["Brain", "Elbow", "Toe"], 0, "Your brain thinks, remembers and tells your body what to do.",
  "کدوم قسمتِ بدنت فکر می‌کنه؟ Brain، Elbow یا Toe؟", "مغزت فکر می‌کنه، یادش می‌مونه، و به بدنت می‌گه چی‌کار کنه.")
T("b13", "body", 6, "Drinking water is good for your body.", True, "More than half of your body is water!",
  "آب خوردن واسه بدنت خوبه.", "بیشتر از نصفِ بدنِ تو آبه!")
C("b14", "body", 6, "How many teeth does a grown-up have?", ["12", "32", "100"], 1, "Children have 20 baby teeth; grown-ups have 32.",
  "یه آدمِ بزرگ چند تا دندون داره؟ twelve، thirty-two یا one hundred؟", "بچه‌ها بیست تا دندونِ شیری دارن؛ بزرگ‌ترها سی و دو تا.")

# ------------------------------------------------------------------ plants and nature
C("n01", "nature", 3, "What do plants need to grow?", ["Water", "Toys", "Shoes"], 0, "Plants need water, sunlight and soil.",
  "گیاه‌ها واسه رشد کردن چی لازم دارن؟ Water، Toys یا Shoes؟", "گیاه‌ها آب، نورِ خورشید و خاک لازم دارن.", W["tree"])
T("n02", "nature", 3, "Trees have roots.", True, "Roots hold the tree in the ground and drink water.",
  "درخت‌ها ریشه دارن.", "ریشه‌ها درخت رو توی زمین نگه می‌دارن و آب می‌خورن.", W["tree"])
C("n03", "nature", 3, "What colour are most leaves?", ["Green", "Blue", "Purple"], 0, "Leaves are green because of a helper called chlorophyll.",
  "رنگِ بیشترِ برگ‌ها چیه؟ Green، Blue یا Purple؟", "برگ‌ها سبزن، به خاطرِ یه کمک‌کننده به اسمِ کلروفیل.", FOOD["leaves"])
T("n04", "nature", 3, "Apples grow on trees.", True, "Apples grow on apple trees, from flowers in spring.",
  "سیب روی درخت رشد می‌کنه.", "سیب روی درختِ سیب رشد می‌کنه، از گل‌های بهاری.", FOOD["apples"])
C("n05", "nature", 3, "In autumn, leaves often turn...", ["Orange", "Blue", "White"], 0, "In autumn many leaves turn yellow, orange and red, then fall.",
  "توی پاییز برگ‌ها معمولاً چه رنگی می‌شن؟ Orange، Blue یا White؟", "پاییز خیلی از برگ‌ها زرد و نارنجی و قرمز می‌شن، بعد می‌ریزن.", FOOD["leaves"])
T("n06", "nature", 3, "Flowers can grow from seeds.", True, "A tiny seed in the soil can grow into a big flower.",
  "گل‌ها می‌تونن از دونه رشد کنن.", "یه دونه‌ی کوچولو توی خاک می‌تونه یه گلِ بزرگ بشه.", FOOD["seeds"])
C("n07", "nature", 3, "Which season is the coldest?", ["Summer", "Winter", "Spring"], 1, "Winter is the coldest season. Sometimes it snows!",
  "کدوم فصل از همه سردتره؟ Summer، Winter یا Spring؟", "زمستون سردترین فصله. گاهی برف میاد!", SKY["snow"])
T("n08", "nature", 3, "Ice is frozen water.", True, "When water gets very cold, it turns into ice.",
  "یخ آبِ یخ‌زده‌ست.", "وقتی آب خیلی سرد بشه، یخ می‌زنه.", SKY["snow"])
C("n09", "nature", 6, "What do bees take from flowers?", ["Nectar", "Sand", "Milk"], 0, "Bees drink nectar from flowers and turn it into honey.",
  "زنبورها از گل‌ها چی برمی‌دارن؟ Nectar، Sand یا Milk؟", "زنبورها شهدِ گل‌ها رو می‌خورن و ازش عسل درست می‌کنن.", W["bee"])
T("n10", "nature", 6, "Plants make their own food from sunlight.", True, "Leaves use sunlight, air and water to make food. This is called photosynthesis.",
  "گیاه‌ها با نورِ خورشید غذای خودشون رو درست می‌کنن.", "برگ‌ها با نورِ خورشید، هوا و آب غذا درست می‌کنن. بهش می‌گن فتوسنتز.", FOOD["leaves"])
C("n11", "nature", 6, "Which tree stays green all winter?", ["Pine", "Apple", "Maple"], 0, "Pine trees keep their needles all year long.",
  "کدوم درخت کلِ زمستون سبز می‌مونه؟ Pine، Apple یا Maple؟", "درختِ کاج تمامِ سال برگ‌های سوزنیش رو نگه می‌داره.", W["tree"])
T("n12", "nature", 6, "A cactus needs lots of rain.", False, "Cactuses live in deserts and store water inside.",
  "کاکتوس بارونِ خیلی زیادی لازم داره.", "کاکتوس‌ها توی بیابون زندگی می‌کنن و آب رو توی خودشون نگه می‌دارن.")
C("n13", "nature", 6, "What is a forest full of?", ["Trees", "Cars", "Shops"], 0, "Forests are full of trees, and many animals live there.",
  "جنگل پر از چیه؟ Trees، Cars یا Shops؟", "جنگل پر از درخته، و حیوون‌های زیادی اونجا زندگی می‌کنن.", W["tree"])
T("n14", "nature", 6, "Mushrooms are plants.", False, "Mushrooms are not plants. They are fungi.",
  "قارچ‌ها گیاه هستن.", "قارچ‌ها گیاه نیستن. اونا جزوِ قارچ‌ها، یعنی fungi هستن.")

# ------------------------------------------------------------------ weather and the sky
C("s01", "sky", 3, "Where does rain come from?", ["Clouds", "Trees", "Rocks"], 0, "Clouds are made of tiny drops. When they get heavy, they fall as rain.",
  "بارون از کجا میاد؟ Clouds، Trees یا Rocks؟", "ابرها از قطره‌های ریز درست شدن. وقتی سنگین بشن، به شکلِ بارون می‌ریزن.", SKY["rain"])
T("s02", "sky", 3, "The Sun is hot.", True, "The Sun is a giant hot star. It warms the Earth.",
  "خورشید داغه.", "خورشید یه ستاره‌ی خیلی بزرگ و داغه. زمین رو گرم می‌کنه.", SKY["sun"])
C("s03", "sky", 3, "What do we see after rain and sun?", ["Rainbow", "Snow", "Moon"], 0, "Sunlight shining through raindrops makes a rainbow.",
  "بعد از بارون و آفتاب چی می‌بینیم؟ Rainbow، Snow یا Moon؟", "وقتی نورِ خورشید از قطره‌های بارون رد بشه، رنگین‌کمون درست می‌شه.", SKY["rainbow"])
T("s04", "sky", 3, "We can see stars at night.", True, "Stars are there in the day too, but the Sun is too bright to see them.",
  "شب‌ها می‌تونیم ستاره‌ها رو ببینیم.", "ستاره‌ها روزها هم هستن، ولی خورشید اونقدر روشنه که نمی‌بینیمشون.", SKY["star"])
C("s05", "sky", 3, "What do we wear when it rains?", ["Raincoat", "Swimsuit", "Crown"], 0, "A raincoat and boots keep us dry.",
  "وقتی بارون میاد چی می‌پوشیم؟ Raincoat، Swimsuit یا Crown؟", "بارونی و چکمه ما رو خشک نگه می‌دارن.", SKY["rain"])
T("s06", "sky", 3, "Snow is warm.", False, "Snow is very cold. It is made of tiny pieces of ice.",
  "برف گرمه.", "برف خیلی سرده. از تیکه‌های ریزِ یخ درست شده.", SKY["snow"])
C("s07", "sky", 3, "What shines in the sky in the day?", ["Sun", "Moon", "Comet"], 0, "The Sun gives us daylight.",
  "روزها چی توی آسمون می‌درخشه؟ Sun، Moon یا Comet؟", "خورشید به ما نورِ روز می‌ده.", SKY["sun"])
T("s08", "sky", 3, "The wind can move clouds.", True, "Wind pushes the clouds across the sky.",
  "باد می‌تونه ابرها رو جابه‌جا کنه.", "باد ابرها رو توی آسمون هُل می‌ده.", SKY["cloud"])
C("s09", "sky", 6, "What comes first?", ["Lightning", "Thunder"], 0, "Light is faster than sound, so we see lightning before we hear thunder.",
  "اول کدوم میاد؟ Lightning یا Thunder؟", "نور از صدا تندتره، واسه همین برق رو قبل از شنیدنِ رعد می‌بینیم.", SKY["lightning"])
T("s10", "sky", 6, "A rainbow has seven colours.", True, "Red, orange, yellow, green, blue, indigo and violet.",
  "رنگین‌کمون هفت تا رنگ داره.", "قرمز، نارنجی، زرد، سبز، آبی، نیلی و بنفش.", SKY["rainbow"])
C("s11", "sky", 6, "What is fog?", ["A low cloud", "Smoke", "Snow"], 0, "Fog is a cloud that sits close to the ground.",
  "مه چیه؟ A low cloud، Smoke یا Snow؟", "مه یه ابره که نزدیکِ زمین نشسته.", SKY["cloud"])
T("s12", "sky", 6, "Every snowflake has six sides.", True, "Snowflakes have six arms, and no two look exactly the same.",
  "هر دونه‌ی برف شش تا گوشه داره.", "دونه‌های برف شش تا بازو دارن، و هیچ دو تاشون دقیقاً شبیهِ هم نیستن.", SKY["snow"])
C("s13", "sky", 6, "Which season comes after winter?", ["Spring", "Autumn", "Summer"], 0, "Winter, spring, summer, autumn - and around again.",
  "بعد از زمستون کدوم فصل میاد؟ Spring، Autumn یا Summer؟", "زمستون، بهار، تابستون، پاییز، و دوباره از اول.")
T("s14", "sky", 6, "The Sun goes around the Earth.", False, "The Earth goes around the Sun. It takes one year.",
  "خورشید دورِ زمین می‌چرخه.", "زمین دورِ خورشید می‌چرخه. یه سال طول می‌کشه.", SKY["sun"])

# ------------------------------------------------------------------ space
C("p01", "space", 3, "Who goes to space in a rocket?", ["Astronaut", "Farmer", "Baker"], 0, "Astronauts travel to space in rockets.",
  "کی با موشک به فضا می‌ره؟ Astronaut، Farmer یا Baker؟", "فضانوردها با موشک به فضا سفر می‌کنن.", SKY["astronaut"])
T("p02", "space", 3, "We live on planet Earth.", True, "Earth is our home planet, with land, sea and air.",
  "ما روی سیاره‌ی زمین زندگی می‌کنیم.", "زمین سیاره‌ی خونه‌ی ماست، با خشکی و دریا و هوا.", PLANET["earth"])
C("p03", "space", 3, "Which planet has big rings?", ["Saturn", "Earth", "Mars"], 0, "Saturn's rings are made of ice and rock.",
  "کدوم سیاره حلقه‌های بزرگ داره؟ Saturn، Earth یا Mars؟", "حلقه‌های زحل از یخ و سنگ درست شدن.", PLANET["saturn"])
T("p04", "space", 3, "The Moon is shaped like a ball.", True, "The Moon is round like a ball. We just see different parts of it lit up.",
  "ماه شکلِ توپه.", "ماه مثلِ توپ گِرده. ما فقط قسمت‌های مختلفِ روشنش رو می‌بینیم.", SKY["fullmoon"])
C("p05", "space", 3, "Which planet is red?", ["Mars", "Neptune", "Earth"], 0, "Mars is called the red planet because of its red dust.",
  "کدوم سیاره قرمزه؟ Mars، Neptune یا Earth؟", "به مریخ می‌گن سیاره‌ی سرخ، به خاطرِ خاکِ قرمزش.", PLANET["mars"])
T("p06", "space", 3, "You can breathe on the Moon without a helmet.", False, "There is no air on the Moon, so astronauts wear space suits.",
  "روی ماه بدونِ کلاهِ فضایی می‌شه نفس کشید.", "روی ماه هوا نیست، واسه همین فضانوردها لباسِ فضایی می‌پوشن.", SKY["astronaut"])
C("p07", "space", 6, "Which is the biggest planet?", ["Jupiter", "Mars", "Venus"], 0, "Jupiter is so big that more than 1000 Earths could fit inside.",
  "بزرگ‌ترین سیاره کدومه؟ Jupiter، Mars یا Venus؟", "مشتری اونقدر بزرگه که بیشتر از هزار تا زمین توش جا می‌شه.", PLANET["jupiter"])
T("p08", "space", 6, "The Sun is a star.", True, "The Sun is our closest star. Other stars are much farther away.",
  "خورشید یه ستاره‌ست.", "خورشید نزدیک‌ترین ستاره به ماست. بقیه‌ی ستاره‌ها خیلی دورترن.", SKY["sun"])
C("p09", "space", 6, "How many planets go around our Sun?", ["5", "8", "20"], 1, "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.",
  "چند تا سیاره دورِ خورشیدِ ما می‌چرخن؟ five، eight یا twenty؟", "عطارد، زهره، زمین، مریخ، مشتری، زحل، اورانوس و نپتون.", SKY["planet"])
T("p10", "space", 6, "Our galaxy is called the Milky Way.", True, "The Milky Way has billions of stars. Our Sun is one of them.",
  "اسمِ کهکشانِ ما راه شیریه.", "راه شیری میلیاردها ستاره داره. خورشیدِ ما یکی از اوناست.", SKY["galaxy"])
C("p11", "space", 6, "What do we look at stars with?", ["Telescope", "Spoon", "Ladder"], 0, "A telescope makes faraway things look big and close.",
  "با چی ستاره‌ها رو نگاه می‌کنیم؟ Telescope، Spoon یا Ladder؟", "تلسکوپ چیزهای دور رو بزرگ و نزدیک نشون می‌ده.", SKY["telescope"])
T("p12", "space", 6, "The Moon makes its own light.", False, "The Moon shines because sunlight bounces off it.",
  "ماه نورِ خودش رو درست می‌کنه.", "ماه می‌درخشه چون نورِ خورشید بهش می‌خوره و برمی‌گرده.", SKY["moon"])
C("p13", "space", 6, "Which planet is closest to the Sun?", ["Mercury", "Neptune", "Earth"], 0, "Mercury is closest to the Sun, and Neptune is the farthest.",
  "کدوم سیاره به خورشید از همه نزدیک‌تره؟ Mercury، Neptune یا Earth؟", "عطارد از همه به خورشید نزدیک‌تره، و نپتون از همه دورتر.", PLANET["mercury"])
T("p14", "space", 6, "A satellite goes around the Earth.", True, "Satellites help with phones, TV, maps and weather.",
  "ماهواره دورِ زمین می‌چرخه.", "ماهواره‌ها به تلفن، تلویزیون، نقشه و پیش‌بینیِ هوا کمک می‌کنن.", SKY["satellite"])

# ------------------------------------------------------------------ our Earth
C("e01", "earth", 3, "What is the sea full of?", ["Water", "Sand", "Milk"], 0, "Seas and oceans are full of salty water.",
  "دریا پر از چیه؟ Water، Sand یا Milk؟", "دریاها و اقیانوس‌ها پر از آبِ شورن.", HOME["sea"])
T("e02", "earth", 3, "Sea water is salty.", True, "Sea water has salt in it, so we should not drink it.",
  "آبِ دریا شوره.", "آبِ دریا نمک داره، واسه همین نباید ازش بخوریم.", HOME["sea"])
C("e03", "earth", 3, "Where is it very hot and sandy?", ["Desert", "Pond", "Snow"], 0, "Deserts are dry, sandy and often very hot.",
  "کجا خیلی گرم و پر از شنه؟ Desert، Pond یا Snow؟", "بیابون‌ها خشک و پر از شن و معمولاً خیلی گرمن.")
T("e04", "earth", 3, "Mountains are very tall.", True, "Some mountains are so tall that they have snow on top all year.",
  "کوه‌ها خیلی بلندن.", "بعضی کوه‌ها اونقدر بلندن که تمامِ سال روی قلّه‌شون برفه.")
C("e05", "earth", 6, "Which is the biggest?", ["Ocean", "Lake", "Pond"], 0, "Oceans are the biggest bodies of water. They cover most of the Earth.",
  "کدوم از همه بزرگ‌تره؟ Ocean، Lake یا Pond؟", "اقیانوس‌ها بزرگ‌ترین آب‌های زمین هستن. بیشترِ زمین رو پوشوندن.", HOME["sea"])
T("e06", "earth", 6, "Most of the Earth is covered by water.", True, "About seven tenths of the Earth is ocean.",
  "بیشترِ زمین با آب پوشیده شده.", "حدود هفت دهمِ زمین اقیانوسه.", PLANET["earth"])
C("e07", "earth", 6, "What comes out of a volcano?", ["Lava", "Snow", "Juice"], 0, "Lava is melted rock, so hot that it glows.",
  "از آتشفشان چی بیرون میاد؟ Lava، Snow یا Juice؟", "گدازه سنگِ ذوب‌شده‌ست، اونقدر داغ که می‌درخشه.")
T("e08", "earth", 6, "The Earth spins around once every day.", True, "When our side faces the Sun it is day; when it turns away it is night.",
  "زمین هر روز یه دور دورِ خودش می‌چرخه.", "وقتی طرفِ ما رو به خورشیده روزه؛ وقتی برمی‌گرده شبه.", PLANET["earth"])
C("e09", "earth", 6, "Where is it always very cold?", ["North Pole", "Desert", "Beach"], 0, "The North and South Poles are covered in ice.",
  "کجا همیشه خیلی سرده؟ North Pole، Desert یا Beach؟", "قطبِ شمال و قطبِ جنوب پوشیده از یخن.", SKY["snow"])
T("e10", "earth", 6, "Rivers flow into the sea.", True, "Most rivers start in the mountains and end in the sea.",
  "رودخونه‌ها به دریا می‌ریزن.", "بیشترِ رودخونه‌ها از کوه‌ها شروع می‌شن و به دریا می‌رسن.")

# ------------------------------------------------------------------ food
C("f01", "food", 3, "Which one is a fruit?", ["Banana", "Bread", "Cheese"], 0, "Bananas are fruit. They grow in bunches.",
  "کدوم میوه‌ست؟ Banana، Bread یا Cheese؟", "موز میوه‌ست. خوشه‌ای رشد می‌کنه.")
T("f02", "food", 3, "Milk comes from cows.", True, "Cows, goats and sheep give milk.",
  "شیر از گاو میاد.", "گاو، بز و گوسفند شیر می‌دن.", W["cow"])
C("f03", "food", 3, "What colour is a banana?", ["Yellow", "Blue", "Black"], 0, "Ripe bananas are yellow.",
  "موز چه رنگیه؟ Yellow، Blue یا Black؟", "موزِ رسیده زرده.")
T("f04", "food", 3, "Carrots grow under the ground.", True, "We eat the carrot root that grows in the soil.",
  "هویج زیرِ خاک رشد می‌کنه.", "ما ریشه‌ی هویج رو می‌خوریم که توی خاک رشد می‌کنه.")
C("f05", "food", 3, "What do we make bread from?", ["Flour", "Stones", "Paper"], 0, "Flour is made from wheat, and bread is baked from flour.",
  "نون رو از چی درست می‌کنیم؟ Flour، Stones یا Paper؟", "آرد رو از گندم درست می‌کنن، و نون رو از آرد می‌پزن.")
T("f06", "food", 3, "Eggs come from hens.", True, "Hens lay the eggs we eat.",
  "تخم‌مرغ از مرغ میاد.", "مرغ‌ها تخم‌مرغی رو که ما می‌خوریم می‌ذارن.", FOOD["eggs"])
C("f07", "food", 6, "Popcorn is made from...", ["Corn", "Rice", "Beans"], 0, "Corn kernels pop when they get hot.",
  "پاپ‌کورن رو از چی درست می‌کنن؟ Corn، Rice یا Beans؟", "دونه‌های ذرت وقتی داغ بشن می‌ترکن و پف می‌کنن.", FOOD["corn"])
T("f08", "food", 6, "A tomato is a fruit.", True, "Tomatoes have seeds inside, so they are fruit, even though we use them like vegetables.",
  "گوجه‌فرنگی یه میوه‌ست.", "گوجه‌فرنگی توش دونه داره، پس میوه‌ست، هرچند مثلِ سبزی ازش استفاده می‌کنیم.")
C("f09", "food", 6, "Cheese is made from...", ["Milk", "Apples", "Rice"], 0, "Cheese is made from milk.",
  "پنیر رو از چی درست می‌کنن؟ Milk، Apples یا Rice؟", "پنیر رو از شیر درست می‌کنن.")
T("f10", "food", 6, "Honey can stay good for a very long time.", True, "Honey does not go bad. Bees made it to keep for winter.",
  "عسل می‌تونه خیلی خیلی طولانی سالم بمونه.", "عسل خراب نمی‌شه. زنبورها اون رو واسه زمستون نگه می‌دارن.", W["honey"])

# ------------------------------------------------------------------ numbers and shapes
C("m01", "math", 3, "How many sides does a triangle have?", ["3", "4", "5"], 0, "Tri means three: a triangle has 3 sides.",
  "مثلث چند تا ضلع داره؟ three، four یا five؟", "مثلث سه تا ضلع داره.", SHAPE["triangle"])
C("m02", "math", 3, "What comes after 4?", ["3", "5", "6"], 1, "1, 2, 3, 4, 5!",
  "بعد از four چی میاد؟ three، five یا six؟", "one, two, three, four, five!")
C("m03", "math", 3, "Which shape is round?", ["Circle", "Square", "Triangle"], 0, "A circle is round, like a ball or a plate.",
  "کدوم شکل گِرده؟ Circle، Square یا Triangle؟", "دایره گِرده، مثلِ توپ یا بشقاب.", SHAPE["circle"])
C("m04", "math", 3, "2 + 1 = ?", ["2", "3", "4"], 1, "Two and one more make three.",
  "two plus one می‌شه چند؟ two، three یا four؟", "دو تا و یکی دیگه می‌شه سه تا.")
T("m05", "math", 3, "A square has four sides.", True, "A square has four sides, all the same length.",
  "مربع چهار تا ضلع داره.", "مربع چهار تا ضلع داره، همه هم‌اندازه.", SHAPE["square"])
C("m06", "math", 3, "Which number is bigger?", ["7", "3"], 0, "7 is bigger than 3.",
  "کدوم عدد بزرگ‌تره؟ seven یا three؟", "seven از three بزرگ‌تره.")
C("m07", "math", 6, "5 + 5 = ?", ["10", "11", "55"], 0, "Five and five make ten - like your two hands!",
  "five plus five می‌شه چند؟ ten، eleven یا fifty-five؟", "پنج و پنج می‌شه ده؛ مثلِ دو تا دستت!")
C("m08", "math", 6, "How many days are in a week?", ["5", "7", "10"], 1, "Seven days: Monday to Sunday.",
  "یه هفته چند روزه؟ five، seven یا ten؟", "هفت روز.")
C("m09", "math", 6, "10 - 3 = ?", ["6", "7", "13"], 1, "Take 3 away from 10 and 7 are left.",
  "ten minus three می‌شه چند؟ six، seven یا thirteen؟", "اگه از ده تا سه تا برداری، هفت تا می‌مونه.")
T("m10", "math", 6, "A hexagon has six sides.", True, "Hexa means six. Bees build hexagons in their hives!",
  "شش‌ضلعی شش تا ضلع داره.", "زنبورها توی کندوشون شش‌ضلعی می‌سازن!", SHAPE["hexagon"])
C("m11", "math", 6, "Which is an even number?", ["4", "5", "7"], 0, "Even numbers can be shared into two equal groups: 2, 4, 6, 8...",
  "کدوم عددِ زوجه؟ four، five یا seven؟", "عددهای زوج رو می‌شه به دو گروهِ مساوی تقسیم کرد: دو، چهار، شش، هشت.")
C("m12", "math", 6, "How many minutes are in an hour?", ["30", "60", "100"], 1, "An hour has 60 minutes.",
  "یه ساعت چند دقیقه‌ست؟ thirty، sixty یا one hundred؟", "یه ساعت شصت دقیقه‌ست.")
C("m13", "math", 6, "3 x 2 = ?", ["5", "6", "32"], 1, "Three twice: 3 + 3 = 6.",
  "three times two می‌شه چند؟ five، six یا thirty-two؟", "سه، دو بار: سه و سه می‌شه شش.")
T("m14", "math", 6, "A ball is a sphere.", True, "A sphere is perfectly round in every direction.",
  "توپ یه کُره‌ست.", "کُره از هر طرف کاملاً گِرده.", SHAPE["sphere"])

# ------------------------------------------------------------------ English words
C("w01", "words", 3, "What is this?", ["Cat", "Dog", "Pig"], 0, "Cat - C, A, T.",
  "این چیه؟ Cat، Dog یا Pig؟", "Cat. C, A, T.", W["cat"])
C("w02", "words", 3, "What is this?", ["Bus", "Car", "Ship"], 2, "Ship - S, H, I, P.",
  "این چیه؟ Bus، Car یا Ship؟", "Ship. S, H, I, P.", W["ship"])
C("w03", "words", 3, "What is this?", ["Hat", "Bed", "Key"], 2, "Key - K, E, Y.",
  "این چیه؟ Hat، Bed یا Key؟", "Key. K, E, Y.", W["key"])
C("w04", "words", 3, "Which word starts with B?", ["Ball", "Sun", "Map"], 0, "Ball starts with the sound b.",
  "کدوم کلمه با B شروع می‌شه؟ Ball، Sun یا Map؟", "Ball با صدای ب شروع می‌شه.")
C("w05", "words", 6, "What is the opposite of hot?", ["Cold", "Big", "Fast"], 0, "Hot and cold are opposites.",
  "برعکسِ hot چیه؟ Cold، Big یا Fast؟", "Hot و cold برعکسِ هم هستن.")
C("w06", "words", 6, "What is the opposite of up?", ["Down", "In", "On"], 0, "Up and down are opposites.",
  "برعکسِ up چیه؟ Down، In یا On؟", "Up و down برعکسِ هم هستن.")
C("w07", "words", 6, "Which word rhymes with cat?", ["Hat", "Dog", "Sun"], 0, "Cat and hat both end with -at.",
  "کدوم کلمه با cat هم‌قافیه‌ست؟ Hat، Dog یا Sun؟", "Cat و hat هر دو با at تموم می‌شن.", W["hat"])
C("w08", "words", 6, "How many letters are in DOG?", ["2", "3", "4"], 1, "D, O, G: three letters.",
  "کلمه‌ی DOG چند تا حرف داره؟ two، three یا four؟", "D, O, G. سه تا حرف.", W["dog"])

# ------------------------------------------------------------------ everyday life and safety
C("l01", "life", 3, "What colour means stop?", ["Red", "Green", "Blue"], 0, "Red means stop, green means go.",
  "کدوم رنگ یعنی وایسا؟ Red، Green یا Blue؟", "قرمز یعنی وایسا، سبز یعنی برو.")
T("l02", "life", 3, "We look both ways before crossing the road.", True, "Look left, look right, and hold a grown-up's hand.",
  "قبل از رد شدن از خیابون دو طرف رو نگاه می‌کنیم.", "چپ رو نگاه کن، راست رو نگاه کن، و دستِ یه بزرگ‌تر رو بگیر.", W["car"])
C("l03", "life", 3, "Who helps when we are sick?", ["Doctor", "Pilot", "Chef"], 0, "Doctors and nurses help us get better.",
  "وقتی مریضیم کی کمکمون می‌کنه؟ Doctor، Pilot یا Chef؟", "دکترها و پرستارها کمک می‌کنن خوب بشیم.")
T("l04", "life", 3, "Sharing toys is kind.", True, "Sharing makes playing more fun for everyone.",
  "شریک شدنِ اسباب‌بازی کارِ مهربونیه.", "شریک شدن بازی رو واسه همه شادتر می‌کنه.")
C("l05", "life", 6, "Who flies a plane?", ["Pilot", "Farmer", "Dentist"], 0, "A pilot flies the plane.",
  "کی هواپیما رو می‌رونه؟ Pilot، Farmer یا Dentist؟", "خلبان هواپیما رو هدایت می‌کنه.", W["jet"])
T("l06", "life", 6, "Paper can be recycled.", True, "Old paper can be made into new paper. That saves trees!",
  "کاغذ رو می‌شه بازیافت کرد.", "از کاغذِ کهنه می‌شه کاغذِ نو درست کرد. اینطوری درخت‌ها نجات پیدا می‌کنن!")
C("l07", "life", 6, "What do we use to tell the time?", ["Clock", "Fork", "Brush"], 0, "A clock or a watch tells us the time.",
  "با چی ساعت رو می‌فهمیم؟ Clock، Fork یا Brush؟", "ساعتِ دیواری یا ساعتِ مچی بهمون می‌گه ساعت چنده.")
T("l08", "life", 6, "Nowruz is the Persian New Year, on the first day of spring.", True, "Nowruz means new day. Families set the Haft-sin table.",
  "نوروز سالِ نوِ ایرانیه، اولین روزِ بهار.", "نوروز یعنی روزِ نو. خونواده‌ها سفره‌ی هفت‌سین می‌چینن.")

# ------------------------------------------------------------------ simple science
C("x01", "science", 3, "What does a magnet pick up?", ["Nails", "Paper", "Leaves"], 0, "Magnets pull things made of iron, like nails.",
  "آهن‌ربا چی رو برمی‌داره؟ Nails، Paper یا Leaves؟", "آهن‌ربا چیزهای آهنی، مثلِ میخ رو می‌کشه.")
T("x02", "science", 3, "Ice melts when it gets warm.", True, "Warm ice turns back into water.",
  "یخ وقتی گرم بشه آب می‌شه.", "یخِ گرم‌شده دوباره آب می‌شه.")
C("x03", "science", 3, "What floats on water?", ["Boat", "Rock", "Key"], 0, "Boats float. Rocks and keys sink.",
  "کدوم روی آب می‌مونه؟ Boat، Rock یا Key؟", "قایق روی آب می‌مونه. سنگ و کلید فرو می‌رن.", W["ship"])
T("x04", "science", 3, "We need light to see.", True, "Without light, everything looks dark.",
  "واسه دیدن به نور احتیاج داریم.", "بدونِ نور همه‌چیز تاریک به نظر میاد.")
C("x05", "science", 6, "What happens to water when it boils?", ["It steams", "It freezes"], 0, "Boiling water turns into steam.",
  "وقتی آب بجوشه چی می‌شه؟ It steams یا It freezes؟", "آبِ جوش به بخار تبدیل می‌شه.")
T("x06", "science", 6, "Sound can travel through water.", True, "Whales and dolphins talk to each other with sounds under water.",
  "صدا می‌تونه توی آب حرکت کنه.", "نهنگ‌ها و دلفین‌ها زیرِ آب با صدا با هم حرف می‌زنن.")
C("x07", "science", 6, "What makes a shadow?", ["Blocking sun", "Rain", "Wind"], 0, "When something blocks the light, it makes a shadow behind it.",
  "سایه چطوری درست می‌شه؟ Blocking sun، Rain یا Wind؟", "وقتی یه چیزی جلوی نور رو بگیره، پشتش سایه درست می‌شه.", SKY["sun"])
T("x08", "science", 6, "Heavy things always fall faster.", False, "Without air in the way, a feather and a hammer fall together. Astronauts tried it on the Moon!",
  "چیزهای سنگین همیشه تندتر می‌افتن.", "اگه هوا نباشه، پَر و چکش با هم می‌افتن. فضانوردها روی ماه امتحانش کردن!")
