import { ArrowUp, Github } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from './ExternalLink';

export function Footer() {
  return <footer className="footer container"><span>© {new Date().getFullYear()} Florian Hoelzel</span><div><ExternalLink href={profile.github}>GitHub <Github size={13} aria-hidden="true" /></ExternalLink><a href="#top">Back to top <ArrowUp size={13} /></a></div></footer>;
}
