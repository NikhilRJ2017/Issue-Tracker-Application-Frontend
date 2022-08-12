// importing essentials
import { getCurrentUserUrl, getAllProjectsUrl } from '../js/utils/urls.js';
import get from '../js/utils/getElement.js';
import axios from '../js/utils/axios.js';
import createProject from './project/create_project.js';
import fetchAllProjects from './project/fetch_all_projects.js';

// getting essentials
const createProjectForm = get('.create-project-form');
const projectsContainer = get('.project-container');
const searchbar = get('.searchbar-project');
const projectStatusCheckBox = get('.closed-project-checkbox');
const userName = get('.current-user-name');


// variables
let searchValue = '';
let projectStatus = false;

// initialize
const start = async () => {
    try {
        // getting current user
        const response = await axios.get(getCurrentUserUrl);
        const data = response.data;
        const { user: { name } } = data;
        userName.textContent = name;

        // fetching all available projects
        fetchAllProjectsHelper();
    } catch (error) {

        if (error.code === 'ERR_NETWORK') {
            window.document.body.innerHTML = `<div class="text-center"><h2 class="text-danger">Network Error, please reload or try again after some time</h2></div>`
        }

        // if no user, then redirect to login
        if (error.response.status === 401) {
            //Todo: change once deployed
            window.location.replace("http://localhost:5500")
        }

        console.log(error);

    }
}

// fetch all projects helper
async function fetchAllProjectsHelper() {
    searchValue = '';
    fetchAllProjects(searchValue, projectStatus);
}

// listening to view project button
projectsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('view-project')) {
        const projectID = e.target.dataset.projectid;
        window.location.href = `/src/html/project.html?id=${projectID}`
    }
});

// create project helper
function createProjectHelper(e) {
    e.preventDefault();
    createProject(createProjectForm);
}

// searchbar event helper
function searchHandlerHelper(e) {
    searchValue = e.target.value;
    fetchAllProjects(searchValue, projectStatus);
}

// project status event helper
function projectStatusCheckBoxHandler(e) {
    projectStatus = e.target.checked;
    fetchAllProjects(searchValue, projectStatus);
    console.log(projectStatus);
}

// listening to various form and button clicks
createProjectForm.addEventListener('submit', createProjectHelper);
searchbar.addEventListener('input', searchHandlerHelper);
projectStatusCheckBox.addEventListener('change', projectStatusCheckBoxHandler)

// init home page once content is loaded
window.addEventListener('DOMContentLoaded', async () => {

    //*initialize the home page
    start();

});


// *check for internet connection
window.addEventListener("online", function () {
    this.document.body.innerHTML = '';
    this.window.location.reload();
});

window.addEventListener("offline", function () {
    // alert("Oops! You are offline now!");
    this.document.body.innerHTML = `<div class="text-center"><h1 class="text-danger">Opps! No Internet</h1></div>`
});