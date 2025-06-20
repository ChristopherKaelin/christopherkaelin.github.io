"use strict"


// const elements = {
//     quote: document.getElementById("quote"),
//     author: document.getElementById("author"),
// };

async function getRecentRepos() {
    const response = await fetch('https://api.github.com/users/ChristopherKaelin/repos');

    // Check if the response is ok
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data  = await response.json();

    // Check if data is an array before trying to sort
    if (!Array.isArray(data)) {
        console.error('Expected array but got:', typeof data);
        return []; // Return empty array as fallback
    }

    return data
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 5);
    }


async function displayRepos() {
    const top5Repos = await getRecentRepos();
    
    // Loop through the repos
    top5Repos.forEach(repo => {
        // Create a new div for each repo
        const repoDiv = document.createElement('div');
        repoDiv.className = 'project-item';
        repoDiv.innerHTML = `
            <div class="project-title">${repo.name}</div>
            <div class="project-link">
                <a href="${repo.html_url}" target="_blank">
                    Repo Link
                    <span class="project-url">- ${repo.html_url}</span>
                </a>
            </div>
            <div class="project-update">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</div>
            <div class="project-description">${repo.description || 'No description available.'}</div>
        `;
        // Append the new div to the container
        const projectsList = document.getElementById('projects-list');
        if (!projectsList) {
            console.error('Projects list container not found.');
            return;
        }
        projectsList.appendChild(repoDiv);

        console.log(repoDiv);
    });
}

displayRepos();

