document.addEventListener('DOMContentLoaded', function() {
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
                listItem.appendChild(link);
                otherPapersList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
