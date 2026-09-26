/// <reference types="nativewind/types" />

// TypeScript 6 rejects a side-effect import of a file it has no declaration for, and
// `app/_layout.tsx` imports `global.css` so Metro pulls the Tailwind output into the bundle.
declare module '*.css';
