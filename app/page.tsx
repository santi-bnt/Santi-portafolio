import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { CertificationsSection, ContactSection, EducationSection, SkillsSection } from "@/components/profile-sections";

export default function Home() {
  return <main id="main-content"><Hero/><ProjectsSection/><SkillsSection/><EducationSection/><CertificationsSection/><ContactSection/></main>;
}
