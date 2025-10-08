// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing animation for hero section
const typingText = document.getElementById('typing-text');
const cursor = document.getElementById('cursor');
const subtitle = document.getElementById('subtitle');
const textToType = "Adrian Jones";
let index = 0;

function type() {
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

// Start typing animation on page load
window.onload = () => {
    setTimeout(type, 500); // Delay start for smoother effect
};
