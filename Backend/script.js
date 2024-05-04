document.addEventListener('DOMContentLoaded', function() {
    // Confirm before leaving the site for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (!confirm('You are about to leave this page and visit an external site. Continue?')) {
                event.preventDefault();
            }
        });
    });

    // Smooth scroll for internal links (enhances experience)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading sections with a fade-in effect
    const sections = document.querySelectorAll('section');
    const config = {
        rootMargin: '0px',
        threshold: 0.1
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0px)';
                self.unobserve(entry.target);
            }
        });
    }, config);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(100px)';
        observer.observe(section);
    });
});
