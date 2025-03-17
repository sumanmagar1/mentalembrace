document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribe-form');
    const videoCategories = document.getElementById('video-categories');
    const videoItems = document.querySelectorAll('.video-item');

    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        this.reset();
    });

    // Add hover effect to video items
    videoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Video category filtering
    videoCategories.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const category = e.target.getAttribute('data-category');
            filterVideos(category);
        }
    });

    function filterVideos(category) {
        videoItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Lazy loading for iframes
    const lazyVideos = [].slice.call(document.querySelectorAll("iframe.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
                if (video.isIntersecting) {
                    for (let source in video.target.dataset) {
                        let videoSource = video.target.dataset[source];
                        if (video.target.src != videoSource) {
                            video.target.src = videoSource;
                        }
                    }
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function(lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current category
    function setActiveCategory(category) {
        const categoryLinks = videoCategories.querySelectorAll('a');
        categoryLinks.forEach(link => {
            if (link.getAttribute('data-category') === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    videoCategories.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const category = e.target.getAttribute('data-category');
            setActiveCategory(category);
        }
    });

    // Initialize with 'all' category active
    setActiveCategory('all');
});