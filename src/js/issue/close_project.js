// importing all essentails
import get from "../utils/getElement.js";
import axios from "../utils/axios.js";
import { closeProjectUrl } from "../utils/urls.js";
import showProjectDetails from "./show_project_details.js";

// getting all essentails
const projectName = get('.close-project-name');
const userPassword = get('.close-project-password');
const closeProjectErrorMessage = get('.close-project-form-error-message');
const closeProjectModal = new bootstrap.Modal(get('#closeProjectModal'), {});

// closing project
const closeProject = async () => {
    try {
        // resetting error message
        closeProjectErrorMessage.textContent = '';

        //getting project id from localStorage
        const projectId = localStorage.getItem('projectId');
        //error if no project is available
        if (!projectId) {
            closeProjectErrorMessage.textContent = `Cannot close project, something went wrong, please refresh the page`;
            return;
        }
        const project = {
            name: projectName.value,
            password: userPassword.value
        }
        const url = `${closeProjectUrl}/${projectId}`;
        // posting close request
        const response = await axios.patch(url, project);
        const data = response.data;

        //hiding close project modal
        closeProjectModal.hide();
        
        //showing updated project
        showProjectDetails(projectId);

        // clearing close project form's input fields 
        clearCloseProjectFormFields()
    } catch (error) {
        if (error.response.status === 400 || error.response.status === 404) {
            closeProjectErrorMessage.textContent = error.response.data.message;
        }
        // console.log(error);
    }
}


function clearCloseProjectFormFields() {
    projectName.value = "";
    userPassword.value = "";
}

export default closeProject;