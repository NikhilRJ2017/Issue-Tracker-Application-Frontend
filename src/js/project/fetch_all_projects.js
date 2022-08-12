// importing all essentials
import { getAllProjectsUrl } from "../utils/urls.js";
import displayAllProjects from "./display_all_projects.js";
import displayProjectsCount from "./display_project_count.js";
import get from "../utils/getElement.js";

// getting all essentials
const totalProjects = get('.project-count')
const projectsContainer = get('.project-container');
const projectFetchStatus = get('.project-fetch-status');

// fetching all available projects
const fetchAllProjects = async (searchValue, projectStatus) => {

    // setting up load message
    projectFetchStatus.textContent = 'Projects Fetching.....';
    projectFetchStatus.classList.add('text-primary');
    try {
        let url;
        // fetching based on name 
        if (searchValue === '') {
            url = getAllProjectsUrl;
        } else {
            url = `${getAllProjectsUrl}?name=${searchValue}`;
        }

        // fetching based on project status
        if (projectStatus) {
            if (searchValue === '') {
                url = `${url}?status=closed`;
            } else {
                url = `${url}&status=closed`;
            }
        }
        // getting all projects
        const response = await axios.get(url);
        const { data } = response;
        const { count } = data;

        // displaying all projects
        displayProjectsCount(count, totalProjects);
        // displaying all project count
        displayAllProjects(data, projectsContainer);
        projectFetchStatus.textContent = '';
    } catch (error) {
        projectFetchStatus.textContent = 'Projects Fetch Failed';
        projectFetchStatus.classList.add('text-danger');
        // console.log(error);
    }
}


export default fetchAllProjects;