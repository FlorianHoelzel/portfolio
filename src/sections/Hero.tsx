import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';
import { AsciiCloud } from '../components/AsciiCloud';
import { HeroEntrance } from '../components/HeroEntrance';
import { useCloudMotion } from '../hooks/useCloudMotion';

export function Hero() {
  const { reducedMotion } = useCloudMotion();
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <AsciiCloud reducedMotion={reducedMotion} />
      <h1 id="hero-heading">Florian Hölzel</h1>
      <HeroEntrance reducedMotion={reducedMotion} />
      <p className="hero-intro">{profile.intro}</p>
      <div className="hero-links">
        <a href="#work">Browse projects <ArrowDown size={14} /></a>
        <ExternalLink href={profile.github}>github.com/FlorianHoelzel <ArrowUpRight size={15} /></ExternalLink>
      </div>
    </section>
  );
}
