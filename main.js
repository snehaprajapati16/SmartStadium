/* ==========================================================================
   OASIS - SMART PHYSICAL EVENT EXPERIENCE
   Main JavaScript (js/main.js)
   Designed for: 1st Year IT Student - Explanatory comments, clear functions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initLoader();
    initNavbarMobile();
    initHeroTyping();
    initScrollAnimations();
    initDashboardFeed();
    initMapInteractions();
    initStatCounters();
    initFaqAccordion();
    initHeroParallax();
});

/* ==========================================================================
   1. LOADING SCREEN
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById("loading-screen");
    
    // Simulate natural loading behavior
    window.addEventListener("load", () => {
        // Allow the progress bar animation to complete first
        setTimeout(() => {
            loader.classList.add("fade-out");
        }, 1200); // 1.2 seconds delay for visual effect
    });
}

/* ==========================================================================
   2. MOBILE NAVBAR MENU
   ========================================================================== */
function initNavbarMobile() {
    const toggleBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    // Toggle menu state on button click
    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
        
        // Simple hamburger transition animation
        toggleBtn.classList.toggle("active");
    });

    // Close menu when a navigation link is clicked (good UX)
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            navLinks.classList.remove("mobile-active");
            toggleBtn.classList.remove("active");
            
            // Set clicked link as active visual class
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

/* ==========================================================================
   3. HERO TYPING TEXT EFFECT
   ========================================================================== */
function initHeroTyping() {
    const textElement = document.getElementById("typing-text");
    const textToType = "A next-generation crowd intelligence and navigation platform built to optimize guest experience, streamline queue lines, and coordinate venue safety in real-time.";
    
    let index = 0;
    const typingSpeed = 25; // millisecond gap between keystrokes

    function typeWriter() {
        if (index < textToType.length) {
            textElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing after loading screen finishes fading
    setTimeout(typeWriter, 1800);
}

/* ==========================================================================
   4. SCROLL TO FADE-IN ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll(".fade-up");

    // We use the modern, efficient Intersection Observer API to detect scrolling position
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // triggers slightly before entering the screen
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Stop tracking once animated
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* ==========================================================================
   5. LIVE DASHBOARD SIMULATOR LOGIC
   ========================================================================== */
// Save original/default status variables
const defaultDashboardState = {
    density: "42%",
    densityVal: 42,
    wait: "3.4 Mins",
    waitVal: 34,
    occupancy: "32,840",
    occupancyVal: 65,
    sosStatus: "SECURE",
    sosColor: "var(--neon-green)"
};

// Initial alerts array
const initialAlerts = [
    {
        type: "info",
        title: "Main Entry Gates Open",
        desc: "All stadium entry gates are active. Security lines moving swiftly.",
        time: "10 Mins Ago",
        icon: "fa-door-open"
    },
    {
        type: "info",
        title: "Stadium Mesh Wi-Fi Active",
        desc: "Guests can connect to 'OASIS-FREE-WIFI' for local seat navigation.",
        time: "25 Mins Ago",
        icon: "fa-wifi"
    }
];

// Helper: updates the text and progress bar width of a metric card
function updateDashboardUI(densityText, densityVal, waitText, waitVal, occupancyText, occupancyVal, sosText, sosColor, sosVal) {
    document.getElementById("dash-density").textContent = densityText;
    document.getElementById("density-bar").style.width = densityVal + "%";
    
    document.getElementById("dash-wait").textContent = waitText;
    document.getElementById("wait-bar").style.width = waitVal + "%";
    
    document.getElementById("dash-occupancy").textContent = occupancyText;
    document.getElementById("occupancy-bar").style.width = occupancyVal + "%";
    
    const sosEl = document.getElementById("dash-sos");
    sosEl.textContent = sosText;
    sosEl.style.color = sosColor;
    
    const sosBar = document.getElementById("sos-bar");
    sosBar.style.width = sosVal + "%";
    sosBar.style.backgroundColor = sosColor;
}

// Helper: appends an announcement to the live log feed
function injectAlertFeed(type, title, desc, icon) {
    const feed = document.getElementById("alerts-feed");
    
    const item = document.createElement("div");
    item.className = `feed-item ${type}`;
    
    item.innerHTML = `
        <div class="feed-item-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="feed-item-content">
            <div class="feed-item-title">${title}</div>
            <div class="feed-item-desc">${desc}</div>
            <div class="feed-item-time">Just Now</div>
        </div>
    `;
    
    // Insert at the top of the list
    feed.insertBefore(item, feed.firstChild);
    
    // Auto-scroll feed container to top
    feed.scrollTop = 0;
}

// Reset log to initial items
function initDashboardFeed() {
    const feed = document.getElementById("alerts-feed");
    feed.innerHTML = "";
    initialAlerts.forEach(alert => {
        const item = document.createElement("div");
        item.className = `feed-item ${alert.type}`;
        item.innerHTML = `
            <div class="feed-item-icon"><i class="fa-solid ${alert.icon}"></i></div>
            <div class="feed-item-content">
                <div class="feed-item-title">${alert.title}</div>
                <div class="feed-item-desc">${alert.desc}</div>
                <div class="feed-item-time">${alert.time}</div>
            </div>
        `;
        feed.appendChild(item);
    });
}

// Simulation scenario 1: Crowd Spike
function simulateCrowdSpike() {
    updateDashboardUI("84%", 84, "6.8 Mins", 68, "47,210", 94, "SECURE", "var(--neon-green)", 100);
    injectAlertFeed("warning", "High Concourse Density detected", "Sectors East & North reaching 85% capacity. Adjusting navigation pathways.", "fa-users-rays");
}

// Simulation scenario 2: Peak Halftime Wait
function simulatePeakTime() {
    updateDashboardUI("68%", 68, "12.5 Mins", 100, "48,900", 97, "SECURE", "var(--neon-green)", 100);
    injectAlertFeed("warning", "Food Court Queues High", "Halftime rush: Concourse food stands reporting average wait times > 12 mins. Recommend Virtual Ordering.", "fa-hourglass-half");
}

// Simulation scenario 3: SOS Trigger
function triggerEmergencySOS() {
    updateDashboardUI("55%", 55, "4.2 Mins", 42, "32,840", 65, "ACTIVE ALERT", "var(--neon-pink)", 40);
    injectAlertFeed("warning", "Emergency Beacon: West Sector Row 14", "Emergency Assistance request. First responder medical unit dispatched to coordinates. Pathway Exit guide lit.", "fa-triangle-exclamation");
    
    // Flashes stadium exits green on map automatically
    const mapRing = document.getElementById("map-ring");
    const exitsSimBtn = document.getElementById("btn-exits-sim");
    const exitMarkers = document.querySelectorAll(".emergency-exit-marker");
    
    mapRing.classList.add("exits-active");
    exitsSimBtn.classList.add("active");
    exitMarkers.forEach(marker => marker.style.display = "flex");
}

// Reset Sim
function resetSimulation() {
    updateDashboardUI(
        defaultDashboardState.density,
        defaultDashboardState.densityVal,
        defaultDashboardState.wait,
        defaultDashboardState.waitVal,
        defaultDashboardState.occupancy,
        defaultDashboardState.occupancyVal,
        defaultDashboardState.sosStatus,
        defaultDashboardState.sosColor,
        100
    );
    initDashboardFeed();
    
    // Clear Map Simulations
    const mapRing = document.getElementById("map-ring");
    mapRing.classList.remove("exits-active");
    
    document.querySelectorAll(".emergency-exit-marker").forEach(m => m.style.display = "none");
    document.querySelectorAll(".parking-spot").forEach(p => p.style.display = "none");
    
    const pathLine = document.getElementById("nav-path-line");
    pathLine.classList.remove("active");
    pathLine.style.opacity = 0;
    
    document.querySelectorAll(".map-btn").forEach(btn => btn.classList.remove("active"));
}

/* ==========================================================================
   6. INTERACTIVE STADIUM MAP AND SEAT SIMULATOR
   ========================================================================== */
function initMapInteractions() {
    const sectors = document.querySelectorAll(".zone-sector");
    const displayTitle = document.getElementById("zone-display-title");
    const displayCapacity = document.getElementById("zone-capacity");
    const displayStatus = document.getElementById("zone-status");
    const displayPrice = document.getElementById("zone-price");
    const displayAttraction = document.getElementById("zone-attraction");

    // Handle clicking stadium map sectors
    sectors.forEach(sector => {
        sector.addEventListener("click", () => {
            // Remove active classes from other sectors
            sectors.forEach(s => s.classList.remove("active"));
            
            // Set active class on clicked sector
            sector.classList.add("active");
            
            // Retrieve custom HTML data attributes
            const name = sector.getAttribute("data-zone");
            const occupancy = sector.getAttribute("data-occupancy");
            const status = sector.getAttribute("data-status");
            const price = sector.getAttribute("data-price");
            const attraction = sector.getAttribute("data-attraction");
            
            // Update sidebar info
            displayTitle.textContent = name;
            displayCapacity.textContent = occupancy;
            displayStatus.textContent = status;
            displayPrice.textContent = price;
            displayAttraction.textContent = attraction;
            
            // Text color logic depending on busy states
            if (status === "Crowded") {
                displayStatus.style.color = "var(--neon-pink)";
            } else if (status === "Clear") {
                displayStatus.style.color = "var(--neon-green)";
            } else {
                displayStatus.style.color = "var(--neon-blue)";
            }
        });
    });
}

// Sub-Feature: Toggle Wayfinding Path overlay on Map
function togglePathSimulation() {
    const pathLine = document.getElementById("nav-path-line");
    const btn = document.getElementById("btn-path-sim");
    
    btn.classList.toggle("active");
    
    if (btn.classList.contains("active")) {
        pathLine.classList.add("active");
        pathLine.style.opacity = 1;
        pathLine.style.width = "40%";
        pathLine.style.height = "2px";
        pathLine.style.top = "50%";
        pathLine.style.left = "25%";
        pathLine.style.transform = "rotate(25deg)";
        injectAlertFeed("info", "Wayfinding Simulation Active", "Optimal route mapped to Sector West, Row 12, Seat 4. Flow adjustments computed.", "fa-route");
    } else {
        pathLine.classList.remove("active");
        pathLine.style.opacity = 0;
    }
}

// Sub-Feature: Show Exits on Stadium Map
function toggleExitsSimulation() {
    const mapRing = document.getElementById("map-ring");
    const btn = document.getElementById("btn-exits-sim");
    const exitMarkers = document.querySelectorAll(".emergency-exit-marker");
    
    btn.classList.toggle("active");
    
    if (btn.classList.contains("active")) {
        mapRing.classList.add("exits-active");
        exitMarkers.forEach(marker => {
            marker.style.display = "flex";
        });
        injectAlertFeed("info", "Evacuation exits active", "Displaying visual coordinates of all perimeter access paths and exit terminals.", "fa-person-running");
    } else {
        mapRing.classList.remove("exits-active");
        exitMarkers.forEach(marker => {
            marker.style.display = "none";
        });
    }
}

// Sub-Feature: Locate nearest Parking
function toggleParkingSimulation() {
    const btn = document.getElementById("btn-parking-sim");
    const parkingLots = document.querySelectorAll(".parking-spot");
    
    btn.classList.toggle("active");
    
    if (btn.classList.contains("active")) {
        parkingLots.forEach(lot => {
            lot.style.display = "flex";
        });
        injectAlertFeed("info", "Parking Assist engaged", "Scanning parking slots. P1 and P3 report vacancies. Guided route established.", "fa-square-parking");
    } else {
        parkingLots.forEach(lot => {
            lot.style.display = "none";
        });
    }
}

/* ==========================================================================
   7. ANIMATED COUNT-UP NUMBERS
   ========================================================================== */
function initStatCounters() {
    const counters = document.querySelectorAll(".stat-number");
    
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"));
                let count = 0;
                const duration = 2000; // 2 seconds total count animation
                const increment = Math.ceil(target / (duration / 25)); // 25ms frame ticks
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target + "%";
                        clearInterval(timer);
                    } else {
                        counter.textContent = count + "%";
                    }
                }, 25);
                
                // Stop observing after running animation once
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => countObserver.observe(counter));
}

/* ==========================================================================
   8. FAQ ACCORDION MENU
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        
        questionBtn.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all items first (accordion style)
            faqItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-answer").style.maxHeight = null;
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add("active");
                // Calculate actual inner height to animate smoothly
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

/* ==========================================================================
   9. HERO FLOAT PARALLAX EFFECT
   ========================================================================== */
function initHeroParallax() {
    const heroSection = document.getElementById("hero");
    const floatingCards = document.querySelectorAll(".hero-floating-card");
    
    // Only enable mouse movement effects on larger screens (desktop)
    if (window.innerWidth > 992) {
        heroSection.addEventListener("mousemove", (e) => {
            // Get mouse position relative to center of screen
            const mouseX = (e.clientX - window.innerWidth / 2) / 100;
            const mouseY = (e.clientY - window.innerHeight / 2) / 100;
            
            floatingCards.forEach(card => {
                const speed = parseFloat(card.getAttribute("data-speed"));
                // Displace card depending on mouse move coordinate and speed ratio
                const xDisplace = mouseX * speed;
                const yDisplace = mouseY * speed;
                
                card.style.transform = `translate(${xDisplace}px, ${yDisplace}px) translateY(0)`;
            });
        });
    }
}

/* ==========================================================================
   10. FLOATING SOS MODAL CONTROLS
   ========================================================================== */
function triggerFloatingSOS() {
    // 1. Trigger the dashboard simulator alert state (activates exit signs, prints log)
    triggerEmergencySOS();
    
    // 2. Open the responsive glassmorphism modal
    const modal = document.getElementById("sos-modal");
    modal.style.display = "flex";
    
    // Tiny timeout to allow display layout paint before adding transition class
    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeSOSModal() {
    const modal = document.getElementById("sos-modal");
    
    // Remove active transition class (triggers fade-out and scale-down)
    modal.classList.remove("active");
    
    // Wait for the CSS transition to complete (300ms) before setting display: none
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}
