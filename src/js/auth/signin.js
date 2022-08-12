// importing all essentials
import get from "../utils/getElement.js";
import { signInUrl } from "../utils/urls.js";
import axios from "../utils/axios.js";

// getting all essentials
const email = get('.signin-form-email');
const password = get('.signin-form-password');
const signInForm = get('.signin-form');
const signInErrorMessage = get('.signin-form-error-message');

// signing the user
const signIn = async (e) => {
    e.preventDefault();
    // setting load message
    signInErrorMessage.innerHTML = `<h6 class="text text-primary">Signing In .......</h6>`
    
    try {
        const body = {
            email: email.value,
            password: password.value
        }
        // getting sign in
        const data = await axios.post(signInUrl, body);

        // if signing in success
        if (data.status === 200) {

            // getting response data
            const { user: { name: userName, userId } } = data.data;
            // storing response data in local storage for future access
            localStorage.setItem('name', userName);
            localStorage.setItem('id', userId);
            localStorage.setItem('status', 'loggedIn');

            //  redirecting to home page once logged in
            window.location.href = "/src/html/home.html"
        }
    } catch (error) {

        // Bad request errors
        if (error.response.status === 400) {
            signInErrorMessage.textContent = error.response.data.message;
        }

        // Invalid credentials errors
        if (error.response.status === 401) {
            signInErrorMessage.textContent = error.response.data.message;
        }

        // console.log(error);
    }
}

// event listener for sign in form
signInForm.addEventListener('submit', signIn);