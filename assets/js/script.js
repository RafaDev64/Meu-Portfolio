        // Função para o efeito de digitação
        function typeText(element, text, speed = 50) {
            let index = 0;
            element.textContent = '';
            element.classList.add('typing-text');

            function type() {
                if (index < text.length) {
                    element.textContent = text.slice(0, index + 1);
                    index++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing-text');
                    element.style.borderRight = 'none';
                }
            }

            type();
        }

        // Efeito de digitação na seção Sobre Mim
        const aboutSection = document.querySelector('#sobre');
        const typingText = document.querySelector('.typing-text');
        const textToType = typingText.getAttribute('data-text');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(typingText, textToType);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutSection);

        // Carrossel de certificados
        const carrossel = document.querySelector('.carrossel');
        const cards = document.querySelectorAll('.certificado-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicatorsContainer = document.querySelector('.carrossel-indicators');
        let currentIndex = 0;

        // Criar indicadores
        cards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        function updateCarrossel() {
            carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.indicator').forEach((ind, i) => {
                ind.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = (index + cards.length) % cards.length;
            updateCarrossel();
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarrossel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarrossel();
        });

        // Modal para certificados
        const modal = document.querySelector('.modal');
        const modalImg = modal.querySelector('img');
        const modalClose = document.querySelector('.modal-close');
        const modalBtns = document.querySelectorAll('.modal-btn');

        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalImg.src = btn.getAttribute('data-img');
                modal.style.display = 'flex';
            });
        });

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
                

        // Troca automática dos certificados a cada 4 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarrossel();
        }, 6000);

        // Rolagem suave
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Destacar seção ativa ao rolar
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 120) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });