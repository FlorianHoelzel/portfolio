import { ArrowUpRight, Github } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';

export function Contact() {
  return <section id="contact" className="contact-section container" aria-labelledby="contact-heading"><span className="eyebrow">03 / KEEP THE CONVERSATION GOING</span><div className="contact-main"><h2 id="contact-heading">Good things start<br />with <span className="serif">a little curiosity.</span></h2><ExternalLink href={profile.github} className="contact-arrow" aria-label="Visit Florian on GitHub"><ArrowUpRight /></ExternalLink></div><div className="contact-bottom"><p>Explore a project, open an issue, or build on an idea.<br />You’ll find me and my code on GitHub.</p><ExternalLink href={profile.github} className="button button-primary"><Github size={17} /> Find me on GitHub <ArrowUpRight size={16} /></ExternalLink></div></section>;
}
