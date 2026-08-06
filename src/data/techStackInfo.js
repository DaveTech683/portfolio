// data/techStackInfo.js
//
// Central registry describing what each technology in `project.tech` actually
// *does* on that project. ProjectDetail.jsx uses this to auto-group a
// project's stack into layers (Frontend, Backend, Data & Storage,
// Cache & Queue, Cloud & Infrastructure, Security & Auth, Specialized) and
// to explain the role each piece plays, instead of just listing bare names.
//
// Add an entry here any time a new technology shows up in data/projects.js,
// unmapped tech still renders (see FALLBACK below), just without a tailored
// description.

export const LAYERS = {
  frontend: { label: "Frontend", order: 0 },
  backend: { label: "Backend / API", order: 1 },
  data: { label: "Data & Storage", order: 2 },
  cache: { label: "Cache & Queues", order: 3 },
  cloud: { label: "Cloud & Infrastructure", order: 4 },
  security: { label: "Security & Auth", order: 5 },
  specialized: { label: "Specialized / Hardware", order: 6 },
};

export const techStackInfo = {
  "Next.js": {
    layer: "frontend", 
    role: "Server-rendered React framework powering the customer-facing pages, handles routing, image optimization, and fast, SEO-friendly page loads.",
  },
  "React": {
    layer: "frontend",
    role: "Component-based UI library that renders the interactive interface and manages client-side state.",
  },
  "React Native": {
    layer: "frontend",
    role: "Cross-platform framework that renders native iOS and Android screens from a single JavaScript codebase.",
  },
  "Tailwind CSS": {
    layer: "frontend",
    role: "Utility-first styling system used to build the visual design directly in markup, keeping styles consistent and fast to iterate on.",
  },
  "React Hook Form": {
    layer: "frontend",
    role: "Form-state library that manages multi-step form data, validation, and re-renders without extra boilerplate.",
  },
  "Django": {
    layer: "backend",
    role: "Python web framework handling business logic, the data models, and REST endpoints, with a built-in admin for internal operations.",
  },
  "FastAPI": {
    layer: "backend",
    role: "High-performance, async-first Python framework serving the REST API layer that the client apps consume.",
  },
  "Node.js": {
    layer: "backend",
    role: "JavaScript runtime powering API routes and server-side logic shared with the rest of the stack.",
  },
  "Python": {
    layer: "backend",
    role: "General-purpose language running the core application and integration logic.",
  },
  "PostgreSQL": {
    layer: "data",
    role: "Primary relational database of record, stores structured, relational data with strong consistency guarantees.",
  },
  "MySQL": {
    layer: "data",
    role: "Relational database storing user and event records, indexed for fast lookups.",
  },
  "Redis": {
    layer: "cache",
    role: "In-memory store used for background job queues, caching, and low-latency key-based lookups.",
  },
  "AWS S3": {
    layer: "cloud",
    role: "Object storage for uploaded media and static assets, accessed through presigned URLs to keep large uploads off the app server.",
  },
  "Docker": {
    layer: "cloud",
    role: "Containerization that packages services so they run consistently across development and production environments.",
  },
  "FFmpeg": {
    layer: "cloud",
    role: "Video transcoding engine that converts raw uploads into multiple streaming-ready quality levels.",
  },
  "HLS Streaming": {
    layer: "cloud",
    role: "Adaptive-bitrate streaming protocol that delivers video at the right quality for each viewer's connection.",
  },
  "NextAuth.js": {
    layer: "security",
    role: "Session and authentication layer managing sign-in flows, session cookies, and token issuance.",
  },
  "JWT": {
    layer: "security",
    role: "Signed tokens carrying session and role claims, used for fast, stateless authorization checks on every request.",
  },
  "argon2": {
    layer: "security",
    role: "Password hashing algorithm (argon2id) protecting stored credentials against offline cracking.",
  },
  "ACR Smart Card Reader (PC/SC)": {
    layer: "specialized",
    role: "Physical smart-card reader, integrated over the PC/SC standard, that resolves a card's unique ID on every tap.",
  },
};

export const FALLBACK = {
  layer: "specialized",
  role: "Part of the technical stack supporting this project.",
};

export function getTechInfo(name) {
  return techStackInfo[name] || FALLBACK;
}

// Groups a project's `tech` array into layer buckets, in a stable display
// order, skipping any layer that has nothing in it.
export function groupTechByLayer(tech = []) {
  const buckets = {};
  tech.forEach((name) => {
    const info = getTechInfo(name);
    if (!buckets[info.layer]) buckets[info.layer] = [];
    buckets[info.layer].push({ name, role: info.role });
  });

  return Object.entries(buckets)
    .sort(([a], [b]) => LAYERS[a].order - LAYERS[b].order)
    .map(([key, items]) => ({
      key,
      label: LAYERS[key].label,
      items,
    }));
}