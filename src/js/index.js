// importing essentials
import { getCurrentUserUrl } from "./utils/urls.js";
import axios from "./utils/axios.js";


// initialization
const start = async () => {
    try {
        const cookie = document.cookie
        const storedUserId = localStorage.getItem('id');
        const status = localStorage.getItem('status');

        // checking if user is logged in, if yes then redirect to home page, if not login/register the user
        const data = await axios.get(getCurrentUserUrl);
        const { user: { userId } } = data.data;
        //*check if user exists
        if (userId === storedUserId && status === 'loggedIn' && cookie) {
            //Todo: change once deployed
            window.location.replace('http://localhost:5500/src/html/home.html');
        }
    } catch (error) {
        if (error.response.status === 401) {

        }

        if (error.code === 'ERR_NETWORK') {
            window.document.body.innerHTML = `<div class="text-center"><h2 class="text-danger">Network Error, please reload or try again after some time</h2></div>`
        }

    }
}

// init the app once content is loaded; 
//DOMContentLoaded event fires when initials HTML document has been completely loaded and parsed without waiting for stylesheets, images etc to finish loading unlike load event
window.addEventListener("DOMContentLoaded", async () => {
    start();
})


// *check for internet connection
window.addEventListener("online", function() {
    this.document.body.innerHTML = '';
    this.window.location.reload();
});

window.addEventListener("offline", function () {
    // alert("Oops! You are offline now!");
    this.document.body.innerHTML = `<div class="text-center"><h1 class="text-danger">Opps! No Internet</h1></div>`
});
