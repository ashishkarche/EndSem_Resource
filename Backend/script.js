document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    const modal = document.getElementById('confirmationModal');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    let currentLink = null;

    externalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            modal.style.display = 'block';
            currentLink = this.href;
        });
    });

    yesBtn.onclick = function() {
        modal.style.display = 'none';
        window.open(currentLink, '_blank');
    };

    noBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
