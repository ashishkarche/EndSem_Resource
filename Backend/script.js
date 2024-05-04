// Function to show alert message
function showAlert(message, confirmCallback) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.innerHTML = `
        <p>${message}</p>
        <div class="alert-btns">
            <button id="confirmBtn">Confirm</button>
            <button id="cancelBtn">Cancel</button>
        </div>
    `;
    document.body.appendChild(alertDiv);

    // Add event listeners to buttons
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    confirmBtn.addEventListener('click', () => {
        if (typeof confirmCallback === 'function') {
            confirmCallback();
        }
        document.body.removeChild(alertDiv);
    });

    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(alertDiv);
    });

    // Display alert
    alertDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to open external links with confirmation
    function openExternalLink(link) {
        showAlert('You are about to leave this page and visit an external site. Continue?', function() {
            window.open(link, '_blank');
        });
    }

    // Fetch data from Data.json
    fetch('./Backend/Data.json')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('booksList');
            const papersList = document.getElementById('papersList');
            const otherPapersList = document.getElementById('otherPapersList');

            // Populate Books section
            data.books.forEach(book => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = book.link;
                link.textContent = book.title;
                link.target = '_blank';
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    openExternalLink(book.link);
                });
                listItem.appendChild(link);
                booksList.appendChild(listItem);
            });

            // Populate Papers section
            data.papers.forEach(paper => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = paper.link;
                link.textContent = paper.title;
                link.target = '_blank';
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    openExternalLink(paper.link);
                });
                listItem.appendChild(link);
                papersList.appendChild(listItem);
            });

            // Populate Other Resources section
            data.otherPapers.forEach(paper => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = paper.link;
                link.textContent = paper.title;
                link.target = '_blank';
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    openExternalLink(paper.link);
                });
                listItem.appendChild(link);
                otherPapersList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
