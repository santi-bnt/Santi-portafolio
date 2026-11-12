# Image provenance

Only assets used by the portfolio are retained here. Captions and alt text are
maintained in `data/projects.ts`. Illustrations and design renders do not
establish hardware completion or validation.

## Repository design assets

### C.U.T.Y.

- `cuty-assembly.jpg`: unchanged enclosure/assembly design render from
  [the C.U.T.Y. repository](https://github.com/santi-bnt/C.U.T.Y/blob/main/web/public/assembly/poster.jpg).
  It is not a prototype photograph.
- `cuty-carrier-top.png`: unchanged
  [Gerber design preview](https://github.com/santi-bnt/C.U.T.Y/blob/main/hardware/electronics/kicad/cuty_carrier/fab/preview/cuty_carrier_top.png).
  It is not evidence of fabrication, assembly, or electrical validation.

### FPGA reference

- `de10-lite-reference.jpg`: unchanged
  [Terasic DE10-Lite manufacturer image](https://www.terasic.com.cn/attachment/archive/1021/image/DE10-Lite_layout_top.jpg).
  A reference board, not a photograph of the project's setup.
- `fpga-de10-lite-concept.webp`: generated stylized illustration based on that
  image. Not an exact pinout, running design, or endorsement.
  [Tool and prompt record](../../docs/illustration-prompts.md).

## Interface previews

### Internship Radar

`radar-interface.png` uses the source Dashboard/AppShell components and original
CSS in their initial loading state, rendered without backend data, authentication,
candidate records, or replacement metrics.

Sources:
[Dashboard](https://github.com/santi-bnt/internship-radar/blob/main/frontend/app/page.tsx),
[AppShell](https://github.com/santi-bnt/internship-radar/blob/main/frontend/components/AppShell.tsx),
[Navigation](https://github.com/santi-bnt/internship-radar/blob/main/frontend/components/Navigation.tsx),
[CSS](https://github.com/santi-bnt/internship-radar/blob/main/frontend/app/globals.css).

It is a source-interface preview, not a live production screenshot.

### MATT

`matt-interface.png` captures the unchanged
[repository HTML/CSS](https://github.com/santi-bnt/-MATT-/blob/main/HTTML/index.html)
at 1440 × 1000 with JavaScript disabled and network requests blocked.
Firebase, robot hardware, and camera were disconnected. Decorative artwork
belongs to the interface source and is not a physical robot photograph.

## Hand-authored SVG illustrations

- `satzivo-system.svg`: an architecture and learning-domain illustration based on
  the [satzivo README](https://github.com/santi-bnt/satzivo/blob/main/README.md),
  React/TypeScript frontend, Express study routes, and Supabase RLS migration.
  German/Spanish/English text is illustrative. No dashboard metrics, learner
  records, official certification, or authenticated product screenshot is implied.
- `skiliair-system.svg`: generic Raspberry Pi, analog dust acquisition, ADC/I2C,
  LCD, local outputs, and ventilation. Based on the
  [README](https://github.com/santi-bnt/raspberrypi-air-quality-monitor/blob/main/README.md)
  and [code](https://github.com/santi-bnt/raspberrypi-air-quality-monitor/blob/main/app.py).
  No exact Pi model, sensor part, calibration, or fabricated reading is asserted.
- `webxr-motor-interaction.svg`: reconstructed controller interaction based on
  [WebXR source](https://github.com/santi-bnt/Analysis-of-Control-Systems/blob/main/Project/quest3/src/escena.ts)
  and its documentation. Not a headset screenshot; unavailable telemetry is
  shown as dashes.
- `tic-cat-toe-vr.svg`: reconstructed board, controller ray, and Cartesian
  interaction based on the
  [game documentation](https://github.com/santi-bnt/Analysis-of-Control-Systems/blob/main/game/README.md).
  Geometry and displayed game state are illustrative; they do not establish
  calibration or sole authorship.
- `matt-system-illustration.svg`: writer and camera observer based on the
  project owner's prototype photos and layout sketch. The lid and eraser follow
  the owner's description. Earlier writing, the unfinished letter, scan,
  recognition points, and target-command flow are conceptual artwork.
  They are not evidence of working OCR, localization, or completed vision
  integration. No stereo camera specification is inferred. The scan respects
  reduced motion. [Project source](https://github.com/santi-bnt/-MATT-).

Local capture helpers, original reference photos, and intermediate artwork stay
outside tracked source. No stock photographs or unrelated project images are
used.
