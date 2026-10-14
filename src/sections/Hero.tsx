import { profile } from '../data/portfolio';
import { AsciiCloud } from '../features/hero/AsciiCloud';
import { HeroEntrance } from '../features/hero/HeroEntrance';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <AsciiCloud reducedMotion={reducedMotion} />
      <h1 id="hero-heading">{profile.name}</h1>
      <HeroEntrance reducedMotion={reducedMotion} />
      <p className="hero-intro">{profile.intro}</p>
    </section>
  );
}
