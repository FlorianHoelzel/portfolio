import { mkdir, writeFile } from 'node:fs/promises';

const repositories = [];
for (let page = 1; ; page++) {
  const response = await fetch(`https://api.github.com/users/FlorianHoelzel/repos?per_page=100&page=${page}&sort=updated`, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}. Try again later if rate limited.`);
  const batch = await response.json();
  repositories.push(...batch.map(({ name, description, language, html_url, homepage, fork, archived }) => ({ name, description, language, html_url, homepage, fork, archived })));
  if (batch.length < 100) break;
}
const directory = new URL('../src/data/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('github-repositories.json', directory), JSON.stringify(repositories, null, 2) + '\n');
console.log(`Saved ${repositories.length} public repositories. Review portfolio.ts to curate displayed projects.`);
