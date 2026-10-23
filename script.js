//script.js

//NAV MENU INTERACTION

const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active')
}

//CONTACT FORM VALIDATION
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    //clear previous errors
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    //get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    //validation flags
    let isValid = true

    //Name jvalidation
    if (name === "") {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    //email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email address required';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    //Message validation
    if (message === "") {
        document.getElementById('messageError').textContent = 'A message is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    //If form is valid, allow submission
    if (isValid) {
        event.target.submit();
        /*consider adding a check to see if the backend has processed the message*/
        alert('Message sent. Thanks for getting in touch!')
    }
});