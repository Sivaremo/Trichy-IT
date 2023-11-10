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
                    <th>Total Price</th>
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
                      <td>${item.No_of_pets_sold}</td>
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
                    <th>Total Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${response.data.BreedName}</td>
                    <td>${response.data.PetName}</td>
                    <td>${response.data.price}</td>
                    <td>${response.data.No_of_pets}</td>
                    <td>${response.data.No_of_pets_sold}</td>
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

