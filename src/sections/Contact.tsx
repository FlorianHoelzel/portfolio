import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';

export function Contact() {
  return (
    <section id="contact" className="contact-section container" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Elsewhere</h2>
      <div><ExternalLink href={profile.github}>GitHub <ArrowUpRight size={17} /></ExternalLink><p>For questions about a project, open an issue in its repository.</p></div>
    </section>
  );
}
