// displaying all fetched projects 
const displayAllProjects = (data, projectsContainer) => { 
    const { projects } = data;

    const allProjects = projects.map((project) => {

        // destructing all the data
        const { user: { name: author } } = project;
        const { name: projectName } = project;
        const { status } = project;
        const { description } = project;
        const { numOfIssues } = project;
        const { _id } = project;

        // change the bg of badge if project is closed
        let badgeTextClass = "text-bg-success";
        if (status === 'closed') {
            badgeTextClass = "text-bg-secondary";
        }

        // creating project card template
        return ` 
        <div class="col">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="card-title card-text-project-name">${projectName}</h4>
                    <h6 class="badge ${badgeTextClass}">${status}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Author: ${author}</h6>
                    <p class="card-text card-text-project-desc">${description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm  btn-warning view-project" data-projectid="${_id}">View Project</button>
                        </div>
                        <small class="text-muted">Total Issues: ${numOfIssues}</small>
                    </div>
                </div>
            </div>
        </div>`
    }).join('');

    // attaching all project cards to project container
    projectsContainer.innerHTML = allProjects;
}

export default displayAllProjects;