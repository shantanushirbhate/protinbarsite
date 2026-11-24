# ONE PROTEIN — reference-inspired landing page

A responsive React + Material UI landing page with a React Three Fiber 3D hero, Framer Motion scroll reveals, a scroll progress indicator, zigzag section dividers, flavour cards, newsletter UI, and a bold chocolate/orange/cream palette.

## Run it

```bash
npm install
npm run dev
```

## Included stack

- React + Vite
- Material UI
- Three.js + React Three Fiber + Drei
- Framer Motion
- Lucide React

## Images

The demo uses externally hosted product/ingredient photography as temporary visual references. These are not ONE PROTEIN brand assets and may depict other brands. Replace them with your own licensed product packshots before production. The image URLs are centralized in `src/App.jsx` under `photos`.

## 3D model

`src/components/ProteinScene.jsx` creates a stylized procedural protein-bar wrapper in Three.js. It is not a scan or exact replica of physical packaging. Replace its colors/textures with approved packaging artwork when available.

## Font

The page imports Anton, Barlow Condensed, and DM Sans from Google Fonts. The 3D wrapper uses Drei Text's default font unless you add a local font asset; this keeps the scene from failing when a font file is missing.
# protinbarsite
