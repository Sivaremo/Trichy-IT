function loginUser() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = document.getElementById('submitButton');

    loadingSpinner.style.display = 'flex';
    submitButton.disabled = true;

    const formData = {
        email: document.getElementById('Email').value,
        password: document.getElementById('Password').value,
    };

    axios.post('http://127.0.0.1:8000/users/log/', formData)
        .then(function (response) {
            console.log('Response from server:', response.data);
            
            updateNotification('alert-success', response.data.message);


            document.getElementById('Login').reset();

            if (response.status === 200) {
                window.location.href = 'index.html';
            }

         
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
            submitButton.disabled = false;
        });

        
}
function updateNotification(alertType, message) {
    const notificationElement = document.getElementById('notification');
    if (notificationElement) {
        notificationElement.className = `alert ${alertType}`;
        notificationElement.innerHTML = message;
        notificationElement.style.display = 'block';

        // Automatically close the alert after 3 seconds (adjust as needed)
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

// Attach loginUser function to the button click event
const submitButton = document.getElementById('submitButton');
if (submitButton) {
    submitButton.addEventListener('click', loginUser);
}
