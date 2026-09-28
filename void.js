const voidCursor = document.getElementById('voidCursor');

let cursorVisible = false;
let sleepTimer = null;
const SLEEP_AFTER = 5000;

function wakeCursor() {
    voidCursor.classList.remove('sleeping');
    clearTimeout(sleepTimer);
    sleepTimer = setTimeout(() => {
        voidCursor.classList.add('sleeping');
    }, SLEEP_AFTER);
}

window.addEventListener('mousemove', (e) => {
    voidCursor.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    if (!cursorVisible) {
        cursorVisible = true;
        voidCursor.classList.add('visible');
    }
    wakeCursor();
});

document.addEventListener('mouseleave', () => {
    cursorVisible = false;
    voidCursor.classList.remove('visible');
    clearTimeout(sleepTimer);
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button')) voidCursor.classList.add('hover');
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button')) voidCursor.classList.remove('hover');
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const INTRUSIONS = [
    'мы были здесь',
    'как давно вы смотрели на звёзды?',
    'помогите',
    'тут холодно',
    'не читай дальше',
    'он всё ещё здесь',
    'выход там же, где вход'
];

const TYPO_CHARS = 'абвгдежзиклмнопрстуфхцчшщыьэюя';

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function typeParagraph(p) {
    const text = p.dataset.text || '';

    p.innerHTML = '<span class="main-text"></span>';
    const mainText = p.querySelector('.main-text');
    p.classList.add('typing');

    let intruded = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (!intruded && ch !== ' ' && Math.random() < 0.0022) {
            intruded = true;

            const phrase = pick(INTRUSIONS);
            const span = document.createElement('span');
            span.className = 'intrusion';
            p.appendChild(span);

            for (const c of phrase) {
                span.textContent += c;
                await sleep(70 + Math.random() * 90);
            }

            await sleep(1200 + Math.random() * 600);

            for (let k = phrase.length; k > 0; k--) {
                span.textContent = span.textContent.slice(0, -1);
                await sleep(22 + Math.random() * 30);
            }

            span.remove();
            await sleep(300 + Math.random() * 350);
        }

        if (ch !== ' ' && Math.random() < 0.006) {
            const wrong = pick(TYPO_CHARS);
            mainText.textContent += wrong;
            await sleep(90 + Math.random() * 90);
            await sleep(180 + Math.random() * 220);
            mainText.textContent = mainText.textContent.slice(0, -1);
            await sleep(70 + Math.random() * 60);
        }

        mainText.textContent += ch;
        await sleep(14 + Math.random() * 22);
    }

    p.classList.remove('typing');
    p.classList.add('done');
}

const paragraphs = document.querySelectorAll('.void-article p');

paragraphs.forEach((p) => {
    p.style.minHeight = p.offsetHeight + 'px';
    p.dataset.text = p.textContent;
    p.textContent = '';
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                observer.unobserve(entry.target);
                typeParagraph(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

paragraphs.forEach((p) => observer.observe(p));

let audioCtx = null;
let masterGain = null;
let soundOn = false;

function setupAudio() {
    if (audioCtx) return;

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);

    const drone1 = audioCtx.createOscillator();
    drone1.type = 'sine';
    drone1.frequency.value = 55;
    const g1 = audioCtx.createGain();
    g1.gain.value = 0.05;
    drone1.connect(g1);
    g1.connect(masterGain);
    drone1.start();

    const drone2 = audioCtx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 55.7;
    const g2 = audioCtx.createGain();
    g2.gain.value = 0.045;
    drone2.connect(g2);
    g2.connect(masterGain);
    drone2.start();

    const drone3 = audioCtx.createOscillator();
    drone3.type = 'triangle';
    drone3.frequency.value = 110;
    const g3 = audioCtx.createGain();
    g3.gain.value = 0.012;
    drone3.connect(g3);
    g3.connect(masterGain);
    drone3.start();

    const bufSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const hp = audioCtx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3500;

    const nGain = audioCtx.createGain();
    nGain.gain.value = 0.012;

    noise.connect(hp);
    hp.connect(nGain);
    nGain.connect(masterGain);
    noise.start();
}

const soundBtn = document.getElementById('soundBtn');

soundBtn.addEventListener('click', () => {
    setupAudio();

    if (audioCtx.state === 'suspended') audioCtx.resume();

    soundOn = !soundOn;
    const target = soundOn ? 0.5 : 0;

    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(target, audioCtx.currentTime + 1.0);

    soundBtn.classList.toggle('on', soundOn);
});
