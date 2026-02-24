document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scrolled State
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle 
    // Creating a full-screen luxury overlay menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    // Create the mobile menu dynamically to keep HTML clean
    const mobileMenu = document.createElement('div');
    mobileMenu.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100vh;
        background: rgba(10,10,15,0.98);
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transform: translateY(-100%);
        transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        backdrop-filter: blur(20px);
    `;

    mobileMenu.innerHTML = `
        <a href="#portfolio" style="color: #fff; font-family: 'Playfair Display', serif; font-size: 2rem; text-decoration: none;">Global Portfolio</a>
        <a href="#expertise" style="color: #fff; font-family: 'Playfair Display', serif; font-size: 2rem; text-decoration: none;">Expertise</a>
        <a href="#consultation" style="color: #d4af37; font-family: 'Montserrat', sans-serif; font-size: 1rem; text-decoration: none; letter-spacing: 2px; text-transform: uppercase;">Complimentary Advisory</a>
    `;

    document.body.appendChild(mobileMenu);

    function toggleMenu() {
        const isActive = mobileMenu.style.transform === 'translateY(0px)';
        mobileMenu.style.transform = isActive ? 'translateY(-100%)' : 'translateY(0px)';
        document.body.style.overflow = isActive ? '' : 'hidden'; // Prevent scrolling

        // Animate hamburger to X
        const bars = mobileBtn.querySelectorAll('span');
        if (isActive) {
            bars[0].style.transform = 'none';
            bars[0].style.marginBottom = '6px';
            bars[1].style.transform = 'none';
        } else {
            bars[0].style.transform = 'translateY(4px) rotate(45deg)';
            bars[0].style.marginBottom = '0';
            bars[1].style.transform = 'translateY(-3px) rotate(-45deg)';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Cinematic Scroll Interactions (Reveal Animations)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.reveal');

    setTimeout(() => {
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }, 100);

    // 4. Form Submission Mock (Editorial Style)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'INITIATING REQUEST...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = 'ENGAGEMENT CONFIRMED';
                btn.style.backgroundColor = '#d4af37'; // Gold success color
                btn.style.color = '#000';
                btn.style.opacity = '1';

                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1200);
        });
    }
});
