document.getElementById('num-persons').addEventListener('input', function() {
    const maxPersons = 5;
    let numPersons = parseInt(this.value, 10);

    if (numPersons > maxPersons) {
      numPersons = maxPersons;
      this.value = maxPersons; 
    } else if (numPersons < 0) {
      numPersons = 0; 
      this.value = 0;
    }

    const container = document.getElementById('personas-container');

    container.innerHTML = '';


    for (let i = 1; i <= numPersons; i++) {
      const personDiv = document.createElement('div');
      personDiv.className = 'form-group';
      personDiv.id = `person`;
      personDiv.innerHTML = `
        <h3>Persona ${i}</h3>
        <label for="name-${i}">Nombre:</label>
        <input type="text" id="name-${i}" name="name-${i}" required><br>
        
        <label for="email-${i}">Correo:</label>
        <input type="email" id="email-${i}" name="email-${i}" required><br>

        <label for="document-${i}">Documento:</label>
        <input type="text" id="document-${i}" name="document-${i}" required>
      `;
      container.appendChild(personDiv);
    }
  });
