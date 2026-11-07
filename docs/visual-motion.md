# Motion and accessibility

## Visual system

Dark mode uses navy backgrounds (`#050A14`, `#07111F`, `#0A1628`) with blue
highlights and restrained cyan accents. Light mode uses pale surfaces with the
same accent system. Tokens and responsive styles live in `app/globals.css`.

## Behavior

- A short typographic startup curtain precedes the staggered hero entrance.
  Pointer, wheel, touch, Tab, and Escape dismiss it.
- Navbar translucency and a thin progress indicator respond to scrolling.
- IntersectionObserver progressively reveals content.
- Internship Radar and C.U.T.Y. use desktop sticky story stages.
- Cards, buttons, and route entrances use short transform/opacity transitions.
- Selected large previews have bounded parallax; reading text does not.
- The MATT SVG includes a conceptual scan line and static recognition overlays.

Motion uses CSS and lightweight browser APIs. No animation or 3D engine is
required.

## Fallbacks

Reduced motion skips the startup curtain and complex sticky/parallax behavior,
keeps revealed content readable, and freezes the SVG scan. Mobile layouts use a
simpler reading sequence. Hash navigation bypasses the intro, and primary
content remains available without JavaScript.

Semantic sections, visible keyboard focus, alt text, explicit evidence labels,
and theme contrast support accessibility. See the browser tests for the
specific behaviors checked.
