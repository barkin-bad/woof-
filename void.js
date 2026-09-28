const articleData = {
    ru: {
        title: 'Искрит серебром',
        paragraphs: [
            'Серебро известно человечеству уже более шести тысяч лет. По мнению многих учёных, этот благородный металл мог возникнуть в результате взрывов звёзд определённого типа. В Древнем Египте его считали священным: верили, что он является частицей ушедших богов, поэтому серебро ценилось выше золота.',
            'В античную эпоху из серебра изготавливали деньги, украшения и орудия труда. Первые серебряные монеты появились около 600 года до нашей эры в Лидии — на территории современной Турции. В Средние века в Европе началась массовая добыча этого драгоценного металла. Согласно статистическим данным, именно тогда серебро стало основным компонентом монетной системы.',
            'В наши дни серебро широко применяется не только в ювелирном деле, но и в медицине, электронике, автомобильной и авиационной промышленности, а также считается ценным инвестиционным активом.',
            'Ежегодно больше половины добываемого серебра используется в промышленности, из-за чего спрос на него постоянно растёт. Именно поэтому серебро считается важным инвестиционным ресурсом. Оно почти в 85 раз дешевле золота, что во многом объясняет его широкую популярность. Ещё со времён Римской империи серебряные монеты чеканили для внутреннего обращения, а золотые — для международной торговли.',
            'Серебро занимает заметное место в мифологии разных стран. В Древней Греции этот металл олицетворял богиню Луны Артемиду. В европейском фольклоре победить вампиров и оборотней можно было только с помощью серебряного клинка. В восточной мифологии серебро считается одним из главных символов энергии Инь, женского начала всего сущего.',
            'В природе серебро встречается в различных формах: в виде самородков, минералов, а также в составе разных руд. Самородное серебро находят крайне редко, но при этом его самородки бывают гораздо крупнее золотых: самый большой в мире был обнаружен в XIX веке в Колумбии и весил 120 тонн. В самородном серебре могут содержаться примеси золота, ртути, меди и многих других металлов.'
        ],
        ghosts: [
            'мы были здесь',
            'как давно вы смотрели на звёзды?',
            'помогите',
            'тут холодно'
        ]
    },
    eng: {
        title: 'Gleams with silver',
        paragraphs: [
            'Silver has been known to humanity for over six thousand years. According to many scientists, this noble metal may have been born from the explosions of certain types of stars. In Ancient Egypt it was considered sacred: people believed it was a particle of the departed gods, which is why silver was valued above gold.',
            'In antiquity, silver was used to make money, jewellery and tools. The first silver coins appeared around 600 BCE in Lydia, on the territory of modern-day Turkey. In the Middle Ages, mass mining of this precious metal began in Europe. According to statistics, it was then that silver became the main component of the coinage system.',
            'Today silver is widely used not only in jewellery, but also in medicine, electronics, the automotive and aviation industries, and is also considered a valuable investment asset.',
            'Every year more than half of all mined silver is used in industry, which is why demand for it keeps growing. That is why silver is considered an important investment resource. It is almost 85 times cheaper than gold, which largely explains its wide popularity. Since the times of the Roman Empire, silver coins were minted for domestic circulation, and gold ones for international trade.',
            'Silver holds a notable place in the mythology of many countries. In Ancient Greece this metal personified the Moon goddess Artemis. In European folklore, vampires and werewolves could only be defeated with a silver blade. In Eastern mythology, silver is considered one of the main symbols of Yin energy, the feminine principle of all things.',
            'In nature, silver is found in various forms: as nuggets, minerals, and as part of different ores. Native silver is extremely rare, yet its nuggets can be far larger than gold ones: the largest in the world was discovered in the 19th century in Colombia and weighed 120 tonnes. Native silver may contain impurities of gold, mercury, copper and many other metals.'
        ],
        ghosts: [
            'we were here',
            'how long since you looked at the stars?',
            'help',
            'it is cold here'
        ]
    }
};

const voidCursor = document.getElementById('voidCursor');
const voidTitle = document.getElementById('voidTitle');
const soundBtn = document.getElementById('soundBtn');

let currentLang = 'ru';
let typingToken = 0;

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function randomChar(lang) {
    const sets = {
        ru: 'абвгдежзийклмнопрстуфхцчшщъыьэюя',
        eng: 'abcdefghijklmnopqrstuvwxyz'
    };
    const s = sets[lang] || sets.ru;
    return s[Math.floor(Math.random() * s.length)];
}

function getParagraphs() {
    return document.querySelectorAll('.void-p');
}

function setupParagraphs() {
    const data = articleData[currentLang];
    getParagraphs().forEach(p => {
        const idx = parseInt(p.dataset.index, 10);
        const text = data.paragraphs[idx] || '';
        p.dataset.text = text;
        p.dataset.typed = 'false';
        p.textContent = '';
        p.style.minHeight = '0';
        p.classList.remove('typing', 'possessed');

        p.textContent = text;
        void p.offsetHeight;
        const h = p.offsetHeight;
        p.style.minHeight = h + 'px';
        p.textContent = '';
    });
}

async function typeParagraph(p, text, ghosts, token) {
    p.classList.add('typing');
    let i = 0;

    while (i < text.length) {
        if (token !== typingToken) { p.classList.remove('typing'); return; }

        if (i > 30 && i < text.length - 20 && Math.random() < 0.005) {
            const ghost = ghosts[Math.floor(Math.random() * ghosts.length)];
            p.classList.add('possessed');
            await sleep(500);
            if (token !== typingToken) { p.classList.remove('typing', 'possessed'); return; }

            for (const ch of ghost) {
                if (token !== typingToken) { p.classList.remove('typing', 'possessed'); return; }
                p.textContent += ch;
                await sleep(55 + Math.random() * 35);
            }
            await sleep(1200);
            if (token !== typingToken) { p.classList.remove('typing', 'possessed'); return; }

            for (let k = 0; k < ghost.length; k++) {
                if (token !== typingToken) { p.classList.remove('typing', 'possessed'); return; }
                p.textContent = p.textContent.slice(0, -1);
                await sleep(22);
            }
            await sleep(450);
            p.classList.remove('possessed');
        }

        if (i > 5 && Math.random() < 0.01) {
            const wrong = randomChar(currentLang);
            p.textContent += wrong;
            await sleep(350);
            if (token !== typingToken) { p.classList.remove('typing'); return; }
            p.textContent = p.textContent.slice(0, -1);
            await sleep(200);
            if (token !== typingToken) { p.classList.remove('typing'); return; }
        }

        p.textContent += text[i];
        i++;
        await sleep(12 + Math.random() * 16);
    }

    p.classList.remove('typing');
}

function checkVisibleParagraphs() {
    const data = articleData[currentLang];
    const ghosts = data.ghosts;
    const h = window.innerHeight;

    getParagraphs().forEach(p => {
        if (p.dataset.typed === 'true') return;
        const r = p.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > -60) {
            p.dataset.typed = 'true';
            typeParagraph(p, p.dataset.text, ghosts, typingToken);
        }
    });
}

function resetAndRestart() {
    typingToken++;
    const data = articleData[currentLang];
    voidTitle.textContent = data.title;

    getParagraphs().forEach(p => {
        p.classList.remove('typing', 'possessed');
        p.textContent = '';
        p.dataset.typed = 'false';
    });

    setupParagraphs();
    checkVisibleParagraphs();
}

function setLang(lang) {
    if (!articleData[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';

    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
    });

    resetAndRestart();

    try { localStorage.setItem('voidLang', lang); } catch (e) {}
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

let initialLang = 'ru';
try { initialLang = localStorage.getItem('voidLang') || 'ru'; } catch (e) { initialLang = 'ru'; }
currentLang = initialLang;
document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === initialLang);
});

window.addEventListener('load', () => {
    document.documentElement.lang = currentLang === 'ru' ? 'ru' : 'en';
    voidTitle.textContent = articleData[currentLang].title;
    setupParagraphs();
    checkVisibleParagraphs();
});

window.addEventListener('scroll', checkVisibleParagraphs, { passive: true });
window.addEventListener('resize', checkVisibleParagraphs);

let sleepTimer = null;

function resetSleep() {
    voidCursor.classList.remove('sleeping');
    clearTimeout(sleepTimer);
    sleepTimer = setTimeout(() => {
        voidCursor.classList.add('sleeping');
    }, 5000);
}

let cursorVisible = false;

window.addEventListener('mousemove', (e) => {
    voidCursor.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    if (!cursorVisible) {
        cursorVisible = true;
        voidCursor.classList.add('visible');
    }
    resetSleep();
});

document.addEventListener('mouseleave', () => {
    cursorVisible = false;
    voidCursor.classList.remove('visible');
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button')) voidCursor.classList.add('hover');
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button')) voidCursor.classList.remove('hover');
});

let audioCtx = null;
let masterGain = null;
let soundOn = true;

function buildDrone() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = soundOn ? 1 : 0;
    masterGain.connect(audioCtx.destination);

    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55;
    const g1 = audioCtx.createGain();
    g1.gain.value = 0.06;
    osc1.connect(g1).connect(masterGain);
    osc1.start();

    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 82.4;
    const g2 = audioCtx.createGain();
    g2.gain.value = 0.025;
    osc2.connect(g2).connect(masterGain);
    osc2.start();

    const osc3 = audioCtx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 38;
    const g3 = audioCtx.createGain();
    g3.gain.value = 0.035;
    osc3.connect(g3).connect(masterGain);
    osc3.start();

    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;

    const ng = audioCtx.createGain();
    ng.gain.value = 0.04;

    noise.connect(filter).connect(ng).connect(masterGain);
    noise.start();
}

function tryStartAudio() {
    if (!audioCtx) {
        try { buildDrone(); } catch (e) { return; }
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
}

['click', 'mousemove', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, tryStartAudio);
});

soundBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    soundOn = !soundOn;
    if (!audioCtx) tryStartAudio();
    if (masterGain && audioCtx) {
        masterGain.gain.setTargetAtTime(soundOn ? 1 : 0, audioCtx.currentTime, 0.15);
    }
    soundBtn.classList.toggle('muted', !soundOn);
});
