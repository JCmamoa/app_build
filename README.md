# Apex Architectures — Apple-Inspired Services Showcase

A high-converting, continuous scrolling digital agency showcase presenting software engineering services:
- **Mobile & Web Applications** (iOS, Android, React Native, PWA)
- **High-Velocity E-Commerce** (Headless Shopify, MedusaJS, Stripe)
- **Publishing & Content Hubs** (Sub-second TTFB, Headless CMS, MDX)
- **Multi-Architecture Backend Platforms** (Microservices & K8s, Event-Driven Kafka, Serverless Edge, Distributed DBs)

---

## Key Features

- **Apple Human Interface Aesthetics**: Deep obsidian color palette (`#0a0a0c`), frosted glass (`backdrop-filter: blur(24px)`), refined typography (Inter / SF Pro), and ambient mesh glow lighting.
- **Bento Grid Architecture**: Asymmetric modular grid layout with dynamic cursor spotlight illumination and subtle 3D tilt physics (`bento-tilt.js`).
- **Interactive Backend Switcher**: Live tabbed architecture blueprints and flow topologies (`architecture.js`).
- **Real-Time Validated Contact Form**: Multi-select project category pills, budget selectors, accessible validation with ARIA live feedback, and XSS sanitization (`contact-form.js`).
- **Continuous Scroll Mechanics**: Scroll spy, dynamic progress indicator, smooth scroll anchor links, and floating back-to-top button.
- **Enterprise Security**: Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and directory traversal prevention in `server.js`.

---

## Directory Structure

```
app_build/
├── index.html            # Semantic HTML5, Meta SEO, OpenGraph & JSON-LD
├── package.json          # Node scripts for server and automated tests
├── server.js             # High-performance HTTP server with CSP & security headers
├── css/
│   ├── main.css          # Design tokens, reset, typography, ambient glow
│   ├── components.css    # Hero, Bento Grid, Testimonials, Form, Modal
│   └── animations.css    # GPU-accelerated micro-interactions & tilt physics
├── js/
│   ├── app.js            # App coordinator, scroll spy & Web Vitals monitor
│   ├── bento-tilt.js     # 3D tilt & cursor spotlight glow engine
│   ├── architecture.js   # Interactive backend architecture switcher
│   └── contact-form.js   # Validation, XSS sanitization & confirmation modal
├── tests/
│   ├── functionality.test.js # Functional & boundary tests
│   ├── security-audit.test.js # XSS & security headers audit
│   ├── seo-content.test.js   # SEO metadata & JSON-LD schema audit
│   └── run-all-tests.js      # Master test runner
└── README.md             # Project documentation
```

---

## Running the Application Locally

1. Start the HTTP static server:
   ```bash
   node server.js
   ```
2. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## Running the Automated Test Suite

Execute all verification suites (Functionality, Security, SEO):
```bash
npm test
```
Or run individually:
```bash
npm run test:func  # Functional & boundary tests
npm run test:sec   # Security & XSS audit
npm run test:seo   # SEO & JSON-LD validation
```
