// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Typing animation for hero section
const typingText = document.getElementById('typing-text');
const cursor = document.getElementById('cursor');
const subtitle = document.getElementById('subtitle');
const textToType = "Adrian Jones";
let index = 0;

function type() {
    if (!typingText || !cursor || !subtitle) return; // Guard if elements are missing
    if (index < textToType.length) {
        typingText.textContent += textToType.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust speed (100ms per character)
    } else {
        cursor.style.display = 'none'; // Hide cursor when done
        subtitle.classList.remove('opacity-0'); // Fade in subtitle
        subtitle.classList.add('transition-opacity', 'duration-1000', 'opacity-100');
    }
}

// About slideshow (fade in/out, one at a time)
function initAboutSlideshow() {
    const slides = document.querySelectorAll('#about-slideshow .about-slide');
    if (!slides || slides.length === 0) return;

    let current = 0;

    // Ensure initial states
    slides.forEach((slide, i) => {
        slide.classList.toggle('opacity-100', i === 0);
        slide.classList.toggle('opacity-0', i !== 0);
    });

    const cycle = () => {
        const next = (current + 1) % slides.length;
        slides[current].classList.remove('opacity-100');
        slides[current].classList.add('opacity-0');
        slides[next].classList.remove('opacity-0');
        slides[next].classList.add('opacity-100');
        current = next;
    };

    // Change every 4 seconds
    setInterval(cycle, 4000);
}

// Scroll-based tilt/scale effect for About slideshow images
function initScrollTilt() {
    const container = document.getElementById('about-slideshow');
    if (!container) return;

    const getActiveImage = () => {
        const active = container.querySelector('.about-slide.opacity-100 img');
        if (active) return active;
        // Fallback: first image
        return container.querySelector('.about-slide img');
    };

    let ticking = false;

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const update = () => {
        ticking = false;
        const img = getActiveImage();
        if (!img) return;
        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const viewportCenter = viewportH / 2;
        const elementCenter = rect.top + rect.height / 2;
        // progress from -1 (far above center) to 1 (far below center)
        let progress = (elementCenter - viewportCenter) / (viewportH / 2);
        progress = clamp(progress, -1, 1);
        // Rotate around Z for a gentle tilt, scale in at center
        const maxRotate = 6; // degrees
        const rotate = progress * maxRotate;
        const minScale = 0.92;
        const maxScale = 1.05;
        const scale = minScale + (1 - Math.abs(progress)) * (maxScale - minScale);
        img.style.transform = `rotateZ(${rotate}deg) scale(${scale})`;
    };

    const requestTick = () => {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    };

    // Initialize and listen
    update();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
}

// Start animations on page load
window.onload = () => {
    setTimeout(type, 500); // Delay start for smoother effect
    initAboutSlideshow();
    initScrollTilt();
};
