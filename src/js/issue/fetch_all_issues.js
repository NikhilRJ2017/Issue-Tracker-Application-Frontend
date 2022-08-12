// importing all essentails
import { getAllIssuesBaseUrl } from "../utils/urls.js";
import displayAllIssues from "./display_all_issues.js";
import get from "../utils/getElement.js";
import axios from "../utils/axios.js";

// getting all essentails
const mainProjectContainer = get('.main-project-container');
const issueContainer = get('.issue-container');

// fetching all issues for given project id
const fetchAllIssues = async (projectId, searchValue, filterValue) => { 
    try {
        // if no project, then can't show issues
        if (!projectId) {
            mainProjectContainer.innerHTML = `<h1 class="text-danger">No Project Selected</h1>`
            throw new Error("No project selected")
        }

        let url = `${getAllIssuesBaseUrl}/${projectId}`;
         // fetching based on issue title 
        if (searchValue !== '') {
             url = `${url}?title=${searchValue}`;
        }

        // fetching based on filter values
        if (filterValue !== '') {
            if (searchValue === '') {
                url = `${url}?label=${filterValue}`;
            } else {
                url = `${url}&label=${filterValue}`;
            }
        }
        // getting all issues
        const response = await axios(url);
        const data = response.data;
        
        // display all issues
        displayAllIssues(data, issueContainer);
    } catch (error) {
        console.log(error);
    }
}

export default fetchAllIssues;