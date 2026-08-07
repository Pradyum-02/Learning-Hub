# CivicPulse — AI Powered Civic Issue Reporting & Management System

A production-quality frontend built with **HTML5, CSS3 and vanilla JavaScript only**.
No frameworks, no CSS libraries, no build step — open `index.html` in any modern browser.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page: hero, statistics, features, how it works, FAQ, CTA, footer |
| `login.html` | Sign in with validation, remember me, forgot-password modal |
| `register.html` | Citizen registration with government ID, phone, password strength meter |
| `dashboard.html` | Greeting, stat cards, CSS bar chart, SVG donut, recent issues, quick actions |
| `report.html` | Category picker, location, description, priority, upload area, progress stepper |
| `issues.html` | Data table with search, filters, sorting, status badges and pagination |
| `issue-details.html` | Tabs, timeline, comments, AI classification, gallery, location card |
| `notifications.html` | Notification cards, unread indicators, filters, mark all as read |
| `profile.html` | Citizen information, activity, settings toggles, edit modal |
| `admin.html` | Analytics cards, SVG line chart, department overview, approvals, tables |

## Structure

```
CivicPulse/
├── *.html            10 fully linked pages
├── css/
│   ├── style.css     design system: tokens, components, landing page
│   ├── auth.css      login & registration
│   ├── dashboard.css dashboard, issues, details, profile, notifications
│   ├── report.css    report form, stepper, dropzone
│   ├── admin.css     admin analytics
│   ├── tablet.css    768–1024px: collapsed icon sidebar, two-column grids
│   └── mobile.css    ≤768px: hamburger, off-canvas sidebar, bottom nav, sticky FAB
├── js/
│   ├── utils.js      helpers, validators, toasts, counters
│   ├── app.js        navbar, sidebar, dropdowns, modals, tabs, accordions
│   ├── auth.js       login/registration validation, password meter
│   ├── dashboard.js  charts, notifications, table search/sort/pagination
│   ├── report.js     stepper, image preview, geolocation placeholder
│   └── admin.js      range switcher, SVG line chart, approvals
├── images/
├── icons/
└── README.md
```

## Design system

Colours, radii, spacing, shadows and transitions are declared once as CSS custom
properties in `css/style.css` and reused everywhere.

- Primary `#2563EB`, dark `#1E40AF`, accent `#3B82F6`
- Surfaces `#FFFFFF` / `#F8FAFC`, borders `#E5E7EB`
- Text `#111827`, secondary `#6B7280`
- Success `#16A34A`, warning `#F59E0B`, danger `#DC2626`
- Radius `12px` / `16px`, shadow `0 8px 24px rgba(0,0,0,.08)`, transitions `0.25s`
- Typography: Inter with a system-font fallback stack

## Responsive behaviour

Three deliberately different layouts, not one design scaled down:

- **Desktop** — persistent 264px sidebar, multi-column dashboards, wide tables
- **Tablet** — sidebar collapses to a 76px icon rail, two-column grids
- **Mobile** — hamburger + off-canvas drawer, five-item bottom navigation,
  vertical cards, 44px+ touch targets, sticky “Report issue” action button

## Accessibility

Semantic landmarks, skip link, labelled form controls with inline errors,
ARIA roles on tabs, modals, accordions and dropdowns, `aria-sort` on sortable
columns, visible focus rings, Escape-to-close overlays and keyboard-operable
custom controls.

## Notes

This is a frontend-only demonstration build: data is static markup and all
interactions (submissions, approvals, uploads) are simulated in the browser.
It is structured to be wired to a real backend and AI classification service.
