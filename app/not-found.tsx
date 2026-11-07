import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="container not-found"><p className="eyebrow">404 / Page not found</p><h1>This route doesn’t connect.</h1><p>The project may have moved. Explore the current portfolio below.</p><Link className="button primary" href="/#projects">View Projects →</Link></main>;
}
