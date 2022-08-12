// mapping all color codes for labels
const colorCodes = {
    bug: '#ee0701',
    closed: '#74edc7',
    discussion: '#ed7c2b',
    documentation: '#2b4bed',
    duplicate: '#35eff2',
    enhancement: '#84b6eb',
    "good-first-issue": '#622bed',
    "help-wanted": '#0e8a16',
    invalid: '#d9ed42',
    question: '#cc317c',
    unlabeled: '#555555',
    "wont-fix": '#bbc7be',
}

// displaying all issues
const displayAllIssues = async (data, issueContainer) => {
    const { issues } = data;
    const { count } = data;

    // if no issue show No Issue listed
    if (count === 0) {
        issueContainer.innerHTML = `<h3 class="text text-secondary">No issues listed</h3>`;
        return;
    }

    // getting author of the project
    let authorId = localStorage.getItem('authorId');

    const allIssues = issues.map((issue) => {
        const { title } = issue;
        const { description } = issue;
        const { label } = issue;
        const { user: { name: creator, _id: creatorId } } = issue;

        // failsafe for label
        let badgeBg;
        if (!label) {
            badgeBg = 'cyan'
        } else {
            badgeBg = colorCodes[label];
        }

        // mark only author with bg-warning
        let creatorBg = '';
        if (authorId === creatorId) {
            creatorBg = 'bg-warning';
        }

        // creating issue card template
        return `
        <div class="m-2 px-4 py-2 border rounded bg-light">
            <div class="d-flex justify-content-between">
                <h5>${title}</h5>
                <h6 class="badge text-black" style="background-color:${badgeBg}"><i class="fa-solid fa-tag"></i> ${label}</h6>
            </div>
            <h6 class="d-inline px-1 rounded ${creatorBg}">
                ${creator}
            </h6>
           
            <p class="p-1">${description}</p>
        </div>`;
    }).join('');

    // attaching all issues to issue container
    issueContainer.innerHTML = allIssues;


}


export default displayAllIssues;