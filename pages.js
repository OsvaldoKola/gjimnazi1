document.addEventListener('DOMContentLoaded', () => {
    let postsPerPage = 9;
    const posts = Array.from(document.querySelectorAll('.post'));
    const totalPosts = posts.length;
    let totalPages = Math.ceil(totalPosts / postsPerPage);

    let currentPage = 1;
    let shouldScroll = false; // Flag to control scrolling

    // Function to update postsPerPage based on screen width
    function updatePostsPerPage() {
        if (window.matchMedia("(max-width: 1200px)").matches) {
            postsPerPage = 8;
        } else {
            postsPerPage = 9;
        }
        totalPages = Math.ceil(totalPosts / postsPerPage);
        goToPage(currentPage); // Keep the current page
    }

    // Sort posts in descending order based on class name
    posts.sort((a, b) => {
        const aNum = parseInt(a.className.match(/\d+/)[0]);
        const bNum = parseInt(b.className.match(/\d+/)[0]);
        return bNum - aNum;
    });

    function showPage(page) {
        posts.forEach((post, index) => {
            const pageIndex = Math.floor(index / postsPerPage) + 1;
            post.style.display = pageIndex === page ? 'block' : 'none';
        });
        document.getElementById('page-info').textContent = `Faqe ${page}`;
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        showPage(currentPage);
        if (shouldScroll) {
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    }

    // Event listeners for pagination
    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
            shouldScroll = true; // Enable scroll
            goToPage(currentPage - 1);
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentPage < totalPages) {
            shouldScroll = true; // Enable scroll
            goToPage(currentPage + 1);
        }
    });

    // Initialize the page display
    updatePostsPerPage();
    showPage(currentPage);

    // Debounced resize handler to avoid excessive function calls
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updatePostsPerPage();
        }, 200); // Adjust delay as needed
    });

    // Debugging: Log if unintended scroll happens
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        if (Math.abs(currentScrollTop - lastScrollTop) > 5) { // Detect significant scroll
            console.log('Unintended scroll detected!');
            lastScrollTop = currentScrollTop;
        }
    });

    // Ensure scrolling flag is reset on resize or other actions
    window.addEventListener('resize', () => {
        shouldScroll = false; // Reset flag
    });

    // Preventing unwanted scroll on page load
    window.addEventListener('load', () => {
        shouldScroll = false;
    });
});
