function showPage(pageURL) {
    window.location.href = pageURL;
}
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("myModal");
    const confirmBtn = document.getElementById("confirmBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    // Function to open external links with modal confirmation
    function openExternalLink(link) {
        modal.style.display = "block";

        confirmBtn.onclick = function () {
            window.open(link, '_blank');
            modal.style.display = "none";
        }

        cancelBtn.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Fetch data from Data.json for each year and semester
    fetch('../Backend/Data.json')
        .then(response => response.json())
        .then(data => {
            // Loop through each year
            ['first-year', 'second-year', 'third-year', 'fourth-year'].forEach(year => {
                // Loop through each semester in the year
                ['sem1', 'sem2'].forEach(semester => {
                    const booksList = document.getElementById(`${year}-${semester}-booksList`);
                    const papersList = document.getElementById(`${year}-${semester}-papersList`);
                    const otherPapersList = document.getElementById(`${year}-${semester}-otherPapersList`);

                    if (!booksList || !papersList || !otherPapersList) {
                        return; // Exit the loop if any list is null
                    }

                    // Populate Books section
                    data[year][semester].books.forEach(book => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = book.link;
                        link.textContent = book.title;
                        link.target = '_blank';
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            openExternalLink(book.link);
                        });
                        listItem.appendChild(link);
                        booksList.appendChild(listItem);
                    });

                    // Populate Papers section
                    data[year][semester].papers.forEach(paper => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = paper.link;
                        link.textContent = paper.title;
                        link.target = '_blank';
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            openExternalLink(paper.link);
                        });
                        listItem.appendChild(link);
                        papersList.appendChild(listItem);
                    });

                    // Populate Other Resources section
                    data[year][semester].otherPapers.forEach(paper => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = paper.link;
                        link.textContent = paper.title;
                        link.target = '_blank';
                        link.addEventListener('click', function (event) {
                            event.preventDefault();
                            openExternalLink(paper.link);
                        });
                        listItem.appendChild(link);
                        otherPapersList.appendChild(listItem);
                    });
                    // Add event listeners to sem1 and sem2 sections to toggle fadeIn class
                    const semSection = document.getElementById(`${year}-${semester}`);
                    semSection.addEventListener('click', function () {
                        semSection.classList.toggle('fadeIn');
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
