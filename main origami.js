// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const navOverlay = document.querySelector('.nav-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle mobile menu - ONLY for mobile (≤ 767px)
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Only activate on mobile screens
            if (window.innerWidth <= 767) {
                this.classList.toggle('active');
                navMenuContainer.classList.toggle('active');
                navOverlay.classList.toggle('active');
                document.body.style.overflow = navMenuContainer.classList.contains('active') ? 'hidden' : '';
            }
        });
    }
    
    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            // Only on mobile
            if (window.innerWidth <= 767) {
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                if (navMenuContainer) navMenuContainer.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Handle dropdowns
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                // Mobile behavior
                if (window.innerWidth <= 767) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
                // Tablet and Desktop - allow normal link behavior
            });
        }
    });
    
    // Close dropdowns when clicking outside (desktop/tablet)
    document.addEventListener('click', function(e) {
        // Desktop/Tablet behavior
        if (window.innerWidth > 767) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
        // Mobile behavior
        else {
            // Close menu when clicking a link
            const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)');
            navLinks.forEach(link => {
                if (link.contains(e.target)) {
                    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                    if (navMenuContainer) navMenuContainer.classList.remove('active');
                    if (navOverlay) navOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Close all dropdowns
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset on resize to larger screens
        if (window.innerWidth > 767) {
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            if (navMenuContainer) navMenuContainer.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Prevent default behavior for dropdown toggles on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                e.preventDefault();
            }
        });
    });
});








