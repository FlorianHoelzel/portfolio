import { ArrowDown, ArrowUpRight, Braces, Github } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';

export function Hero() {
  return <section className="hero container" aria-labelledby="hero-heading">
    <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="status-dot" /> {profile.tagline}<span className="hero-eyebrow-line" /></div>
      <h1 id="hero-heading">A curious mind.<br />A builder<span className="serif"> at heart.</span><span className="hero-period">*</span></h1>
      <div className="hero-bottom"><div><p className="hero-intro">Hey, I’m <strong>{profile.name}</strong>. {profile.intro}</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDown size={17} /></a><ExternalLink href={profile.github} className="button button-text"><Github size={18} /> GitHub <ArrowUpRight size={15} /></ExternalLink></div></div>
        <div className="code-sculpture" aria-hidden="true"><div className="sculpture-orbit" /><span className="sculpture-bracket">{'{'}</span><span className="sculpture-star">✳</span><span className="sculpture-bracket">{'}'}</span><span className="sculpture-caption"><Braces size={12} /> IDEAS → CODE → REAL LIFE</span></div>
      </div>
    </div>
    <div className="hero-footer"><span><i /> Independently built. Openly shared.</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div>
  </section>;
}
