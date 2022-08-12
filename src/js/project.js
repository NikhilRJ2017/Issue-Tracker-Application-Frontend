// importing essentials
import { getCurrentUserUrl, getAllIssuesBaseUrl, getAllLabels } from "./utils/urls.js";
import showProjectDetails from "./issue/show_project_details.js";
import fetchAllIssues from "./issue/fetch_all_issues.js";
import createIssue from "./issue/create_issue.js";
import get from "./utils/getElement.js";
import axios from "./utils/axios.js";

// getting essentials
const createIssueForm = get('.create-issue-form');
const createIssueFormLabels = get('.create-issue-label');
const userName = get('.current-user-name');
const allLabelsContainer = get('.all-labels');
const searchBar = get('.searchbar-issue');

// variables
let searchValue = '';
let filterValue = [];

// initialize
const start = async () => {
    try {
        const response = await axios.get(getCurrentUserUrl);
        const data = response.data;
        const { user: { name } } = data;
        userName.textContent = name;

        // fetch all issue helper
        fetchAllIssuesHelper(searchValue, filterValue.join(','));

        //showing selected project details
        showProjectDetails(getProjectID());

        //filling all filter labels
        fillLabels();
    } catch (error) {
        if (error.code === 'ERR_NETWORK') {
            window.document.body.innerHTML = `<div class="text-center"><h2 class="text-danger">Network Error, please reload or try again after some time</h2></div>`
        }
        
        // if no user, then redirect to login
        if (error.response.status === 401) {
            //Todo: change once deployed
            window.location.replace("http://localhost:5500")
        }
    }
}

// fetching all issues for selected project
function fetchAllIssuesHelper(searchValue, filterValue) {
    fetchAllIssues(getProjectID(), searchValue, filterValue);
}

// create issue event handler
function createIssueHelper(e) {
    e.preventDefault();
    createIssue(getProjectID());
}

// getting selected project id from the query param
function getProjectID() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// searchbar event handler 
function searchBarHandler(e) {
    searchValue = e.target.value;
    fetchAllIssuesHelper(searchValue, filterValue.join(','));
    console.log(searchValue);
}

// multiple label selector
function labelCheckBoxHandler(e) {
    if (e.target.checked) {
        filterValue.push(e.target.value);
    } else if(!e.target.checked) {
        filterValue = filterValue.filter((uncheckedBox) => {
            return uncheckedBox !== e.target.value;
        });
    }
}

// filter btn event handler
function filterBtnHandler(e) {
    if (e.target.classList.contains('filter-btn')) {
        let filterValueHelper = [...filterValue];
        filterValueHelper = filterValueHelper.join(',');
        console.log("Filter btn clicked :", "Filter value helper :",filterValueHelper, "filtervalue :", filterValue);
        fetchAllIssuesHelper(searchValue, filterValueHelper);
        filterValueHelper = [];
    }
}

// filling all labels for filter
async function fillLabels() {
    try {
        const response = await axios.get(getAllLabels);
        const data = response.data;
        diaplayAllLabels(data);
        displayLabelsInCreateIssueForm(data)
        //!log
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// displaying all filled labels
function diaplayAllLabels(data) {
    const { labels } = data;

    const allLabels = labels.map((label) => {
        return `
            <li>
                <div class="form-checkbox">
                    <input class="form-check-input" type="checkbox" value="${label}" id="checkbox-${label}">
                    <label for="checkbox-${label}">${label}</label>
                </div>
            </li>
            <li><hr class="dropdown-divider"></li>
        `
    });

    allLabels.push(`<div class="text-center"><button class="btn btn-sm filter-btn" style="background: #34eba8">Filter</button><div>`);

    allLabelsContainer.innerHTML = allLabels.join('');
}

// displaying all labels in create issue form
function displayLabelsInCreateIssueForm(data) {
    const { labels } = data;
    const allLabels = labels.map((label, index) => { 
        if (index === 0) {
            return `<option value="${label}" selected>Default (${label})</option>`
        } else {
            return `
            <option value="${label}">${label}</option>
            `
        }
    })


    createIssueFormLabels.innerHTML = allLabels;
}

// listening to various events such as button clicks, search bar input change and check box selection
createIssueForm.addEventListener('submit', createIssueHelper);
searchBar.addEventListener('input', searchBarHandler);
allLabelsContainer.addEventListener('change', labelCheckBoxHandler)
allLabelsContainer.addEventListener('click', filterBtnHandler);

// init project page once event is loaded
window.addEventListener('DOMContentLoaded', async () => {
    start();
});

// *check for internet connection
window.addEventListener("online", function() {
    this.document.body.innerHTML = '';
    this.window.location.reload();
});

window.addEventListener("offline", function () {
    // alert("Oops! You are offline now!");
    this.document.body.innerHTML = `<div class="text-center"><h1 class="text-danger">Opps! No Internet</h1></div>`
});