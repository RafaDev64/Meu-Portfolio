// Menu Hamburguer
        // Menu Hamburguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.onclick = () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    };
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// Função para o efeito de digitação
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



// Modais para descrições de projetos
document.querySelectorAll('.btn-descricao').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

document.querySelectorAll('#modal1 .modal-close, #modal2 .modal-close, #modal3 .modal-close, #modal4 .modal-close').forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.modal').style.display = 'none';
    });
});

document.querySelectorAll('#modal1, #modal2, #modal3, #modal4').forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});



// Rolagem suave
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
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
