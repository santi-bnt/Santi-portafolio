# Content sources and evidence boundaries

Project content is maintained in `data/projects.ts`. Sources are linked on each
detail page. Repository implementations can evolve; review the current source
before changing a claim.

Profile details and public links are maintained in `data/profile.ts`.
Unverified optional credentials and contact fields are omitted.

## Internship Radar

Sources: [README](https://github.com/santi-bnt/internship-radar/blob/main/README.md),
[Greenhouse adapter](https://github.com/santi-bnt/internship-radar/blob/main/backend/app/sources/greenhouse.py),
frontend components, and backend documentation.

A personal full stack project, with Next.js/TypeScript, FastAPI/Python,
PostgreSQL, source adapters, persistent tracking, and resume generation.
Discovery and generation depend on a configured installation. Public demo mode
is read-only. Fictional candidate data is not personal profile evidence.
The portfolio does not claim a verified public application demo or rerun source
application tests.

## C.U.T.Y.

Sources: [README](https://github.com/santi-bnt/C.U.T.Y/blob/main/README.md),
[architecture](https://github.com/santi-bnt/C.U.T.Y/blob/main/docs/architecture.md),
[face notes](https://github.com/santi-bnt/C.U.T.Y/blob/main/docs/face.md),
[carrier documentation](https://github.com/santi-bnt/C.U.T.Y/blob/main/hardware/electronics/kicad/cuty_carrier/README.md).

Raspberry-side voice, vision targets, UI, expressions, and UDP lip-sync signaling
are implemented. Repository-reported checks are distinguished from portfolio
testing. Integrated gaze, timing, display stability, and physical operation still
require validation.

STM32F401 is the documented target. UART motion integration and motion firmware
are planned. PCB design artifacts do not establish fabrication or electrical
validation. Mechanical design renders do not establish a finished robot.

## SkiliAir

Sources: [README](https://github.com/santi-bnt/raspberrypi-air-quality-monitor/blob/main/README.md),
[app.py](https://github.com/santi-bnt/raspberrypi-air-quality-monitor/blob/main/app.py).

Code provides Flask, I2C acquisition, MySQL logging, LCD output, and threshold
logic. Chart.js is documented. The README mentions PM2.5/PM10, while the code
derives one dust value from one ADC channel. No independent particle-size
validation, calibration accuracy, or performance metric is asserted.

## DC Motor Position Control

Sources: [ESP32 README](https://github.com/santi-bnt/Analysis-of-Control-Systems/blob/main/Project/ESP32/README.md),
[control code](https://github.com/santi-bnt/Analysis-of-Control-Systems/blob/main/Project/ESP32/src/ControlPosicion.cpp),
[web interface](https://github.com/santi-bnt/Analysis-of-Control-Systems/blob/main/Project/ESP_Web_page/README.md),
[WebXR](https://github.com/santi-bnt/Analysis-of-Control-Systems/blob/main/Project/quest3/README.md).

A 10 ms FreeRTOS task, encoder feedback, PWM bounds, and control branches are
implemented. P control is enabled; PI/PID gains and encoder scaling need
validation for the actual motor. No tuned response or certified timing claim
is made.

## satzivo

Sources: [README](https://github.com/santi-bnt/satzivo/blob/main/README.md),
[package manifest](https://github.com/santi-bnt/satzivo/blob/main/package.json),
[study API](https://github.com/santi-bnt/satzivo/blob/main/server/cloud/study.js),
[authentication](https://github.com/santi-bnt/satzivo/blob/main/server/cloud/authenticate.js),
[RLS migration](https://github.com/santi-bnt/satzivo/blob/main/supabase/migrations/202611080001_initial_private_data.sql),
[dictionary inventory](https://github.com/santi-bnt/satzivo/blob/main/reports/dictionary-coverage.json),
and [verification report](https://github.com/santi-bnt/satzivo/blob/main/docs/verification.md).

The React/TypeScript entry point loads the A2 application. Express/Node.js serves
study routes; verified access tokens and PostgreSQL RLS scope user data.
The dictionary audit records 301 entries, with partial local coverage and an
attributed external fallback. This is separate from the smaller curated initial
flashcard set. AI writing feedback and transcription depend on configuration;
fallback checklists are indicative, not official scores. Physical mobile/audio
checks and independent linguistic review remain outstanding in source docs.

The deployed public page returned HTTP 200 and its sign-in screen during review.
No account was created and no authenticated learner data was accessed. Source
verification reports are attributed, not presented as tests rerun for this site.
The architecture artwork is not an application screenshot. The corrected source
repository is `santi-bnt/satzivo`; the older `Satzora` URL is not used.

## Additional projects

- [FPGA](https://github.com/santi-bnt/Verilog): RTL, UART, simulation artifacts,
  accelerometer work, and MAX 10 targets. No claim that every design was
  physically implemented or that simulations were rerun for this portfolio.
- [Tic-Cat-Toe](https://github.com/santi-bnt/Analysis-of-Control-Systems/tree/main/game):
  homing, feedback control, and communication work. Calibration limitations,
  team contribution, and credited upstream Quest work remain explicit.
- [MATT](https://github.com/santi-bnt/-MATT-): ESP32/Firebase and UART handling.
  Vision correction, localization, and trajectory improvements remain future
  work. Illustrative scan and recognition overlays are not implementation
  evidence.

Image origins and reconstruction limits are recorded in
[image provenance](../public/images/README.md).
