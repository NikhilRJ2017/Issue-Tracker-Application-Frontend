// importing all essentials
import { getAllProjectsUrl } from "../utils/urls.js";
import displayProjectDetails from "./display_project_details.js";
import get from "../utils/getElement.js";
import axios from "../utils/axios.js";
import closeProject from "./close_project.js";

// getting all essentials
const projectDetailsContainer = get('.project-details-container');
const projectFetchError = get('.project-fetch-error');
const createIssueBtn = get('.create-issue-btn');

// show single project details
const showProjectDetails = async (projectId) => { 
    try {
        
        // setting project id to be used by close project
        localStorage.setItem('projectId', projectId);
        // resetting error message
        projectFetchError.textContent = '';

        const singleProjectUrl = `${getAllProjectsUrl}/${projectId}`;

        // getting single project 
        const response = await axios(singleProjectUrl);
        const data = response.data;

        // display single project details
        displayProjectDetails(data, projectDetailsContainer, createIssueBtn);
    } catch (error) {
        if (error.response.status === 404) {
            projectFetchError.textContent = "No project found"
        }

        if (error.response.status === 403) {
            projectFetchError.textContent = "Unauthorized to access this resource"
        }

        console.log(error);
    }
}

// listening to close project btn and form
projectDetailsContainer.addEventListener('click', (e) => { 
    if (e.target.classList.contains('close-project-btn')) { 
        const closeProjectForm = get('.close-project-form');

        closeProjectForm.addEventListener('submit', closeProjectFormHelper)
    }
})

// close project event handler
function closeProjectFormHelper(e) {
    e.preventDefault();
    closeProject();
}

export default showProjectDetails;