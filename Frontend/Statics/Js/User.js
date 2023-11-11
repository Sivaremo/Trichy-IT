function loginUser() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = document.getElementById('submitButton');

    loadingSpinner.style.display = 'flex';
    submitButton.disabled = true;

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('Password').value,
    };

    axios.post('http://127.0.0.1:8000/users/log/', formData)
        .then(function (response) {
            console.log('Response from server:', response.data);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            
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


const submitButton = document.getElementById('submitButton');
if (submitButton) {
    submitButton.addEventListener('click', loginUser);
}




function userLogin() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const isIndexPage = window.location.pathname.includes('index.html');
    if (!accessToken) {
        console.error('Access token not found. User may not be logged in.');
        if (isIndexPage){
            window.location.href='./Login.html';
        }
       
        return;
    }

    axios.get('http://127.0.0.1:8000/users/log/', {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    })
    .then(function (response) {
     
        const outputElement = document.getElementById('Hello');
     

        if (Array.isArray(response.data)) {
            outputElement.innerHTML = response.data.map(item => `
                <div>
                    ${item.data.map(iteam => `<h5>${iteam.message}</h5>`).join('')}
                </div>
            `).join('');
        } else if (typeof response.data === 'object') {
            outputElement.innerHTML = `<h5>${response.data.message}</h5>`;
        } else {
            console.error('Unexpected data structure:', response.data);
        }
    })
    .catch(function (error) {
        console.error('Error fetching data:', error.message);

       
        const outputElement = document.getElementById('Hello');
        const errorMessage = error.response ? error.response.data.message : 'An error occurred. Please try again later.';
        outputElement.innerHTML = `<p>${errorMessage}</p>`;
        window.location.href='./Login.html'
    });
}

userLogin();

function userLogout() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        console.error('Refresh token not found. User may not be logged in.');
        return;
    }

    axios.delete('http://127.0.0.1:8000/users/log/', {
        data: { refresh: refreshToken }, 
    })
    .then(function (response) {
        console.log('Logout successful:', response.data);

 
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');


        window.location.href = './Login.html';
    })
    .catch(function (error) {
        console.error('Error during logout:', error.message);

    });
}




