document.addEventListener('DOMContentLoaded', function() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.about-section');
    const animateSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateSections);
    animateSections(); // Initial check on page load

    // Add hover effect to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Get Involved button click event
    const getInvolvedBtn = document.getElementById('get-involved-btn');
    if (getInvolvedBtn) {
        getInvolvedBtn.addEventListener('click', function() {
            alert('Thank you for your interest in getting involved! We will contact you soon with more information.');
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
});