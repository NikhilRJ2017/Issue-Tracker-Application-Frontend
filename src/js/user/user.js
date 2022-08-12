// importing all essentials
import { updateUserDetailsUrl, updateUserPasswordUrl } from "../utils/urls.js";
import get from "../utils/getElement.js";
import axios from "../utils/axios.js";

// getting all essentials
const updateUserDetails = get('.update_user_details')
const updateUserPassword = get('.update_user_password')
const updateUserDetailsForm = get('.update-user-details-form')
const updateUserPasswordForm = get('.update-user-password-form');

const updateUserDetailsEmail = get('.update-user-details-form-email')
const updateUserDetailsName = get('.update-user-details-form-name');

const updateUserPasswordOldPassword = get('.update-user-password-form-old-password');
const updateUserPasswordNewPassword = get('.update-user-password-form-new-password');

const updateUserDetailsModal = new bootstrap.Modal(get('#UpdateUserDetailsModal'), {});
const updateUserPasswordModal = new bootstrap.Modal(get('#UpdateUserPasswordModal'), {});

const updateUserDetailsErrorMessage = get('.update-user-details-form-error-message');
const updateUserPasswordErrorMessage = get('.update-user-password-form-error-message');

// registering form submission events for update-user-details and update-user-password forms
function updateUserDetailsHandler(e) {
    updateUserDetailsForm.addEventListener('submit', updateUserDetailsFormHandler)
}
function updateUserPasswordHandler(e) {
    updateUserPasswordForm.addEventListener('submit', updateUserPasswordFormHandler)
}

// event handlers
async function updateUserDetailsFormHandler(e) {
    e.preventDefault()
    try {
        updateUserDetailsErrorMessage.textContent = ''
        const user = {
            name: updateUserDetailsName.value,
            email: updateUserDetailsEmail.value,
        }

        // sending the new details
        const response = await axios.patch(updateUserDetailsUrl, user);
        const data = response.data;

        // updating localStorages
        storeUpdatedDataToLocal(data);
        // hiding modal
        updateUserDetailsModal.hide();
        // clearing input fields
        clearFields();
        // reloading the page
        window.location.reload();

    } catch (error) {

        if (error.response.status === 400) {
            updateUserDetailsErrorMessage.textContent = error.response.data.message;
        }

        if (error.response.status === 401) {
            window.location.reload();
        }
        // console.log(error);
    }
}



async function updateUserPasswordFormHandler(e) {
    e.preventDefault()
    try {
        updateUserPasswordErrorMessage.textContent = '';
        const passwords = {
            oldPassword: updateUserPasswordOldPassword.value,
            newPassword: updateUserPasswordNewPassword.value,
        }

        // sending the new details
        const response = await axios.patch(updateUserPasswordUrl, passwords);
        const data = response.data;
        // hiding modal
        updateUserPasswordModal.hide();
        // clearing input fields
        clearFields();
        // reloading the page
        window.location.reload();

    } catch (error) {

        if (error.response.status === 400) {
            updateUserPasswordErrorMessage.textContent = error.response.data.message;
        }

        if (error.response.status === 401) {
            window.location.reload();
        }
        // console.log(error);
    }

}

// clearing the input fields
function clearFields() {
    updateUserDetailsEmail.value = '';
    updateUserDetailsName.value = '';
}

// updating info in localStorage 
function storeUpdatedDataToLocal(data) {
    const { user: { name: userName, userId } } = data;
    //*storing response data in local storage for future access
    localStorage.setItem('name', userName);
    localStorage.setItem('id', userId);
    localStorage.setItem('status', 'loggedIn');
}

// init the page
function init() {
    updateUserDetails.addEventListener('click', updateUserDetailsHandler)
    updateUserPassword.addEventListener('click', updateUserPasswordHandler);
}

init();