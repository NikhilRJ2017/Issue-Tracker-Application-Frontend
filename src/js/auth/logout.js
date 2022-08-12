// importing all essentials
import get from "../utils/getElement.js";
import { logoutUrl } from "../utils/urls.js";
import axios from "../utils/axios.js";

// getting all essentials
const logoutBtn = get('.logout');

// logging out the user
const logout = async () => { 
    try {

        // getting user logged out
        const data = await axios.get(logoutUrl);

        // resetting all localStorages
        if (data.status === 200) {
            localStorage.setItem('name', "")
            localStorage.setItem('id', "")
            localStorage.setItem('status', "loggedOut");
            localStorage.setItem('authorId', "");
            localStorage.setItem('projectId', "");

            // redirecting to login/register page
            //Todo: change while deployment
            window.location.replace('http://localhost:5500');
        }
        
    } catch (error) {
        throw new Error(error)
    }
}

// listening to logout button
logoutBtn.addEventListener('click', logout);
