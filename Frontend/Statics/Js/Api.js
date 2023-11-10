function fetchData() {
  axios.get('http://127.0.0.1:8000/petsdata/pets/')
      .then(function (response) {
          const outputElement = document.getElementById('output');
        
          if (Array.isArray(response.data)) {
            
              outputElement.innerHTML = `<table class="table table-dark table-hover ">
                <thead>
                  <tr>
                    <th>BreedName</th>
                    <th>PetName</th>
                    <th>Price</th>
                    <th>No of Pets</th>
                    <th>No of Pets Sold</th>
                    <th>Total Proof</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${response.data.map(item => `
                    <tr>
                      <td>${item.BreedName}</td>
                      <td>${item.PetName}</td>
                      <td>${item.price}</td>
                      <td>${item.No_of_pets}</td>
                      <td><p >${item.No_of_pets_sold}</p> 
                      <div class="col-sm-2 col-md-2">
                      <img src="../Statics/sold.png" class="avatar"/>
                      </div>
                      </td>
                      <td>${item.Total_price}</td>
                      <td>
                        <button type="button" class="btn btn-primary mx-2 my-2" onclick="editPet(${item.id})">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="deletePet(${item.id},'${item.PetName}')">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>`;
          } else if (typeof response.data === 'object') {
            
              outputElement.innerHTML = `<table class="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>BreedName</th>
                    <th>PetName</th>
                    <th>Price</th>
                    <th>No of Pets</th>
                    <th>No of Pets Sold</th>
                    <th>Total Proof</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${response.data.BreedName}</td>
                    <td>${response.data.PetName}</td>
                    <td>${response.data.price}</td>
                    <td>${response.data.No_of_pets}</td>
                    <td><p>${response.data.No_of_pets_sold}</p><img src="./sold.png" class="avatar"/></td>
                    <td>${response.data.Total_price}</td>
                    <td>
                      <button type="button" class="btn btn-primary" onclick="editPet(${response.data.id})">Edit</button>
                      <button type="button" class="btn btn-danger" onclick="deletePet(${response.data.id},'${response.data.PetName}')">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>`;
          } else {
            
              console.error('Unexpected data structure:', response.data);
          }
      })
      .catch(function (error) {
          console.error('Error fetching data:', error);
      });
}


fetchData();
function deletePet(petId, petName) {

  const deleteAlert = document.getElementById('deleteAlert');

  axios.delete(`http://127.0.0.1:8000/petsdata/pets/?id=${petId}`)
      .then(function (response) {

          console.log( response.data.message);


          updateAlert(deleteAlert, `Pet "${petName}" deleted successfully`, 'alert-success');

          fetchData();
      })
      .catch(function (error) {
         
          console.error('Error deleting pet:', error);

      
          updateAlert(deleteAlert, `Error deleting pet "${petName}" with ID ${petId}`, 'alert-danger');
      });
}


function updateAlert(alertElement, message, alertType) {

  alertElement.innerHTML = message;
  alertElement.classList.add(`${alertType}`);

 
  alertElement.style.opacity = 1;

 
  setTimeout(function () {
      fadeOut(alertElement);
  }, 3000);
}


function fadeOut(element) {
  let opacity = 1;
  const fadeOutInterval = setInterval(function () {
      if (opacity > 0) {
          opacity -= 0.1;
          element.style.opacity = opacity;
      } else {
          clearInterval(fadeOutInterval);
      }
  }, 100);
}

fetchData();

function submitForm() {
 
  document.getElementById('loadingSpinner').style.display = 'flex';


  document.getElementById('submitButton').disabled = true;

  const formData = {
      BreedName: document.getElementById('BreedName').value,
      PetName: document.getElementById('PetName').value,
      price: document.getElementById('Price').value,
      No_of_pets: document.getElementById('No_of_pets').value,
      No_of_pets_sold: document.getElementById('No_of_pets_sold').value,
  };

  axios.post('http://127.0.0.1:8000/petsdata/pets/', formData)
      .then(function (response) {
          console.log('Response from server:', response.data);

          
          updateNotification('alert-success', response.data.message);

        
          document.getElementById('petForm').reset();

        
          fetchData();
      })
      .catch(function (error) {
          console.error('Error in POST request:', error);

     
          updateNotification('alert-danger', 'Error submitting form.');

      })
      .finally(function () {
       
          document.getElementById('loadingSpinner').style.display = 'none';

       
          document.getElementById('submitButton').disabled = false;
      });
}
function updateNotification(alertType, message) {
  const notificationElement = document.getElementById('notification');
  notificationElement.className = `alert ${alertType}`;
  notificationElement.innerHTML = message;
  notificationElement.style.display = 'block';

  // Automatically close the alert after 3 seconds (adjust as needed)
  setTimeout(function () {
      fadeOut(notificationElement);
  }, 3000);
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