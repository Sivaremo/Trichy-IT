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

            document.getElementById('petForm').reset();

            if (response.status === 200) {
                window.location.href = 'index.html';
            }

         
        })
        .catch(function (error) {
            console.error('Error in POST request:', error);

            updateNotification('alert-danger', 'Error submitting form.');
        })
        .finally(function () {
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        });
}
