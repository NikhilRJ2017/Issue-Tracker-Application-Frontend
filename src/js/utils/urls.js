//************************* Auth urls **************************/
export const registerUrl = "http://localhost:5000/api/v1/auth/register";
export const signInUrl = "http://localhost:5000/api/v1/auth/login";
export const logoutUrl = "http://localhost:5000/api/v1/auth/logout";


//************************* User urls *************************/
export const getCurrentUserUrl = "http://localhost:5000/api/v1/user/current_user";
export const updateUserDetailsUrl = "http://localhost:5000/api/v1/user/update_user";
export const updateUserPasswordUrl = "http://localhost:5000/api/v1/user/update_user_password";


//************************* Project urls *************************/
export const getAllProjectsUrl = "http://localhost:5000/api/v1/project";
export const createProjectUrl = "http://localhost:5000/api/v1/project";
export const closeProjectUrl = "http://localhost:5000/api/v1/project/close_project"


//************************* Issues urls **************************/
export const getAllIssuesBaseUrl = "http://localhost:5000/api/v1/issue";
export const createIssueUrl = "http://localhost:5000/api/v1/issue";
export const getAllLabels = "http://localhost:5000/api/v1/issue/get_labels";


//******************************* Replace all above local api links with deployed backend api links ****************************/