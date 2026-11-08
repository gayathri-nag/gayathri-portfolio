/* Dynamic GitHub project loader with graceful fallback */
const GITHUB_USERNAME = "gayathri-nag";
const projectContainer = document.getElementById("github-projects");
const fallback = document.getElementById("projects-fallback");

async function fetchGitHubRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if(!res.ok) throw new Error('GitHub API error: ' + res.status);
    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      fallback.style.display = "block";
      return;
    }
    repos.forEach(repo => {
      const el = document.createElement('div');
      el.className = 'project-card';
      el.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
        <p class="muted">${repo.description ? repo.description : 'No description provided.'}</p>
        <div class="project-meta"><strong>Language:</strong> ${repo.language || 'N/A'} · ⭐ ${repo.stargazers_count} · Forks: ${repo.forks_count}</div>
        <div style="margin-top:8px;"><a class="btn outline" href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a></div>
      `;
      projectContainer.appendChild(el);
    });
  } catch (err) {
    console.error(err);
    fallback.style.display = "block";
    fallback.textContent = "Unable to load projects from GitHub right now.";
  }
}

fetchGitHubRepos();