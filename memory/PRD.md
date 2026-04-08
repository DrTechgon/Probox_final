# Probox Landing Page - PRD

## Original Problem Statement
Create a premium "Careers" section for the existing Probox landing page. Must integrate seamlessly with the LIGHT-themed design (white/off-white base). The section should feel high-end, interactive, and visually rich — Apple × Stripe × Twine.com level polish. Focus on motion, depth, layering, micro-interactions, and visual storytelling.

## Architecture
- **Framework**: Next.js 16.1.7 with Turbopack
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion v12.38
- **Icons**: Lucide React
- **Fonts**: Manrope (body) + Space Grotesk (display)
- **Brand Colors**: Primary accent #c98545 (warm gold), slate-based text

## User Personas
- Developers browsing the site who would be impressed by the interactive design
- Potential job candidates exploring open roles
- Clients visiting the landing page who notice the team/hiring culture

## Core Requirements (Static)
1. Light-themed careers section replacing existing dark section
2. Framer Motion animations throughout
3. Interactive role explorer with expand/collapse
4. Overview section (not full careers page)
5. Mobile responsive

## What's Been Implemented (Jan 8, 2026)
- **Section Intro**: "Build the Future With Us" heading with gradient text, animated background blobs, dot grid pattern
- **Interactive Role Explorer**: 6 glassmorphism role cards in 2-col grid, each with tag chips, impact statements. Click to expand showing responsibilities, requirements, and "Apply Now" CTA. Chevron rotation animation on expand/collapse
- **Why Join Us**: 4 feature cards (AI Systems, Ownership, High-Growth, Cutting-Edge Stack) with scroll-based parallax, gradient icons, asymmetric stagger
- **Culture Marquee**: Dual-row infinite scrolling strip with 12 culture phrases, edge fade gradients, hover effects on pills
- **CTA Block**: "Explore Open Roles" button with brand gradient, ripple effect, hover scale/glow, supporting tagline

## Testing Status
- All 12 core tests passed (90%+ coverage)
- Card expansion/collapse fix verified with automated tests
- Desktop and mobile responsive verified

## Prioritized Backlog
### P0 (Done)
- Premium careers section with all 5 sub-sections

### P1 (Next)
- Full careers page at /careers route
- Link "Explore Open Roles" button to the careers page
- Add real job data from a CMS or API

### P2 (Future)
- Application form modal integration
- Dynamic role data from backend/CMS
- Analytics tracking for CTA clicks
- A/B testing for conversion optimization

## Next Tasks
1. Build dedicated /careers page with full job listings
2. Add application form or external ATS integration
3. Connect role data to a backend API/CMS
