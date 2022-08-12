// importing all essentials
import axios from "../utils/axios.js";
import { getCurrentUserUrl } from "../utils/urls.js";


// variables
let showCloseProjectButton;


// displaying single project details
const displayProjectDetails = async (projectData, projectDetailsContainer, createIssueBtn) => {

    showCloseProjectButton = '';
    const { project } = projectData;

    const { name: projectName } = project;
    const { numOfIssues } = project;
    const { description } = project;
    const { status } = project;
    const { user: { name: author, _id: authorId } } = project;
    const { createdAt } = project;

    // getting project creation date
    const getDate = createdAt.slice(0, 10);
    const publishedDate = new Date(getDate).toDateString();
    
     
    // changing title of the page
    document.title = projectName;

    // disabling create issue btn if project status is closed
    let closedProjectBadge = ``;
    if (status === 'closed') {
        createIssueBtn.disabled = true;
        closedProjectBadge = `<h6 class="badge text-bg-secondary">${status}</h6>`
    }
    
    // display close project button only if the user logged in is the author of the project
    const userId = await checkForCurrentUser()
    if (status === 'open' && userId === authorId) {
        showCloseProjectButton = `<button class="btn btn-danger text-black fw-bold btn-outline-secondary close-project-btn" 
        data-bs-toggle="modal" data-bs-target="#closeProjectModal">Close Project</button>`
    }

    // setting author id to be used in display all issues
    localStorage.setItem('authorId', authorId);

    console.log(userId, authorId, userId===authorId);

    // constructing project details template
    const singleProject = `
            <div>
                <div class="d-flex flex-row justify-content-between">
                    <h1>${projectName} </h1><span>${closedProjectBadge}</span>
                    ${showCloseProjectButton}
                </div>
                <h5>Author: ${author}</h5>
                <p class="mb-4">${description}</p>
                <h6 class="text-muted">Published: ${publishedDate}</h6>
                <h6 class="text-muted">Total Issues: <strong class="text-black">${numOfIssues}</strong></h6>
            </div>`;

    // attaching project detail card to project detail container
    projectDetailsContainer.innerHTML = singleProject;

}

// checking for current user
async function checkForCurrentUser() {
    try {
        const response = await axios.get(getCurrentUserUrl);
        const data = response.data
        const { user: { userId } } = data;
        return userId;
    } catch (error) {
        console.log(error);
    }
}


export default displayProjectDetails;