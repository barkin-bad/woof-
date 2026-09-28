const translations = {
            ru: {
                nav_about: 'Обо мне',
                nav_skills: 'Умею',
                nav_dream: 'Моя маленькая мечта',
                nav_contacts: 'Контакты',
                about_title: 'Тут живёт Барк.',
                about_quote: '"Всё потихоньку!"',
                about_text: 'Я увлекаюсь программированием. Перевожу всякое с английского и японского. И иногда всякое пишу и делаю. Да, это расплывчато, но это самое точное описание того, что я делаю.',
                skills_title: 'Умею',
                skills_p1: 'В то время, пока не играю - перевожу. В основном, комиксы, мангу и ранобэ. Самостоятельно убираю надписи со страниц и накладываю их.',
                skills_p2: 'Пока только учусь программированию, но вроде пока всё неплохо. Вы же читаете это сейчас.',
                skills_p3: 'Увлекаюсь созданию украшений из УФ-смолы и бижутерией.',
                skills_p4: 'Сейчас пробую себя в рисовании и пытаюсь сделать свою модель.',
                dream_title: 'Моя маленькая мечта',
                dream_quote: '"Я обязательно смогу. Наверное."',
                dream_p1: 'Буду честна с тем, что я далеко не дизайнер, только учусь кодингу и ищу то, что меня интересует, но тем не менее, Я бы хотела однажды помочь кому-то в создании ARG или сайта для VHS-хоррора, чтобы кто-то что-то искал или разгадывал. Мне нравится создавать эстетику чего-то загадочного, но без лишней жести.',
                dream_p2: 'И пусть моя первая попытка будет... <a href="void.html" class="glitch-link">Здесь</a>.',
                contacts_title: 'Контакты',
                contacts_p1: 'Если Вас заинтересовало что-то из этого, то жду Вас.',
                contacts_p2: 'Связаться со мной можно по почте: <strong>tomura.maddog@gmail.com</strong> или <strong>barkin.bad@mail.ru</strong>',
                contacts_p3: 'Или в социальных сетях: <a href="https://vk.ru/wildbark" target="_blank" rel="noopener" class="social-link">ВК</a>, <a href="https://www.tumblr.com/barkbarkin?source=share" target="_blank" rel="noopener" class="social-link">Тамблер</a>, <a href="https://t.me/barkthedog" target="_blank" rel="noopener" class="social-link">Телеграм</a>'
            },
            eng: {
                nav_about: 'About me',
                nav_skills: 'Skills',
                nav_dream: 'My little dream',
                nav_contacts: 'Contacts',
                about_title: 'Bark lives here.',
                about_quote: '"Little by little!"',
                about_text: 'I am into programming. I translate things from English and Japanese. And sometimes I write and make things. Yes, that is vague, but it is the most accurate description of what I do.',
                skills_title: 'Skills',
                skills_p1: 'While I am not playing games, I translate. Mostly comics, manga and light novels. I clean the text off the pages and typeset it myself.',
                skills_p2: 'I am still only learning to program, but so far it seems to be going well. You are reading this right now, after all.',
                skills_p3: 'I also make jewellery out of UV resin and costume jewellery.',
                skills_p4: 'Right now I am trying my hand at drawing and attempting to make my own model.',
                dream_title: 'My little dream',
                dream_quote: '"I will definitely manage. Probably."',
                dream_p1: 'I will be honest: I am far from a designer, I am only learning to code and looking for what interests me, but even so, I would like to one day help someone create an ARG or a website for VHS horror, so that someone could search for something or solve a puzzle. I like creating the aesthetic of something mysterious, but without going overboard.',
                dream_p2: 'And let my first attempt be... <a href="void.html" class="glitch-link">Here</a>.',
                contacts_title: 'Contacts',
                contacts_p1: 'If any of this caught your interest, I am waiting for you.',
                contacts_p2: 'You can reach me by email: <strong>tomura.maddog@gmail.com</strong> or <strong>barkin.bad@mail.ru</strong>',
                contacts_p3: 'Or on social media: <a href="https://vk.ru/wildbark" target="_blank" rel="noopener" class="social-link">VK</a>, <a href="https://www.tumblr.com/barkbarkin?source=share" target="_blank" rel="noopener" class="social-link">Tumblr</a>, <a href="https://t.me/barkthedog" target="_blank" rel="noopener" class="social-link">Telegram</a>'
            }
        };

        function setLang(lang) {
            const dict = translations[lang];
            if (!dict) return;

            document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key] !== undefined) el.innerHTML = dict[key];
            });

            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            try {
                localStorage.setItem('lang', lang);
            } catch (e) {}
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => setLang(btn.dataset.lang));
        });

        let initialLang = 'ru';
        try {
            initialLang = localStorage.getItem('lang') || 'ru';
        } catch (e) {
            initialLang = 'ru';
        }
        setLang(initialLang);

        const intro = document.getElementById('intro');

        intro.addEventListener('click', () => {
            if (intro.classList.contains('open')) return;
            intro.classList.add('open');
            document.body.classList.add('revealed');
            setTimeout(() => {
                intro.style.display = 'none';
            }, 1300);
        });

        const cursor = document.getElementById('cursor');
        const HOVER_TARGETS = 'a, button, .intro';
        let cursorVisible = false;

        window.addEventListener('mousemove', (e) => {
            cursor.style.transform =
                `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            if (!cursorVisible) {
                cursorVisible = true;
                cursor.classList.add('visible');
            }
        });

        document.addEventListener('mouseleave', () => {
            cursorVisible = false;
            cursor.classList.remove('visible');
        });

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(HOVER_TARGETS)) cursor.classList.add('hover');
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(HOVER_TARGETS)) cursor.classList.remove('hover');
        });

        function showSection(sectionId, clickedLink) {
            const sections = document.querySelectorAll('.section-content');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                void activeSection.offsetWidth;
                activeSection.classList.add('active');
            }

            const navLinks = document.querySelectorAll('.navigation a');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            clickedLink.classList.add('active');
        }
