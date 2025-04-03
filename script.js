// Dados da empresa
const companyData = {
    projectsDelivered: '+150',
    satisfiedClients: 98,
    deliveryTime: 72,
    testimonials: [
        {
            name: "João Silva",
            company: "Tech Solutions",
            text: "O FastClick superou todas as expectativas. Site entregue em tempo recorde e com qualidade excepcional!",
            rating: 5
        },
        {
            name: "Maria Santos",
            company: "Digital Marketing",
            text: "Profissionais muito competentes. O site ficou exatamente como eu queria, moderno e funcional.",
            rating: 5
        },
        {
            name: "Pedro Oliveira",
            company: "Startup XYZ",
            text: "Melhor investimento que fiz para minha empresa. Site profissional entregue em tempo recorde.",
            rating: 5
        }
    ]
};

// Função para animar contadores
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Função para criar estrelas de avaliação
function createStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Função para atualizar as estatísticas
function updateStats() {
    const stats = document.querySelectorAll('.stat h3');
    const targets = [
        companyData.deliveryTime,
        companyData.projectsDelivered,
        companyData.satisfiedClients
    ];
    
    stats.forEach((stat, index) => {
        animateCounter(stat, targets[index], 2000);
    });
}

// Função para criar depoimentos
function createTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;
    
    testimonialsContainer.innerHTML = ''; // Limpa o container antes de adicionar os depoimentos
    
    companyData.testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-rating">${createStars(testimonial.rating)}</div>
                <div class="testimonial-author">
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.company}</span>
                </div>
            </div>
        `;
        testimonialsContainer.appendChild(testimonialCard);
    });
}

// Função para manipular o formulário de contato
function handleContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Aqui você pode adicionar a lógica para enviar os dados para um servidor
        console.log('Dados do formulário:', data);
        
        // Feedback visual
        const submitButton = form.querySelector('.submit-button');
        submitButton.textContent = 'Mensagem Enviada!';
        submitButton.style.backgroundColor = '#28a745';
        
        // Reset do formulário após 2 segundos
        setTimeout(() => {
            form.reset();
            submitButton.textContent = 'Enviar Mensagem';
            submitButton.style.backgroundColor = '';
        }, 2000);
    });
}

// Função para atualizar o header ao rolar
function handleScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Função para animar elementos ao rolar
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .stat, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Função para observar a seção de estatísticas e depoimentos
function observeAboutSection() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Inicia a animação dos contadores quando a seção estiver visível
                updateStats();
                // Cria os depoimentos
                createTestimonials();
                // Desconecta o observer após iniciar as animações
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.7 // A animação começará quando 30% da seção estiver visível
    });

    observer.observe(aboutSection);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Configurar formulário de contato
    handleContactForm();
    
    // Configurar scroll do header
    handleScroll();
    
    // Configurar animações ao rolar
    animateOnScroll();
    
    // Configurar observador da seção Sobre
    observeAboutSection();
}); 