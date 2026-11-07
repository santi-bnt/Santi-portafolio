export type Category = "Software" | "Robotics" | "Embedded" | "Hardware";
export type EvidenceState = "Implemented" | "Tested" | "In progress" | "Planned";
export type ArchitectureNode = { title: string; detail: string; planned?: boolean; branchStart?: boolean };
export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  goal: string;
  status: string;
  featured: boolean;
  technologies: string[];
  categories: Category[];
  githubUrl: string;
  demoUrl?: string;
  websiteUrl?: string;
  images: { src: string; alt: string; caption: string; sourceUrl: string; width?: number; height?: number; kind?: "render" | "photo" | "screenshot" | "diagram" | "illustration" | "reconstruction" }[];
  highlights: string[];
  built: string[];
  architecture: ArchitectureNode[];
  technicalWork: { title: string; description: string }[];
  currentStatus: { state: EvidenceState; description: string }[];
  sources: { label: string; url: string }[];
};

const repo = (name: string) => `https://github.com/santi-bnt/${name}`;
const file = (name: string, path: string) => `${repo(name)}/blob/main/${path}`;

export const projects: Project[] = [
  {
    slug: "internship-radar",
    name: "Internship Radar",
    eyebrow: "Personal full stack software project",
    shortDescription: "An explainable platform for internship discovery, application tracking, and tailored resumes.",
    description: "A personal full stack project that brings opportunity discovery, eligibility analysis, application history, and resume preparation into one workflow. The public repository is a privacy-safe showcase with fictional candidate data; it is not a record of employment.",
    goal: "Make opportunity research and application preparation traceable: where a role came from, why it matches, which requirements are hard gates, and which resume version was used.",
    status: "Active development",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "REST APIs", "LaTeX"],
    categories: ["Software"],
    githubUrl: repo("internship-radar"),
    images: [{ src: "/images/radar-interface.png", alt: "Internship Radar dashboard interface with navigation, pipeline cards, filters, and an empty priority queue in its initial loading state", caption: "Repository UI preview — initial loading state, rendered without backend data or real candidate information.", sourceUrl: file("internship-radar", "frontend/app/page.tsx"), width: 1440, height: 1000, kind: "screenshot" }],
    highlights: ["Official-source discovery with provenance and deduplication.", "Technical-fit scoring separated from eligibility hard gates.", "Application history and immutable LaTeX/PDF resume versions."],
    built: ["Next.js App Router interface backed by a server-side API proxy and FastAPI services.", "Source adapters, normalization, explainable ranking, and persistent opportunity/application records.", "Resume Studio and job-specific tailoring with deterministic validation and PDF output."],
    architecture: [{ title: "Next.js", detail: "Interface · server-side proxy" }, { title: "FastAPI", detail: "Discovery · scoring · resumes" }, { title: "PostgreSQL", detail: "Opportunities · applications · versions" }],
    technicalWork: [
      { title: "Evidence before ranking", description: "Official-source adapters normalize roles and retain provenance. Eligibility gates are evaluated separately from technical fit." },
      { title: "Persistent application lifecycle", description: "Saved, applied, expired, and archived states preserve application context and the exact submitted resume version." },
      { title: "Document generation", description: "Structured tailoring plans feed validated LaTeX output. OpenAI integration is optional; Resume Studio does not require an external AI provider." },
    ],
    currentStatus: [
      { state: "Implemented", description: "Discovery adapters, ranking, application tracking, Resume Studio, persistent storage, and LaTeX/PDF generation are documented in the public source." },
      { state: "Implemented", description: "The public demo mode is read-only. Discovery and document generation require a configured private installation; scheduled automation requires explicit configuration." },
      { state: "In progress", description: "Application-assistant portal support varies. Some adapters are beta or detection-only; final submission remains user-controlled and blocked in the assistant." },
    ],
    sources: [{ label: "README and architecture", url: file("internship-radar", "README.md") }, { label: "Greenhouse discovery implementation", url: file("internship-radar", "backend/app/sources/greenhouse.py") }],
  },
  {
    slug: "cuty",
    name: "C.U.T.Y.",
    eyebrow: "Cute Utility That Yaps · Robotics",
    shortDescription: "An expressive desktop companion connecting voice, vision, and an animated face.",
    description: "C.U.T.Y. combines Raspberry Pi software for conversation, vision, and a touchscreen face with a carrier PCB design for a future STM32 motion layer. The current implementation is strongest on the Raspberry Pi side; physical movement and integrated hardware validation remain in development.",
    goal: "Connect conversational behavior with a readable physical interface while keeping AI, rendering, and future real-time motor control in separate domains.",
    status: "In development",
    featured: true,
    technologies: ["Raspberry Pi 5", "Python", "Gemini Live", "Computer vision", "KiCad", "STM32F401 · target"],
    categories: ["Robotics", "Embedded", "Hardware"],
    githubUrl: repo("C.U.T.Y"),
    websiteUrl: "https://cuty.mx",
    images: [
      { src: "/images/cuty-assembly.jpg", alt: "Repository design render of C.U.T.Y. showing its light enclosure, orange details, screen face, arms, and rounded base", caption: "C.U.T.Y. enclosure design — repository render, not a photograph of a completed robot. Physical assembly and movement remain in development.", sourceUrl: file("C.U.T.Y", "web/public/assembly/poster.jpg"), width: 540, height: 900, kind: "render" },
      { src: "/images/cuty-carrier-top.png", alt: "Top-layer Gerber preview of the C.U.T.Y. carrier PCB with component outlines, pads, and routed traces", caption: "Carrier PCB v1.1 — repository Gerber preview. Fabrication and electrical validation are pending.", sourceUrl: file("C.U.T.Y", "hardware/electronics/kicad/cuty_carrier/fab/preview/cuty_carrier_top.png"), kind: "diagram" },
    ],
    highlights: ["Voice conversation, camera targets, and animated facial expressions.", "Local UDP link for expression state and audio-driven mouth movement.", "KiCad carrier design; STM32 motion firmware and fabrication pending."],
    built: ["Raspberry touchscreen menu, Wi-Fi interface, animated eyes, expressions, and mouth rendering.", "Camera face detection/tracking and voice-to-face state updates over local UDP.", "A two-layer KiCad carrier design with schematic, Gerbers, and BOM for Raspberry Pi 5 and STM32F401 Black Pill."],
    architecture: [{ title: "Raspberry Pi 5", detail: "AI · voice · vision · touchscreen" }, { title: "Local UDP → face", detail: "Expressions · speaking state · pixels" }, { title: "Pi → UART → STM32F401", detail: "Separate future motion / safety branch", planned: true, branchStart: true }, { title: "Servos & IMU", detail: "Physical feedback and movement", planned: true }],
    technicalWork: [
      { title: "A face with separate ownership", description: "Vision produces normalized targets; the face renders pixels. Voice and face processes exchange expressions and speaking levels over local UDP." },
      { title: "Conversation and audio", description: "Gemini supports menu-started hands-free conversation. The keyboard CLI also has optional OpenAI support." },
      { title: "Hardware integration design", description: "The carrier connects compute, display, audio, and future servo control. Native KiCad sources, fabrication outputs, and stored design checks are present; they do not establish electrical validation." },
    ],
    currentStatus: [
      { state: "Implemented", description: "Voice interaction, touchscreen UI, camera-based visual targets, expressions, and audio-driven mouth animation exist in the Raspberry software." },
      { state: "Tested", description: "Repository notes report Pi audio capture/playback and Gemini replies, plus observed screen/touch and camera initialization. These are repository-reported checks, not tests repeated for this portfolio." },
      { state: "In progress", description: "Display stability, end-to-end gaze tracking, and lip-sync timing still require physical validation. PCB design files are available, but fabrication, assembly, and electrical validation are pending." },
      { state: "Planned", description: "UART bridge/protocol implementation, STM32F401 servo/IMU/PID/safety firmware, full robot movement, persistent memory, and integrated mechanical operation." },
    ],
    sources: [{ label: "Current architecture and ownership", url: file("C.U.T.Y", "docs/architecture.md") }, { label: "Face implementation and validation limits", url: file("C.U.T.Y", "docs/face.md") }, { label: "Carrier PCB documentation", url: file("C.U.T.Y", "hardware/electronics/kicad/cuty_carrier/README.md") }],
  },
  {
    slug: "skiliair",
    name: "SkiliAir",
    eyebrow: "Sensor acquisition & connected hardware",
    shortDescription: "A Raspberry Pi air-quality monitor with persistent logging and a live web dashboard.",
    description: "A Raspberry Pi monitoring system linking sensor acquisition, local hardware feedback, a Flask REST API, MySQL history, and Chart.js visualization. The README describes PM2.5/PM10 monitoring; the checked-in implementation exposes a single calculated dust-concentration stream, not separate validated particle-size channels.",
    goal: "Bring sensor readings, historical data, local status, and threshold-driven ventilation into one inspectable system.",
    status: "Prototype implementation",
    featured: true,
    technologies: ["Python", "Raspberry Pi", "Flask", "MySQL", "Chart.js", "I2C", "GPIO"],
    categories: ["Embedded", "Software"],
    githubUrl: repo("raspberrypi-air-quality-monitor"),
    images: [{ src: "/images/skiliair-system.svg", alt: "Illustrated SkiliAir system with airborne dust, an analog sensor and ADC, a generic Raspberry Pi board, LCD, indicator outputs, and a ventilation fan", caption: "System illustration based on the repository: dust acquisition, Raspberry Pi, LCD and ventilation. Generic hardware layout; no specific Pi model or measured readings implied.", sourceUrl: file("raspberrypi-air-quality-monitor", "app.py"), width: 1500, height: 1000, kind: "illustration" }],
    highlights: ["Sensor acquisition through an I2C ADC and Flask data endpoints.", "MySQL reading history and live Chart.js visualization.", "LCD status plus threshold-based LED, buzzer, and fan control."],
    built: ["Python sensor acquisition and dust-concentration calculation using an I2C ADC.", "Flask endpoints for current readings, history, and manual fan/buzzer control.", "MySQL logging threads, a 16×2 LCD driver, and threshold-driven GPIO outputs."],
    architecture: [{ title: "Sensor → I2C ADC", detail: "Voltage and dust acquisition" }, { title: "Raspberry Pi / Flask", detail: "GPIO control · LCD · REST" }, { title: "MySQL + Chart.js", detail: "Historical readings · visualization" }],
    technicalWork: [{ title: "One acquisition path, several outputs", description: "Readings feed local indicators and REST responses. A separate logging loop writes concentration values to MySQL." }, { title: "Local hardware feedback", description: "Threshold logic selects LED state, buzzer activation, and ventilation. API routes allow manual fan and buzzer control." }],
    currentStatus: [{ state: "Implemented", description: "Sensor acquisition, REST routes, MySQL persistence, LCD output, and GPIO threshold logic are present in app.py; the repository includes the dashboard template." }, { state: "In progress", description: "No hardware test report, calibration accuracy, or separate validated PM2.5/PM10 measurements were found. No performance or measurement-accuracy claim is made." }],
    sources: [{ label: "Project README", url: file("raspberrypi-air-quality-monitor", "README.md") }, { label: "Acquisition, API, logging, and GPIO code", url: file("raspberrypi-air-quality-monitor", "app.py") }],
  },
  {
    slug: "dc-motor-control",
    name: "DC Motor Position Control",
    eyebrow: "Real-time embedded control · WebXR interface",
    shortDescription: "Encoder feedback and a 10 ms ESP32 control loop, connected to remote setpoints and telemetry.",
    description: "A DC motor position-control system with a BTS7960 driver, incremental encoder, selectable P/PI/PID firmware, MQTT communication, a web dashboard, and a Quest WebXR client. Control executes locally on ESP32; the interface sends setpoints and observes telemetry.",
    goal: "Keep feedback control local and periodic while making setpoints, controller state, and telemetry accessible from a remote interface.",
    status: "Tuning & validation",
    featured: true,
    technologies: ["C++", "ESP32", "FreeRTOS", "PID", "PWM", "BTS7960", "MQTT", "REST", "WebSockets", "WebXR"],
    categories: ["Embedded", "Hardware", "Robotics"],
    githubUrl: `${repo("Analysis-of-Control-Systems")}/tree/main/Project`,
    images: [{ src: "/images/webxr-motor-interaction.svg", alt: "Reconstructed WebXR motor-control view with a draggable target ball on a minus 180 to plus 180 degree rail, unavailable telemetry fields, Stop Motor and Reset buttons, and a controller ray", caption: "Reconstructed WebXR interaction based on the documented scene. Not a headset screenshot; telemetry is intentionally unavailable.", sourceUrl: file("Analysis-of-Control-Systems", "Project/quest3/src/escena.ts"), width: 1500, height: 1000, kind: "reconstruction" }],
    highlights: ["10 ms FreeRTOS control task with incremental-encoder feedback.", "BTS7960 PWM actuation and selectable P/PI/PID control.", "Remote setpoints, MQTT telemetry, and a WebXR client."],
    built: ["A periodic ESP32 control task with interrupt-based encoder counting and PWM output.", "Selectable P/PI/PID code, conditional integral anti-windup, and bounded output.", "Communication separated from control, with stop behavior on disconnect or expired commands."],
    architecture: [{ title: "Dashboard / WebXR", detail: "Setpoints · REST / WebSockets" }, { title: "API → MQTT → ESP32", detail: "Commands and telemetry" }, { title: "10 ms control loop", detail: "Encoder → controller → BTS7960" }],
    technicalWork: [{ title: "Control timing", description: "A pinned FreeRTOS task uses vTaskDelayUntil for its configured 10 ms period. Encoder updates are protected across interrupt and task contexts." }, { title: "Feedback and actuation", description: "The measured encoder angle closes the loop. PWM magnitude and direction drive the BTS7960; disabled commands clear the integrator and stop the motor." }, { title: "Configuration is part of the result", description: "P is currently enabled. PI/PID implementations exist, but the documented gains came from a different plant and require motor-specific validation. No hard real-time timing guarantee or tuned PID performance is claimed." }],
    currentStatus: [{ state: "Implemented", description: "Local encoder feedback, 10 ms control scheduling, selectable controllers, driver output, remote commands, and telemetry are present in source." }, { state: "In progress", description: "P is the current default. PID gain validation and physical encoder-scale checks remain necessary. Startup defines relative zero; the encoder does not retain absolute position." }],
    sources: [{ label: "Controller configuration and limitations", url: file("Analysis-of-Control-Systems", "Project/ESP32/README.md") }, { label: "FreeRTOS control implementation", url: file("Analysis-of-Control-Systems", "Project/ESP32/src/ControlPosicion.cpp") }, { label: "Dashboard and API", url: file("Analysis-of-Control-Systems", "Project/ESP_Web_page/README.md") }],
  },
  {
    slug: "fpga-digital-design", name: "FPGA Digital Design & Simulation", eyebrow: "RTL & verification",
    shortDescription: "Verilog modules, UART communication, testbenches, and accelerometer-based digital designs.",
    description: "A collection of digital-design coursework with combinational and sequential logic, finite state machines, UART, PWM, VGA, and accelerometer integration targeting Intel MAX 10 / DE10-Lite.",
    goal: "Connect RTL design with simulation and FPGA-oriented system integration.", status: "Source & simulation artifacts", featured: false,
    technologies: ["Verilog", "FPGA", "Intel MAX 10", "UART", "Testbench simulation"], categories: ["Hardware", "Embedded"], githubUrl: repo("Verilog"),
    images: [
      { src: "/images/fpga-de10-lite-concept.webp", alt: "Stylized illustration of a blue DE10-Lite FPGA board with a MAX 10 chip, GPIO and expansion headers, six displays, switches, and USB and VGA connectors", caption: "Stylized DE10-Lite / MAX 10 illustration based on the Terasic reference. Not an exact pinout or a photograph of the project.", sourceUrl: "https://www.terasic.com.cn/attachment/archive/1021/image/DE10-Lite_layout_top.jpg", width: 1500, height: 1000, kind: "illustration" },
      { src: "/images/de10-lite-reference.jpg", alt: "Terasic manufacturer reference image of the blue DE10-Lite FPGA board with its MAX 10 chip, switches, displays, and expansion connectors", caption: "DE10-Lite / MAX 10 — manufacturer reference image from Terasic. Not a photo of this project's physical setup.", sourceUrl: "https://www.terasic.com.cn/attachment/archive/1021/image/DE10-Lite_layout_top.jpg", width: 1200, height: 806, kind: "photo" },
    ],
    highlights: ["UART TX/RX modules and simulation testbench.", "FSM, PWM, VGA, and accelerometer integration exercises."],
    built: ["Combinational/sequential modules, top-level wrappers, and simulation testbenches.", "UART transmitter/receiver with asynchronous input synchronization.", "Accelerometer-oriented integration with PWM and display logic."],
    architecture: [{ title: "Verilog RTL", detail: "Logic · FSM · UART" }, { title: "Testbench", detail: "Stimulus · waveforms" }, { title: "MAX 10 target", detail: "Quartus projects · board wrappers" }],
    technicalWork: [{ title: "UART at RTL level", description: "Separate TX/RX state machines implement serial framing. The receive path includes a two-stage synchronizer, and a loopback testbench sends example bytes." }],
    currentStatus: [{ state: "Implemented", description: "RTL, testbenches, waveform artifacts, and FPGA project files exist. The UART documentation describes simulation; those simulations were not rerun for this portfolio." }, { state: "In progress", description: "Repository artifacts do not establish complete physical validation of every FPGA design or an assembled accelerometer-controlled robotic arm." }],
    sources: [{ label: "Repository overview", url: file("Verilog", "README.md") }, { label: "UART design and simulation", url: file("Verilog", "Practices/Practice_6_UART/README.md") }],
  },
  {
    slug: "tic-cat-toe", name: "Tic-Cat-Toe Cartesian Robot", eyebrow: "Meta Quest & physical interaction",
    shortDescription: "A Meta Quest game connected to a two-axis Cartesian machine over BLE and UART.",
    description: "A team Cartesian robot and Meta Quest game connecting ESP32-S3 game/axis control with an ESP32 X-axis controller. The repository credits upstream Quest application work; this portfolio does not claim sole authorship of the game or its assets.",
    goal: "Connect mixed-reality player input with a physical machine, position feedback, and sensor-based game decisions.", status: "Integration & calibration", featured: false,
    technologies: ["C++", "Arduino", "ESP32", "ESP32-S3", "BLE", "UART", "PID"], categories: ["Robotics", "Embedded"], githubUrl: `${repo("Analysis-of-Control-Systems")}/tree/main/game`,
    images: [{ src: "/images/tic-cat-toe-vr.svg", alt: "Concept reconstruction of a Meta Quest tic-tac-toe interaction showing a virtual board, a schematic Cartesian carriage, a target cell and a controller ray", caption: "VR interaction reconstruction based on the repository. Game state and machine geometry are illustrative, not a screenshot or photograph of the actual setup.", sourceUrl: file("Analysis-of-Control-Systems", "game/README.md"), width: 1500, height: 1000, kind: "reconstruction" }],
    highlights: ["BLE input and state exchange with ESP32-S3.", "UART axis coordination, encoder feedback, and homing firmware."],
    built: ["Current Arduino firmware for both axes, with UART coordination and homing.", "BLE game state/command protocol and LDR cell detection.", "Encoder-based PID control adapted to Cartesian positions."],
    architecture: [{ title: "Meta Quest", detail: "Player input and game state" }, { title: "BLE → ESP32-S3", detail: "Game · Y axis · LDRs" }, { title: "UART → ESP32", detail: "X axis · encoder feedback" }],
    technicalWork: [{ title: "Two control domains", description: "The ESP32-S3 coordinates gameplay and the Y axis. The ESP32 controls X; checksummed UART lines exchange setpoints, telemetry, and homing state." }],
    currentStatus: [{ state: "Implemented", description: "The repository contains Quest integration, BLE/UART protocols, encoder control, and current homing firmware. An older non-homing firmware variant is retained separately." }, { state: "In progress", description: "The README flags geometry and PID values for physical calibration, including a third-row coordinate beyond the configured Y travel. Complete physical validation is not asserted." }],
    sources: [{ label: "System, calibration limits, and upstream credits", url: file("Analysis-of-Control-Systems", "game/README.md") }],
  },
  {
    slug: "matt", name: "MATT Writing Robot", eyebrow: "Web-controlled embedded prototype",
    shortDescription: "A web-to-hardware command path using Firebase, ESP32, UART, and FRDM-KL25Z.",
    description: "An educational team prototype for whiteboard interaction. Its source connects a web command layer and Firebase to ESP32 firmware and a FRDM-KL25Z controller over UART.",
    goal: "Coordinate a remote interface, wireless communication, and low-level writing-robot control across microcontrollers.", status: "Prototype in development", featured: false,
    technologies: ["C", "C++", "ESP32", "FRDM-KL25Z", "UART", "Firebase"], categories: ["Robotics", "Embedded", "Software"], githubUrl: repo("-MATT-"),
    images: [
      { src: "/images/matt-system-illustration.svg", alt: "Illustration of MATT writing an unfinished M in the center of a whiteboard. Blue brackets and points mark earlier HELLO and ABC lettering and a diagram; the camera observer scans the active letter and sends a conceptual target command.", caption: "Illustrative reconstruction from the owner's photos and sketch. Lettering, recognition overlays, scan and target-command flow are conceptual; not evidence of completed vision integration.", sourceUrl: file("-MATT-", "README.md"), width: 1500, height: 1000, kind: "illustration" },
      { src: "/images/matt-interface.png", alt: "MATT Robot Writer web control interface with writing commands, a command queue, and board controls; no Firebase or robot connection", caption: "Repository web interface — static preview with Firebase and robot disconnected.", sourceUrl: file("-MATT-", "HTTML/index.html"), width: 1440, height: 1000, kind: "screenshot" },
    ],
    highlights: ["Firebase command handling on ESP32.", "UART acknowledgments, status messages, and cancellation handling."],
    built: ["ESP32 modules for connectivity, Firebase commands, robot actions, and display status.", "UART command formatting and reply parsing for the KL25Z interface."],
    architecture: [{ title: "Web / Firebase", detail: "Commands and status" }, { title: "ESP32", detail: "Wireless bridge" }, { title: "UART → FRDM-KL25Z", detail: "Embedded actuation layer" }],
    technicalWork: [{ title: "Command lifecycle", description: "UART code handles completion/status messages, timeouts, cancellation, and safe text normalization before forwarding commands." }],
    currentStatus: [{ state: "Implemented", description: "ESP32/Firebase and UART communication modules are present. The README identifies a functional educational prototype under development." }, { state: "Planned", description: "More accurate trajectories, improved localization, and full vision-based movement correction are listed as future improvements; no autonomous writing-accuracy claim is made." }],
    sources: [{ label: "Prototype overview and future work", url: file("-MATT-", "README.md") }, { label: "UART command handling", url: file("-MATT-", "ESP32/src/KL25ZSerial.cpp") }],
  },
];
