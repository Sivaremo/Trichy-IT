function registerUser() {
    event.preventDefault();  // Add this line

    console.log('Register button clicked');

    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = document.getElementById('submitButtonRegister');
    const notificationElement = document.getElementById('notification');

    loadingSpinner.style.display = 'flex';


    const formData = {
        name: document.getElementById('Name').value,
        email: document.getElementById('Email').value,
        password: document.getElementById('Password').value,
        password2: document.getElementById('Password2').value,
    };
   
    axios.post('http://127.0.0.1:8000/users/reg/', formData)
        .then(function (response) {
            console.log('Response from server:', response.data);
           

            updateNotification('alert-success', response.data.message);

            document.getElementById('Register').reset();
           
                window.location.href = './Login.html';
           
        })
        .catch(function (error) {
            console.error('Error in POST request:', error);

            let errorMessage = 'Error submitting form.';

            if (error.response) {
                console.error('Server responded with non-2xx status:', error.response.status);

                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = `Server responded with ${error.response.status} status.`;
                }
            } else if (error.request) {
                console.error('No response received from the server.');
                errorMessage = 'No response received from the server.';
            } else {
                console.error('Error setting up the request:', error.message);
            }

            updateNotification('alert-danger', errorMessage);
        })
        .finally(function () {
            loadingSpinner.style.display = 'none';
           
        });
}

function updateNotification(alertType, message) {
    const notificationElement = document.getElementById('notification');
    if (notificationElement) {
        notificationElement.className = `alert ${alertType}`;
        notificationElement.innerHTML = message;
        notificationElement.style.display = 'block';
        setTimeout(function () {
            fadeOut(notificationElement);
        }, 3000);
    }
}

function fadeOut(element) {
    let opacity = 1;
    const fadeOutInterval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeOutInterval);
            element.style.display = 'none';
        }
    }, 100);
}

const submitButtonRegister = document.getElementById('submitbtn');
if (submitButtonRegister) {
    submitButtonRegister.addEventListener('click', registerUser);
}
