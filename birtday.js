// Cake Animation and Intro
document.addEventListener('DOMContentLoaded', function() {
    // Add frosting dots to cake
    const cake = document.querySelector('.cake');
    const frostingColors = ['#fff', '#ffcad4', '#b8e0d2', '#d6eadf', '#eac4d5'];
    
    // Add frosting to cake bottom
    for (let i = 0; i < 20; i++) {
        const frosting = document.createElement('div');
        frosting.className = 'frosting';
        frosting.style.backgroundColor = frostingColors[Math.floor(Math.random() * frostingColors.length)];
        frosting.style.bottom = '60px';
        frosting.style.left = (10 + i * 12) + 'px';
        frosting.style.setProperty('--frosting-index', i);
        cake.appendChild(frosting);
    }
    // Add frosting to cake middle
    for (let i = 0; i < 18; i++) {
        const frosting = document.createElement('div');
        frosting.className = 'frosting';
        frosting.style.backgroundColor = frostingColors[Math.floor(Math.random() * frostingColors.length)];
        frosting.style.bottom = '120px';
        frosting.style.left = (25 + i * 12) + 'px';
        frosting.style.setProperty('--frosting-index', i + 20);
        cake.appendChild(frosting);
    }
    // Add frosting to cake top
    for (let i = 0; i < 15; i++) {
        const frosting = document.createElement('div');
        frosting.className = 'frosting';
        frosting.style.backgroundColor = frostingColors[Math.floor(Math.random() * frostingColors.length)];
        frosting.style.bottom = '170px';
        frosting.style.left = (45 + i * 12) + 'px';
        frosting.style.setProperty('--frosting-index', i + 38);
        cake.appendChild(frosting);
    }
    
    // Add sprinkles
    const sprinkleColors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#FF85D5', '#85C6FF'];
    for (let i = 0; i < 40; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.backgroundColor = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];
        sprinkle.style.bottom = (70 + Math.random() * 100) + 'px';
        sprinkle.style.left = (20 + Math.random() * 210) + 'px';
        sprinkle.style.transform = `rotate(${Math.random() * 90}deg)`;
        sprinkle.style.setProperty('--sprinkle-index', i);
        cake.appendChild(sprinkle);
    }
    
    // Show cake text after delay
    setTimeout(() => {
        document.getElementById('cake-text').classList.add('visible');
    }, 1000);
    
    // Show cake message after delay
    setTimeout(() => {
        document.getElementById('cake-message').classList.add('visible');
    }, 2000);
    
    // Show cake button after delay
    setTimeout(() => {
        document.getElementById('cake-button').classList.add('visible');
    }, 3000);
    
    // Add falling decorations
    const decorationContainer = document.getElementById('cake-container');
    const decorations = ['🎂', '🎁', '🎈', '🎉', '✨', '🎊', '🎵', '🎀'];
    
    for (let i = 0; i < 30; i++) {
        const decoration = document.createElement('div');
        decoration.className = 'decoration';
        decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
        decoration.style.fontSize = (Math.random() * 30 + 20) + 'px';
        decoration.style.left = (Math.random() * 100) + 'vw';
        decoration.style.top = '-50px';
        decoration.style.animation = `decorationFall ${Math.random() * 5 + 5}s linear infinite`;
        decoration.style.animationDelay = (Math.random() * 5) + 's';
        decorationContainer.appendChild(decoration);
    }
    
    // Continue button click handler
    document.getElementById('cake-button').addEventListener('click', function() {
        document.getElementById('cake-container').classList.add('fade-out');
        
        // Start main page animations after cake animation
        setTimeout(() => {
            // Remove cake container from DOM after animation
            document.getElementById('cake-container').style.display = 'none';
            
            // Start hero animations
            startMainPageAnimations();
        }, 1000);
    });
    
    // Allow clicking anywhere or pressing any key to continue
    document.getElementById('cake-container').addEventListener('click', function(e) {
        if (e.target.id !== 'cake-button' && document.getElementById('cake-button').classList.contains('visible')) {
            document.getElementById('cake-button').click();
        }
    });
    
    document.addEventListener('keydown', function() {
        if (document.getElementById('cake-button').classList.contains('visible')) {
            document.getElementById('cake-button').click();
        }
    });
});

// Main page animations
function startMainPageAnimations() {
    // Hero section animations
    setTimeout(() => {
        document.getElementById('hero-pre-title').classList.add('opacity-100', 'transform-none');
        document.getElementById('hero-pre-title').classList.remove('translate-y-10');
    }, 300);
    setTimeout(() => {
        document.getElementById('hero-title').classList.add('opacity-100', 'transform-none');
        document.getElementById('hero-title').classList.remove('translate-y-10');
    }, 800);
    setTimeout(() => {
        document.getElementById('hero-subtitle').classList.add('opacity-100');
    }, 1300);
    setTimeout(() => {
        document.getElementById('celebrate-btn').classList.add('opacity-100', 'transform-none');
        document.getElementById('celebrate-btn').classList.remove('translate-y-10');
    }, 1800);
    setTimeout(() => {
        document.getElementById('scroll-indicator').classList.add('opacity-100');
    }, 2300);

    // Parallax background effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function parallaxBg() {
            const scrollY = window.scrollY || window.pageYOffset;
            // Move background layers at different speeds
            heroSection.style.backgroundPosition = `center ${-scrollY * 0.2}px, center ${-scrollY * 0.1}px, center top`;
        });
    }

    // Initialize intersection observer for scroll animations
    initIntersectionObserver();
    // Initialize scroll progress
    initScrollProgress();
    // Initialize countdown
    initCountdown();
    // Auto trigger confetti
    createConfetti();
    createGlitter();
}

// Intersection Observer for scroll animations
function initIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'transform-none');
                entry.target.classList.remove('translate-y-10', 'translate-x-10');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Message section
    observer.observe(document.getElementById('message-title'));
    observer.observe(document.getElementById('message-line'));
    observer.observe(document.getElementById('birthday-card'));
    
    // Timeline section
    observer.observe(document.getElementById('timeline-title'));
    observer.observe(document.getElementById('timeline-line'));
    observer.observe(document.getElementById('timeline-subtitle'));
    observer.observe(document.getElementById('timeline-1'));
    observer.observe(document.getElementById('timeline-2'));
    observer.observe(document.getElementById('timeline-3'));
    observer.observe(document.getElementById('timeline-4'));
    observer.observe(document.getElementById('timeline-5'));
    
    // Memories section
    observer.observe(document.getElementById('memories-title'));
    observer.observe(document.getElementById('memories-line'));
    observer.observe(document.getElementById('memories-subtitle'));
    observer.observe(document.getElementById('memory-1'));
    observer.observe(document.getElementById('memory-2'));
    observer.observe(document.getElementById('memory-3'));
    observer.observe(document.getElementById('memory-4'));
    observer.observe(document.getElementById('memory-5'));
    observer.observe(document.getElementById('memory-6'));
    
    // Gallery section
    observer.observe(document.getElementById('gallery-title'));
    observer.observe(document.getElementById('gallery-line'));
    observer.observe(document.getElementById('gallery-subtitle'));
    observer.observe(document.getElementById('gallery-container'));
    
    // Wishes section
    observer.observe(document.getElementById('wishes-title'));
    observer.observe(document.getElementById('wishes-icons'));
    observer.observe(document.getElementById('wishes-text'));
    observer.observe(document.getElementById('countdown-container'));
    observer.observe(document.getElementById('wishes-button'));
}

// Scroll progress bar
function initScrollProgress() {
    window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
        
        // Sticky navigation
        if (winScroll > 100) {
            document.getElementById("sticky-nav").classList.add("visible");
        } else {
            document.getElementById("sticky-nav").classList.remove("visible");
        }
    };
}

// Confetti animation
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#FF85D5', '#85C6FF', '#FFED85'];
    
    // Clear previous confetti
    container.innerHTML = '';
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(confetti);
    }
}

// Glitter animation
function createGlitter() {
    const container = document.getElementById('glitter-container');
    
    // Clear previous glitter
    container.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        glitter.style.left = Math.random() * 100 + 'vw';
        glitter.style.top = Math.random() * 100 + 'vh';
        glitter.style.animation = `glitter ${Math.random() * 2 + 1}s ease-in-out infinite`;
        glitter.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(glitter);
    }
}

// Countdown timer
function initCountdown() {
    // Set the date we're counting down to (today + 1 day as example)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 1);
    
    // Update the count down every 1 second
    const x = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("countdown-days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("countdown-hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("countdown-minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("countdown-seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-container").innerHTML = "<div class='text-3xl font-bold'>Happy Birthday!</div>";
        }
    }, 1000);
}

// Celebrate button
document.getElementById('celebrate-btn').addEventListener('click', function() {
    createConfetti();
    createGlitter();
    
    // Add animate.css class to title for extra animation
    document.getElementById('hero-title').classList.add('animate__animated', 'animate__rubberBand');
    
    // Scroll to birthday message
    document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
});

// Birthday wish button
document.getElementById('birthday-wish').addEventListener('click', function() {
    // Create a custom modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate__animated animate__fadeIn';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-xl p-8 max-w-md mx-4 animate__animated animate__zoomIn shadow-2xl';
    modalContent.innerHTML = `
        <div class="text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold text-pink-600 mb-4">Birthday Wishes Sent!</h3>
            <p class="text-gray-700 mb-6">Your special birthday message has been sent to Diksha with lots of love and good wishes!</p>
            <button class="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-all transform hover:scale-105">Close</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal on button click
    modal.querySelector('button').addEventListener('click', function() {
        modal.classList.add('animate__fadeOut');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 500);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('animate__fadeOut');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 500);
        }
    });
    
    // Trigger confetti and glitter
    createConfetti();
    createGlitter();
    
    // Change button text
    this.textContent = 'Wishes Sent! 🎉';
    this.disabled = true;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
