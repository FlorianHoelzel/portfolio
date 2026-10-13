import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';
import { AsciiCloud } from '../components/AsciiCloud';
import { HeroEntrance } from '../components/HeroEntrance';
import { useCloudMotion } from '../hooks/useCloudMotion';

export function Hero() {
  const { paused, reducedMotion, toggle } = useCloudMotion();
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <AsciiCloud paused={paused} reducedMotion={reducedMotion} onToggle={toggle} />
      <h1 id="hero-heading">Florian</h1>
      <HeroEntrance paused={paused} reducedMotion={reducedMotion} />
      <p className="hero-intro">{profile.intro}</p>
      <div className="hero-links">
        <a href="#work">Browse projects <ArrowDown size={14} /></a>
        <ExternalLink href={profile.github}>github.com/FlorianHoelzel <ArrowUpRight size={15} /></ExternalLink>
      </div>
    </section>
  );
}
