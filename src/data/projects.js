// data/projects.js

export const projects = [
  // ── Featured, in display order ──────────────────────────
  {
    slug: "modest-daily-fashion",
    title: "Modest Daily Fashion",
    tagline: "A full-stack e-commerce platform for a modest-fashion retail brand.",
    category: "Startup / E-Commerce",
    year: "2023 - Present",
    role: "Project Manager & Team Lead (Full Stack)",
    status: "Active",
    featured: true,
    color: "#E0A458",
    gradient: "from-amber-500 via-orange-400 to-amber-700",
    thumbnail: null,
    tech: ["Next.js", "Django", "PostgreSQL"],
    overview:
      "Modest Daily Fashion is an e-commerce platform built for a modest-fashion retail brand, covering the full customer journey, product catalog, checkout, order fulfillment, and customer accounts.",
    problem:
      "The brand needed a storefront it owned outright rather than a marketplace listing, room to grow the catalog, run promotions, and manage inventory without depending on a third-party platform's rules.",
    solution:
      "A custom storefront and admin system: Next.js on the frontend for a fast, SEO-friendly shopping experience, Django powering catalog, orders, payments, and inventory on the backend, with PostgreSQL as the system of record.",
    architecture:
      "Next.js renders the customer-facing storefront and talks to a Django REST backend for catalog, cart, and order data. Django's ORM and admin manage inventory and order state against PostgreSQL. As team lead, I set technical direction and coordinated delivery across both sides of the stack.",
    challenges: [
      "Coordinating frontend and backend work across a small team on a compressed timeline",
      "Designing a catalog and inventory model that could handle size and variant complexity",
      "Keeping checkout fast and reliable under real customer traffic",
    ],
    solutions: [
      "Established a shared API contract early so frontend and backend work could proceed in parallel",
      "Modeled products with variant-level inventory in PostgreSQL from the outset",
      "Used Next.js's built-in image and rendering optimizations to keep the storefront fast",
    ],
    lessons: [
      "A clear API contract is worth the upfront time, it removes most integration friction later",
      "Retail catalogs get complex fast once variants and inventory enter the picture",
      "Leading a small team means staying close to both the product and the code",
    ],
    results: [
      "Live, actively operating e-commerce platform",
      "Full catalog, cart, and checkout flow",
      "Admin tooling for inventory and order management",
      "Coordinated delivery across a small full-stack team",
    ],
    links: { live: null, github: null },
  },
  {
    slug: "smart-attendance-system",
    title: "Contactless Smart Card Attendance System",
    tagline: "A contactless attendance system built on smart card technology.",
    category: "Systems / Hardware Integration",
    year: "2022",
    role: "Developer",
    status: "Active",
    featured: true,
    color: "#5EA8A8",
    gradient: "from-teal-500 via-cyan-600 to-teal-800",
    thumbnail: null,
    tech: ["Python", "ACR Smart Card Reader (PC/SC)", "MySQL"],
    overview:
      "A contactless attendance system that uses ACR smart card readers to check people in and out, built for environments where fast, tap-based attendance beats manual sign-in sheets or biometric hardware.",
    problem:
      "Manual and paper-based attendance tracking is slow, error-prone, and easy to falsify. Biometric systems can be expensive and slow under load. A card-based system offered a faster, cheaper, more reliable middle ground.",
    solution:
      "A Python application that communicates with an ACR smart card reader over the PC/SC interface, resolves each card's unique ID on tap, and logs attendance events to MySQL in real time.",
    architecture:
      "The Python service polls the ACR reader via PC/SC, matches the card UID against registered users in MySQL, and writes a timestamped record on each successful tap, with duplicate-tap and error handling built in.",
    challenges: [
      "Working reliably with the ACR reader's low-level PC/SC interface",
      "Handling duplicate taps and edge cases like unregistered cards or reader disconnects",
      "Keeping the check-in flow fast enough to avoid queues",
    ],
    solutions: [
      "Built a stable polling loop around the PC/SC driver with proper error recovery",
      "Added debounce logic to prevent duplicate records from a single tap",
      "Indexed MySQL lookups on card UID for near-instant resolution",
    ],
    lessons: [
      "Hardware integration surfaces failure modes software-only projects don't, the debugging loop is different",
      "Reliability matters more than features in a system people depend on daily",
    ],
    results: [
      "In active use for real-time attendance tracking",
      "Reliable card-tap check-in with duplicate handling",
      "MySQL-backed records for reporting",
    ],
    links: { live: null, github: null },
  },
  {
    slug: "gopremiere-mobile",
    title: "GoPremiere - Mobile App",
    tagline: "The GoPremiere streaming experience, built for mobile.",
    category: "Startup / Mobile App",
    year: "2025",
    role: "Startup · Project Manager",
    status: "In Development",
    featured: true,
    color: "#4F8EF7",
    gradient: "from-blue-600 via-indigo-600 to-blue-900",
    thumbnail: null,
    // Frontend framework assumed as React Native (not specified), confirm/correct if different.
    tech: ["React Native", "FastAPI", "PostgreSQL"],
    overview:
      "The mobile counterpart to GoPremiere's web platform, bringing independent-film streaming to iOS and Android, backed by a FastAPI service layer shared with the rest of the product.",
    problem:
      "GoPremiere's audience increasingly expects to watch on mobile, not just desktop web. Without a native app, viewers were limited to a browser-based experience not built for how they actually watch.",
    solution:
      "A mobile app that surfaces GoPremiere's catalog and streaming experience natively, talking to a FastAPI backend for catalog data, playback URLs, and account state, with PostgreSQL as the shared data store.",
    architecture:
      "The mobile client consumes REST endpoints served by FastAPI, which sits in front of PostgreSQL and mediates access to the same catalog and account data used elsewhere in the GoPremiere platform.",
    challenges: [
      "Coordinating a mobile roadmap alongside an already-shipping web platform",
      "Designing playback that holds up across variable mobile network conditions",
      "Keeping mobile and web in sync against a shared backend",
    ],
    solutions: [
      "Sequenced mobile development against the existing FastAPI contract to avoid backend duplication",
      "Built adaptive playback handling for lower and variable bandwidth",
      "Ran a shared project plan across web and mobile workstreams as project manager",
    ],
    lessons: [
      "Managing a mobile build alongside a live product requires deliberate sequencing, not just parallel effort",
      "A shared backend keeps platforms consistent, but only if both sides plan around the same contract",
    ],
    results: [
      "Mobile app in active development against a shared FastAPI backend",
      "Coordinated delivery plan across web and mobile",
    ],
    links: { live: null, github: null },
  },
  {
    // Placeholder, reused from the original "producer-portal" entry.
    // Confirm this is the right project for slot #4, or send updated details.
    slug: "gopremiere-producer-upload",
    title: "GoPremiere Producer Upload Website",
    tagline: "A professional film submission experience for producers.",
    category: "Product / Web App",
    year: "2025",
    role: "Full Stack Engineer",
    status: "Live",
    featured: true,
    color: "#7C3AED",
    gradient: "from-purple-600 via-violet-600 to-purple-900",
    thumbnail: null,
    tech: ["React", "Next.js", "PostgreSQL", "Tailwind CSS", "AWS S3", "Node.js"],
    overview:
      "The producer-facing side of GoPremiere: a guided web experience for filmmakers to submit their films, metadata, rights agreements, and file upload in one flow.",
    problem:
      "Film submission processes are notoriously painful. Producers deal with clunky forms, confusing requirements, and no feedback after submitting. The experience needed to feel as professional as the films themselves.",
    solution:
      "A multi-step submission wizard guiding producers through metadata, rights agreements, and file uploads, with real-time validation, persistent state, and a polished UI that communicates trust.",
    architecture:
      "Next.js frontend with React Hook Form for validation, backed by Node.js API routes that handle file processing and database writes. Files upload directly to S3 via presigned URLs.",
    challenges: [
      "Managing complex multi-step form state without data loss",
      "Handling large video file uploads reliably",
      "Communicating submission status to producers in real time",
    ],
    solutions: [
      "Persistent form state with localStorage backup",
      "Direct-to-S3 uploads with progress tracking",
      "Email notifications and submission reference IDs",
    ],
    lessons: [
      "Trust signals matter enormously in B2B products",
      "Upload UX is a make-or-break moment, not a detail",
    ],
    results: [
      "End-to-end film submission flow live and functional",
      "Unique submission reference system for producer tracking",
      "Poster, thumbnail, and film file upload handling",
    ],
    links: { live: "/upload", github: null },
  },
  {
    slug: "lagoslist",
    title: "LagosList",
    tagline: "A local marketplace and listings app for Lagos.",
    category: "Startup / Mobile App",
    year: "2026",
    role: "Startup · Team Member (Frontend & Backend)",
    status: "In Development",
    featured: true,
    color: "#E85D75",
    gradient: "from-rose-500 via-red-500 to-rose-800",
    thumbnail: null,
    tech: ["React Native", "FastAPI", "PostgreSQL"],
    overview:
      "LagosList is a local marketplace app for Lagos, connecting buyers and sellers around listings, built as a small startup team, with me contributing across both the mobile frontend and the backend.",
    problem:
      "Buying and selling locally in Lagos happens across scattered, informal channels with no dedicated, trustworthy platform built for the city's pace and scale.",
    solution:
      "A React Native mobile app for browsing and posting listings, backed by a FastAPI service and PostgreSQL database handling listings, search, and user accounts.",
    architecture:
      "The React Native client consumes a FastAPI backend exposing listing, search, and account endpoints, with PostgreSQL as the primary data store. As a team member spanning both layers, I work across the mobile UI and the API it depends on.",
    challenges: [
      "Building listing search and discovery that stays fast as inventory grows",
      "Coordinating frontend and backend work as a small, fast-moving startup team",
      "Designing a listings data model flexible enough for varied categories",
    ],
    solutions: [
      "Indexed and paginated FastAPI endpoints for responsive search",
      "Worked across both mobile and backend to keep the API contract and UI moving together",
      "Modeled listings with category-specific attributes in PostgreSQL",
    ],
    lessons: [
      "Working across frontend and backend on a small team means the API contract has to stay a living conversation, not a fixed handoff",
    ],
    results: [
      "Mobile app and backend in active development",
      "Core listing, search, and account flows built out",
    ],
    links: { live: null, github: null },
  },
  {
    slug: "ecurmas",
    title: "Ecurmas",
    tagline:
      "A SaaS storefront builder for e-commerce, a WordPress-style platform purpose-built for online selling.",
    category: "SaaS / E-Commerce Platform",
    year: "2025",
    role: "Key Team Member - Frontend+Backend Development",
    status: "Not Active",
    featured: true,
    color: "#22A699",
    gradient: "from-emerald-500 via-teal-600 to-emerald-800",
    thumbnail: null,
    // Backend framework/database not specified, placeholder, confirm and correct.
    tech: ["Next.js", "Django", "PostgreSQL", "Tailwind CSS", "Node.js"],
    overview:
      "Ecurmas is a SaaS platform for building and running online stores, a WordPress-style, plug-and-play approach applied specifically to e-commerce, letting sellers stand up a storefront without custom development.",
    problem:
      "Most sellers who want a real storefront face a choice between expensive custom builds and rigid, generic e-commerce platforms not built around how they actually sell.",
    solution:
      "A configurable SaaS storefront builder: sellers provision a store, customize it, and manage products and orders through a managed platform rather than a custom codebase.",
    architecture:
      "Next.js powers the storefront and merchant-facing interfaces. As a key backend team member, I contributed to the service layer and data model underpinning store provisioning, catalog, and orders.",
    challenges: [
      "Modeling a multi-tenant system where each store's data stays properly isolated",
      "Building backend services flexible enough to support varied store configurations",
    ],
    solutions: [
      "Designed backend data structures around per-store isolation from the start",
      "Built core services supporting configurable storefront behavior",
    ],
    lessons: [
      "Multi-tenant SaaS systems demand isolation and configurability decisions early, they're expensive to retrofit",
    ],
    results: [
      "Backend services supporting store provisioning, catalog, and orders",
      "Platform built out through 2025",
    ],
    links: { live: null, github: null },
  },

  // ── Not currently featured, kept for their existing detail routes ──
  {
    slug: "gopremiere",
    title: "GoPremiere",
    tagline: "The streaming platform built for independent filmmakers",
    category: "Startup / Platform",
    year: "2024–Present",
    role: "Founder & Lead Engineer",
    status: "In Development",
    featured: false,
    color: "#4F8EF7",
    gradient: "from-blue-600 via-purple-600 to-indigo-800",
    thumbnail: null,
    tech: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "HLS Streaming",
      "FFmpeg",
      "AWS S3",
      "Docker",
      "Redis",
    ],
    overview:
      "GoPremiere is a premium streaming platform built specifically for independent filmmakers and producers. It bridges the gap between film creators and a global audience, giving producers a professional submission portal, automated video processing pipeline, and audience-facing streaming experience.",
    problem:
      "Independent filmmakers have no serious home. YouTube dilutes quality. Vimeo is expensive. Netflix doesn't take indie submissions. Producers spend months trying to distribute their work and end up with nothing to show for it. GoPremiere changes that.",
    solution:
      "A full-stack platform with a producer portal for film submission, automated HLS transcoding pipeline, an admin dashboard for content review and management, and a Netflix-quality streaming experience for viewers.",
    architecture:
      "The platform uses a microservice-influenced monorepo. The producer portal handles file uploads via signed S3 URLs. A processing queue picks up raw video files, runs FFmpeg transcoding to generate 1080p, 720p, and 480p HLS streams. The admin dashboard gives internal teams full control over content moderation and publishing.",
    challenges: [
      "Building a real-time video processing pipeline that handles large film files",
      "Designing a multi-step submission form that doesn't lose producer data on refresh",
      "Creating an HLS player that works across all devices and connection speeds",
      "Building an authentication system that serves both producers and admins differently",
    ],
    solutions: [
      "Implemented background job queues for async video processing with status tracking",
      "Used localStorage persistence + multi-step form state management",
      "Custom HLS.js integration with adaptive bitrate switching",
      "Role-based auth with separate dashboards and permission layers",
    ],
    lessons: [
      "Video infrastructure is its own engineering discipline",
      "Producers care deeply about the submission experience, every friction point matters",
      "Admin tooling needs to be built with the same care as the consumer-facing product",
    ],
    results: [
      "Full-stack platform built from zero to functional MVP",
      "Automated video processing pipeline handling multi-format transcoding",
      "Producer portal with end-to-end film submission workflow",
      "Admin dashboard with full content management capabilities",
    ],
    links: { live: "/gopremiere", github: null },
  },
  {
    slug: "streaming-infrastructure",
    title: "Streaming Infrastructure",
    tagline: "Production-grade video processing pipeline",
    category: "Backend / Infrastructure",
    year: "2024",
    role: "Backend Engineer",
    status: "In Development",
    featured: false,
    color: "#10B981",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    thumbnail: null,
    tech: [
      "FFmpeg",
      "HLS",
      "AWS S3",
      "Node.js",
      "Docker",
      "Redis",
      "FastAPI",
      "PostgreSQL",
    ],
    overview:
      "The streaming infrastructure behind GoPremiere, an automated pipeline that takes raw film uploads and produces multi-quality HLS streams, downloadable MP4s, and optimized thumbnails.",
    problem:
      "Raw video files uploaded by producers need to be transformed into streaming-ready formats that work across all devices and network conditions. This is non-trivial infrastructure.",
    solution:
      "An automated transcoding pipeline using FFmpeg to generate HLS master playlists with 480p, 720p, and 1080p variants. Subtitle embedding, thumbnail generation, and downloadable MP4 packaging happen as part of the same pipeline.",
    architecture:
      "Files arrive via S3 event triggers or webhook queues. The processing service pulls the raw file, runs FFmpeg with adaptive bitrate settings, uploads the output to S3 with proper content-type headers, and updates the database with the generated URLs. A Redis queue manages job ordering and retry logic.",
    challenges: [
      "FFmpeg command composition for HLS with multiple quality variants",
      "Managing long-running jobs without timeouts",
      "Ensuring atomic database updates only after successful processing",
      "Cost optimization for storage and processing",
    ],
    solutions: [
      "Templated FFmpeg commands with dynamic quality params",
      "Background job queue with heartbeat monitoring",
      "Transaction-wrapped database updates post-processing",
      "S3 lifecycle policies + CDN for cost control",
    ],
    lessons: [
      "Video processing is genuinely hard, FFmpeg alone is a full-time expertise",
      "Queue architecture decisions made early have long-term consequences",
      "Observability is not optional in async processing systems",
    ],
    results: [
      "Multi-quality HLS stream generation (1080p, 720p, 480p)",
      "Master playlist generation for adaptive bitrate streaming",
      "Automated poster and thumbnail processing",
      "Downloadable MP4 packaging per film",
    ],
    links: { live: null, github: null },
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    tagline: "Full-control content operations center",
    category: "Internal Tool / Dashboard",
    year: "2024",
    role: "Full Stack Engineer",
    status: "Live",
    featured: false,
    color: "#F59E0B",
    gradient: "from-amber-500 via-orange-500 to-red-600",
    thumbnail: null,
    tech: ["Next.js", "React", "FastAPI", "PostgreSQL", "Tailwind CSS", "Node.js"],
    overview:
      "A powerful internal admin dashboard for the GoPremiere team to review, approve, reject, and manage all submitted films. Full content moderation, statistics, and producer management capabilities.",
    problem:
      "Content operations at a streaming platform require fast, accurate decision-making. Reviewers need all the information about a film in one place, metadata, files, producer details, and action controls.",
    solution:
      "A clean, dense admin interface built for speed. Each film submission gets a full review page with all metadata, embedded video player, download options, and one-click approve/reject/note actions.",
    architecture:
      "Next.js App Router with server-side data fetching for fast initial loads. Admin actions hit API routes that validate session auth before writing to PostgreSQL. Role-based access control protects all admin routes.",
    challenges: [
      "Designing dense information layouts that remain scannable",
      "Protecting admin routes without slowing down the reviewer workflow",
      "Building flexible filter/search for large film catalogs",
      "Handling bulk operations safely",
    ],
    solutions: [
      "Table-based layouts with expandable row details",
      "JWT session validation middleware on all admin API routes",
      "Server-side filtering with PostgreSQL full-text search",
      "Confirmation dialogs with undo windows for destructive actions",
    ],
    lessons: [
      "Internal tools deserve the same design attention as consumer products",
      "Information density and clarity are not opposites, done right, they complement each other",
      "Admin UX significantly impacts operational speed and error rates",
    ],
    results: [
      "Full film review and moderation workflow",
      "Statistics dashboard with submission metrics",
      "Producer management and communication tooling",
      "Processing status tracking and manual override capabilities",
    ],
    links: { live: "/admin/dashboard", github: null },
  },
  {
    slug: "authentication-system",
    title: "Authentication System",
    tagline: "Secure, role-aware auth for a multi-sided platform",
    category: "Security / Backend",
    year: "2024",
    role: "Backend Engineer",
    status: "Live",
    featured: false,
    color: "#EC4899",
    gradient: "from-pink-500 via-rose-500 to-pink-800",
    thumbnail: null,
    tech: ["NextAuth.js", "JWT", "argon2", "PostgreSQL", "Node.js"],
    overview:
      "A custom authentication system built for GoPremiere's multi-role architecture, supporting producers, admin staff, and future viewer accounts with different permission levels and access scopes.",
    problem:
      "GoPremiere serves three distinct user types with completely different capabilities. A producer should never see another producer's submissions. An admin should have elevated capabilities. Viewers should only see published content.",
    solution:
      "A layered auth system using NextAuth.js at the session level and custom role enforcement at the API level. Password hashing via argon2. Role-based middleware protecting all sensitive routes.",
    architecture:
      "Session tokens stored securely with HTTP-only cookies. API routes validate session server-side before any database query. Role claims included in the JWT payload for fast authorization checks.",
    challenges: [
      "Handling different auth flows for producers vs admins",
      "Ensuring session security without impacting performance",
      "Building a clean auth middleware pattern that scales",
    ],
    solutions: [
      "Separate signin pages with role-specific redirect logic",
      "argon2id password hashing with appropriate cost factors",
      "Reusable auth() helper that wraps all protected routes",
    ],
    lessons: [
      "Auth is not a feature to rush, every shortcut becomes a vulnerability",
      "Role-based access control requires explicit design before writing code",
      "Separating authentication from authorization is always the right call",
    ],
    results: [
      "Secure producer and admin auth flows",
      "Role-based access control across all routes",
      "Session management with automatic expiry",
      "Password hashing with argon2id",
    ],
    links: { live: null, github: null },
  },
 
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const getFeaturedProjects = () => projects.filter((p) => p.featured);