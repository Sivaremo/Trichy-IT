function fetchData() {
    axios.get('http://127.0.0.1:8000/petsdata/pets/')
        .then(function (response) {
            const outputElement = document.getElementById('output');
           
            // Check if response.data is an array
            if (Array.isArray(response.data)) {
                // If it's an array, loop through and generate rows
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
                    ${response.data.map(item => `
                      <tr>
                        <td>${item.BreedName}</td>
                        <td>${item.PetName}</td>
                        <td>${item.price}</td>
                        <td>${item.No_of_pets}</td>
                        <td>${item.No_of_pets_sold}</td>
                        <td>${item.Total_price}</td>
                        <td>
                          <button type="button" class="btn btn-primary mx-2 my-2 ">Edit</button>
                          <button type="button" class="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`;
            } else if (typeof response.data === 'object') {
                // If it's a single object, display one row
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
                        <button type="button" class="btn btn-primary">Edit</button>
                        <button type="button" class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>`;
            } else {
                // Handle other cases
                console.error('Unexpected data structure:', response.data);
            }
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

fetchData();
