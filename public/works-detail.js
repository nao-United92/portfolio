document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workId = urlParams.get('id');

    if (workId) {
        const work = worksData.find(w => w.id === workId);

        if (work) {
            document.getElementById('works-detail-title').textContent = work.title;
            document.getElementById('works-detail-date').textContent = work.date;
            document.getElementById('works-detail-author').textContent = work.author;
            document.getElementById('works-detail-image').src = work.image;
            document.getElementById('works-detail-content').innerHTML = work.content;

            const backButtonContainer = document.getElementById('works-detail-back-button-container');
            if (backButtonContainer) {
                backButtonContainer.innerHTML = `
                    <a href="works.html" class="inline-flex items-center justify-center w-10 h-10 mt-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors" aria-label="Back to Works">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </a>
                `;
            }
        } else {
            document.getElementById('works-detail-title').textContent = 'Work Not Found';
            document.getElementById('works-detail-content').innerHTML = '<p>The requested work could not be found.</p>';
        }
    } else {
        document.getElementById('works-detail-title').textContent = 'No Work ID Provided';
        document.getElementById('works-detail-content').innerHTML = '<p>Please provide a work ID in the URL.</p>';
    }
});
