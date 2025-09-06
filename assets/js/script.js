// Menu Hamburguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');



hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link (melhora UX em dispositivos móveis)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Efeito de digitação na seção Sobre Mim
function typeText(element, text, speed = 40) {
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

const aboutSection = document.querySelector('#sobre');
const typingText = document.querySelector('.typing-text');
const textToType = typingText.getAttribute('data-text');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText(typingText, textToType, window.innerWidth <= 480 ? 30 : 40); // Mais rápido em telas pequenas
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

observer.observe(aboutSection);

// Modais para descrições de projetos
const modals = document.querySelectorAll('.modal');
const modalButtons = document.querySelectorAll('.btn-descricao');
const closeButtons = document.querySelectorAll('.modal-close');

modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Fechar modal ao clicar fora
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Fechar modal com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Rolagem suave para links internos
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Efeito de rolagem para o header (scrolled)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Destacar seção ativa ao rolar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const headerHeight = document.querySelector('header').offsetHeight;
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - headerHeight - 20) {
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
