import { ArrowUpRight, Braces, House, Route, Timer } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ExternalLink } from '../components/ExternalLink';

const interests = [{ icon: House, title: 'A more connected home', text: 'Local-first dashboards and bridges that bring everyday devices into Apple Home.' }, { icon: Route, title: 'Making movement visible', text: 'Live transport data turned into useful maps and clearer departures.' }, { icon: Timer, title: 'The next personal best', text: 'Leaderboards, run histories, and tools for the speedrunning community.' }];

export function About() {
  return <section id="about" className="about-section container" aria-labelledby="about-heading">
    <div className="about-copy"><span className="eyebrow">02 / THE PERSON BEHIND THE CODE</span><h2 id="about-heading">Hi, I’m Florian<span className="accent">.</span><br /><span className="serif">I like making things work.</span></h2><p>My projects connect software with everyday interests: a home that works together, a clearer view of public transport, and a record of every hard-earned personal best.</p><p>This is my little corner of the internet. A collection of things I’ve built, explored, and shared along the way.</p><ExternalLink href={profile.github} className="inline-link">More of what I’m building <ArrowUpRight size={17} /></ExternalLink></div>
    <div className="interests">{interests.map(({ icon: Icon, title, text }, i) => <div className="interest" key={title}><span className="interest-icon"><Icon size={22} /></span><div><span className="interest-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div></div>)}</div>
    <div className="toolbox"><span><Braces size={19} /> Across my repositories</span><div>{['TypeScript', 'JavaScript', 'Python', 'C#', 'HomeKit', 'REST APIs'].map(tool => <span key={tool}>{tool}</span>)}</div></div>
  </section>;
}
