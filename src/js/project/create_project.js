// importing the essentials
import axios from "../utils/axios.js";
import { createProjectUrl } from "../utils/urls.js";
import fetchAllProjects from "./fetch_all_projects.js";
import get from "../utils/getElement.js";

// getting essentials
const projectName = get('.create-project-name');
const projectDescription = get('.create-project-description');
const createProjectModal = new bootstrap.Modal(get('#createProjectModal'), {});
const createProjectError = get('.create-project-error-message');

// variables
let searchValue = '';
let projectStatus = false;

// creating new project
const createProject = async (createProjectForm) => {
    
    //setting laoding message
    createProjectError.innerHTML = `<h6 class="text text-primary">Creating project.......</h6>`
    
    try {
        searchValue = '';
        const project = {
            name: projectName.value,
            description: projectDescription.value
        }

        //posting new project
        const response = await axios.post(createProjectUrl, project);
        const data = response.data;

        //hiding create project modal
        createProjectModal.hide();
        
        //fetching all project to reflect newly added porject
        fetchAllProjects(searchValue, projectStatus);

        //clearing create issue form's input fields
        clearAllFields();

        createProjectError.innerHTML = ``
    } catch (error) {
        if (error.response.status === 400) {
            createProjectError.textContent = error.response.data.message;
        }

        if (error.response.status === 401) {
            window.location.reload();
        }
        // console.log(error);
    }

}

function clearAllFields() {
    projectName.value = "";
    projectDescription.value = "";
}

export default createProject;