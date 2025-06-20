"use strict"


// const elements = {
//     quote: document.getElementById("quote"),
//     author: document.getElementById("author"),
// };

async function getRecentRepos() {
    const response = 
        await fetch('https://api.github.com/users/ChristopherKaelin/repos', {
            headers: {
                'Authorization': 'token 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'
            }
        });

    const data  = await response.json();
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



                // <div class="project-item"> 
                //     <div class="project-title">
                //         Build A Quiz
                //     </div>
                //     <div class="project-link"> 
                //         <a href="https://github.com/ChristopherKaelin/udemy-course-build-a-quiz-app/blob/main/index.html" 
                //             target="_blank">
                //             Repo Link
                //             <span class="project-url">- https://github.com/ChristopherKaelin/udemy-course-build-a-quiz-app/blob/main/index.html</span>
                //         </a>
                //     </div>
                //     <div class="project-update">
                //         Updated: 2023-10-01
                //     </div>
                //     <div class="project-description">
                //         I built this Quiz app by going through the FREE Udemy course titled "Build a Quiz App with 
                //         HTML, CSS, and JavaScript", making some small modifications along the way. The course 
                //         offers a lot of great resources for learning how to build web apps. The project uses the 
                //         Open Trivia DB api library.
                //     </div>
                // </div>
