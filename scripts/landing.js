document.addEventListener('DOMContentLoaded', function() {
    const animatedText = document.getElementById("animated-text");
    const words = ["Resource", "Question Paper", "Learning Materials", "Other resources"]; // Add your desired words here
    let index = 0;

    function changeWord() {
        animatedText.textContent = words[index];
        index = (index + 1) % words.length;
        updateFontColor();
    }

    setInterval(changeWord, 5000); // Change word every 5 seconds

    function updateFontColor() {
        const gradientColors = [
            "linear-gradient(to right, #ff8a00, #da1b60)", // Gradient color for "Resource"
            "linear-gradient(to right, #2bc0e4, #eaecc6)", // Gradient color for "Question Paper"
            "linear-gradient(to right, #7f00ff, #e100ff)", // Gradient color for "Learning Materials"
            "linear-gradient(to right, #0083b0, #00b4db)"  // Gradient color for "Tools"
        ];
        animatedText.style.background = gradientColors[index];
        animatedText.style.webkitBackgroundClip = "text"; // Clip the text to the gradient
        animatedText.style.webkitTextFillColor = "transparent"; // Make the text transparent
    }

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
