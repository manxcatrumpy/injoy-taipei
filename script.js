document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll - Not needed for Sticky below hero, but kept for future use if needed or cleanup
    // const navbar = document.getElementById('navbar');

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileBtn && mobileOverlay) {
        mobileBtn.addEventListener('click', () => {
            mobileOverlay.classList.toggle('active');

            // Toggle hamburger animation
            const spans = mobileBtn.querySelectorAll('span');
            if (mobileOverlay.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('active');
                // Reset hamburger
                const spans = mobileBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view'); // You can add specific animation class here if not using just fade-in-out on load
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements (will be more useful when we add more sections)
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab pane
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
