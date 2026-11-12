export const profile = {
  name: "Santiago Benavent Valenzuela",
  title: "Robotics and Digital Systems Engineering Student",
  hero: "Connecting software to the physical world.",
  introduction: "I build across software, embedded systems, robotics, and AI — from opportunity-discovery platforms to expressive robots and feedback control.",
  about: "I study Robotics and Digital Systems Engineering at Tecnológico de Monterrey. My projects connect software with physical systems: acquiring sensor data, building backend services, implementing feedback control, and developing interfaces for people to interact with hardware. I’m interested in the engineering work between those layers — and in making each part understandable, testable, and useful.",
  university: "Tecnológico de Monterrey",
  degree: "B.S. in Robotics and Digital Systems Engineering",
  graduation: "June 2028",
  github: "https://github.com/santi-bnt",
  linkedin: "https://www.linkedin.com/in/santiago-benavent",
  // Publish only after the owner confirms a real professional address.
  email: null as string | null,
  // Add a verified GENERAL CV to public/, then set its root-relative URL.
  resumeUrl: null as string | null,
};

export const skills = [
  { category: "Programming", items: ["Python", "C++", "C", "TypeScript", "JavaScript", "Verilog"] },
  { category: "Software & data", items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Flask", "REST APIs", "Supabase", "PostgreSQL", "MySQL"] },
  { category: "Embedded systems", items: ["Raspberry Pi", "ESP32", "ESP32-S3", "Arduino", "FRDM-KL25Z", "FreeRTOS", "Linux"] },
  { category: "Hardware & digital design", items: ["FPGA", "Intel MAX 10", "KiCad", "Digital logic", "Testbench simulation"] },
  { category: "Communication & control", items: ["UART", "BLE", "MQTT", "WebSockets", "PID", "PWM", "I2C"] },
  { category: "AI & interfaces", items: ["Gemini Live", "OpenAI API", "Computer vision", "Chart.js", "WebXR"] },
];

type Certification = { name: string; issuer: string; evidenceUrl: string; enabled: boolean };
// No certification artifacts exist in this checkout or the reviewed source material.
export const certifications: Certification[] = [];
export const honors: { name: string; enabled: boolean }[] = [];
