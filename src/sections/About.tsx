export function About() {
  return (
    <section id="about" className="about-section container" aria-labelledby="about-heading">
      <h2 id="about-heading">About</h2>
      <div className="about-copy">
        <p>I write software around my interests: connecting devices to Apple Home, working with public transport data, and building tools for speedrunning.</p>
        <p>Most of those projects are open source. The repositories include the code and documentation if you want to take a closer look.</p>
        <dl className="toolbox"><dt>Languages</dt><dd>Python, JavaScript, TypeScript, C#</dd><dt>Working with</dt><dd>HomeKit, REST APIs, data visualization</dd></dl>
      </div>
    </section>
  );
}
