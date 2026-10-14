import { Github } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';

export function Contact() {
  return (
    <section id="contact" className="contact-section container" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Elsewhere</h2>
      <div><ExternalLink href={profile.github}>GitHub <Github size={17} aria-hidden="true" /></ExternalLink><p>For questions about a project, open an issue in its repository.</p></div>
    </section>
  );
}
