 // JavaScript for scrolling animation
 document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in-up');

    function fadeInOnScroll() {
        fadeInElements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', fadeInOnScroll);
});