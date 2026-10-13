import { useState } from 'react';
import { ArrowUpRight, Github, Menu, X } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from './ExternalLink';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="wordmark" aria-label="Florian, home">fh<span>/</span></a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
        <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight size={13} /></a>
          <ExternalLink href={profile.github} className="nav-github"><Github size={17} /> GitHub</ExternalLink>
        </nav>
      </div>
    </header>
  );
}
