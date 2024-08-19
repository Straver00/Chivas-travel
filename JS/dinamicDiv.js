document.getElementById('num-persons').addEventListener('input', function() {
    const maxPersons = 5;
    let numPersons = parseInt(this.value, 10);

    // Ensure numPersons does not exceed maxPersons
    if (numPersons > maxPersons) {
      numPersons = maxPersons;
      this.value = maxPersons; // Set the input value to the maximum allowed
    } else if (numPersons < 1) {
      numPersons = 1; // Ensure at least one person
      this.value = 1;
    }

    const container = document.getElementById('personas-container');

    // Clear previous containers
    container.innerHTML = '';

    // Create new containers based on number of persons
    for (let i = 1; i <= numPersons; i++) {
      const personDiv = document.createElement('div');
      personDiv.className = 'form-group';
      personDiv.innerHTML = `
        <h3>Persona ${i}</h3>
        <label for="name-${i}">Nombre:</label>
        <input type="text" id="name-${i}" name="name-${i}" required>
        
        <label for="email-${i}">Correo:</label>
        <input type="email" id="email-${i}" name="email-${i}" required>
      `;
      container.appendChild(personDiv);
    }
  });
