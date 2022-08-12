// importing all essentials
import get from "../utils/getElement.js";
import { createIssueUrl } from "../utils/urls.js";
import fetchAllIssues from "./fetch_all_issues.js";
import axios from "../utils/axios.js";

// getting all essentials
const issueTitle = get('.create-issue-title');
const issueDescription = get('.create-issue-description');
const issueLabel = get('.create-issue-label');
const createIssueError = get('.create-issue-error-message');
const createIssueModal = new bootstrap.Modal(get('#createIssueModal'), {});

// creating issue
const createIssue = async (projectId) => { 

    // setting loading info
    createIssueError.innerHTML = `<h6 class="text text-primary">Creating an issue.......</h6>`
    try {
        const issue = {
            title: issueTitle.value,
            description: issueDescription.value,
            label: issueLabel.value
        };

        let url = `${createIssueUrl}/${projectId}`

        // posting new issue
        const response = await axios.post(url, issue);
        const data = response.data;

        // fetch all issues to make newly added issue visible
        fetchAllIssues(projectId, '', [].join(''));

        //clearing create issue form's input field
        clearAllFields();

        //hiding create issue modal
        createIssueModal.hide();
        createIssueError.innerHTML = ``

    } catch (error) {
        if (error.response.status === 400) {
            createIssueError.textContent = error.response.data.message;
        }

        if (error.response.status === 401) {
            window.location.reload();
        }
        // console.log(error);
    }
    

}

function clearAllFields() {
    issueTitle.value = "";
    issueDescription.value = "";
    issueLabel.value = "default";
}


export default createIssue;