# OASIS – Smart Physical Event Experience

OASIS is a futuristic, interactive, and visually stunning web platform designed for next-generation smart sports stadiums and large event venues. It tackles critical pain points in stadium management—such as crowd bottlenecks, long concessions queues, navigational confusion, and emergency coordination—offering an interactive, data-driven simulation of real-time venue operations.

This project was built for a hackathon, prioritizing a **beginner-friendly technological stack** and clean code patterns ideal for 1st-year IT students.

---

## 🚀 Key Features

1. **Hero & Concentric Hologram:** Features a modern glassmorphic tag, automatic typewriter text animation, and a pure-CSS rotating 3D stadium hologram model with mouse-parallax floating data cards.
2. **Smart Stadium Ecosystem (Features Grid):** Glow-on-hover cards highlighting AI Crowd Tracking, Smart Concessions, Wayfinding Navigation, Emergency SOS, Real-Time Notifications, and Mobile Seat Ordering.
3. **Operations Control Center (Live Dashboard):** An interactive console allowing event operators to simulate live scenarios:
   - **Crowd Spike:** Triggers sensor threshold alerts and adjusts pathing.
   - **Peak Halftime Wait:** Warns users of queue delays and prompts virtual ordering.
   - **Trigger SOS:** Broadcasts alerts, dispatches paramedic teams, and lights up visual exits.
   - **Reset Control:** Restores all telemetry instantly back to optimal flow levels.
4. **Interactive Venue Map & Navigation:** Clickable stadium sector blocks (North, East, South, and West Zones) that update telemetry parameters (occupancy, pricing, attractions) dynamically. Features three visual sub-simulators:
   - *Wayfinding Pathing:* Draws active, congestion-avoiding walking directions to a seat row.
   - *Evacuation Exit Guide:* Lights up blinking green emergency exit symbols at main perimeter terminals.
   - *Smart Parking:* Highlights vacant parking bays (P1, P3) based on real-time availability.
5. **Floating Emergency SOS Button:** A persistent, pulsing neon-red shortcut overlay in the bottom corner of the site. Clicking it triggers the dashboard alarms and displays a glassmorphic confirmation modal showing precise node dispatch telemetry.
6. **FAQ Accordion & Testimonials:** Smooth CSS height-transition dropdown drawers and rating-star customer feedback cards.

---

## 🛠️ Technology Stack

To ensure simplicity, clean architecture, and framework-free code, the project is built entirely on:
- **HTML5:** Semantic scaffolding.
- **CSS3 (Vanilla):** Custom neon variables, flexbox/grid page grids, glassmorphism filters (`backdrop-filter`), keyframe animations, and media queries for responsive layouts.
- **JavaScript (ES6):** Vanilla event handlers, DOM manipulation methods, IntersectionObserver scrolling triggers, and interval-driven count-up statistics.
- **FontAwesome & Google Fonts:** Outfit (headings) and Inter (body) CDN integration.

---

## 📁 Project Structure

```text
SmartStadium/
│
├── index.html         # Main semantic structure, layout, and modal markups
│
├── css/
│   └── style.css      # Core theme colors, glassmorphism style rules, and animations
│
├── js/
│   └── main.js        # Dynamic scripts, interactive simulators, and UI loaders
│
└── README.md          # Project documentation (this file)
```

---

## 💻 How to Run Locally

You can launch and explore this static website locally without compiling or installing heavy packages.

### Method 1: Python Built-in Server (Recommended)
If you have Python installed on your machine:
1. Open your terminal or Command Prompt inside the project workspace directory:
   ```bash
   cd "SmartStadium"
   ```
2. Start the local server:
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   [http://localhost:8080](http://localhost:8080)

### Method 2: VS Code Live Server
If you use VS Code:
1. Install the **Live Server** extension by Ritwick Dey.
2. Open the project folder in VS Code.
3. Click the **Go Live** button at the bottom-right status bar.
4. The site will automatically launch in your default browser.
