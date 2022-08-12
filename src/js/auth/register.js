// importing all essentials
import get from "../utils/getElement.js";
import { registerUrl } from "../utils/urls.js"
import axios from "../utils/axios.js";

//getting all essentials
const name = get('.register-form-name')
const email = get('.register-form-email');
const password = get('.register-form-password');
const registerForm = get('.register-form')
const registerErrorMessage = get('.register-form-error-message');
const signInModal = new bootstrap.Modal(get('#signInModal'), {});

// registering the new user
const register = async (e) => {
    e.preventDefault();
    
    // setting load message
    registerErrorMessage.innerHTML = `<h6 class="text text-primary">Registering .......</h6>`;
    try {
        const body = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        
        // posting new user 
        const data = await axios.post(registerUrl, body);

        if (data.status !== 201) {
           
        } else {
            registerErrorMessage.innerHTML = `<h6 class="text text-primary">Registered</h6>`;
            signInModal.show();
            registerErrorMessage.innerHTML = ``;
        }

       
    } catch (error) {
        if (error.response.status === 400) {
            registerErrorMessage.textContent = error.response.data.message;
        }
    }
}

// listening to register form submit
registerForm.addEventListener('submit', register);

export default register;