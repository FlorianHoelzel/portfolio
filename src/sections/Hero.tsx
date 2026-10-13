import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <span className="eyebrow">Developer / Personal projects</span>
      <h1 id="hero-heading">Florian Hoelzel</h1>
      <p className="hero-intro">{profile.intro}</p>
      <div className="hero-links">
        <a href="#work">Browse projects <span>↓</span></a>
        <ExternalLink href={profile.github}>github.com/FlorianHoelzel <ArrowUpRight size={15} /></ExternalLink>
      </div>
      <div className="hero-topics"><span>Smart home</span><span>Public transport</span><span>Speedrunning</span></div>
    </section>
  );
}
