document.querySelector('button').addEventListener('click', function() {
    document.querySelector('.add-employee-pane').style.display = 'flex';
});

document.getElementById('closePane').addEventListener('click', function() {
    document.querySelector('.add-employee-pane').style.display = 'none';
});


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost:5000/user/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone})
    })
    .then(response => response.json())
    .then(data => {
        if (data. id) {
            alert(`Usuario registrado: ${data.name} (${data.email}) ´(${data.phone})`);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            window.location.reload();
        } else {
            alert('Error al registrar usuario');
        }
    })
    .catch(error => console.error('Error:', error))
    
    
});

function getUser() {
    const userId = document.getElementById('userId').value;
    if (userId) {
        fetch(`http://localhost:5000/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Usuario no encontrado');
            } else {
                alert(`Detalles del usuario:\nID: ${data.user_id}\nNombre: ${data.name}\nEmail: ${data.email} (${data.phone}) `);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
    window.location.reload();
}

function updateUser(event) {
    const userId = event.target.getAttribute('data-user-id');
    if (userId) {
        const name = prompt('Ingrese el nuevo nombre:');
        const email = prompt('Ingrese el nuevo email:');
        const phone = prompt('Ingrese el nuevo telefono:');

        if (name && email && phone) {
            fetch(`http://localhost:5000/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone})
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Usuario no encontrado');
                } else {
                    alert(`Usuario actualizado:\nNombre: ${data.name}\nEmail: ${data.email} Telefono: ${data.phone}`);
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Debe ingresar nombre y email válidos.');
        }
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
    
}

function deleteUser(event) {
    const userId = event.target.getAttribute('data-user-id');
    if (userId) {
        fetch(`http://localhost:5000/user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Usuario eliminado correctamente');
                window.location.reload();
            } else {
                alert('Error al eliminar usuario');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
    
}

function loadUsers() {
    fetch('http://localhost:5000/user/all')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            addUserToTable(user.id, user.name, user.email, user.phone);
        });
    })
    .catch(error => console.error('Error loading users:', error));
};

document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});


function addUserToTable(id, name, email, phone) {
    console.log("ID inside addUserToTable:", id);
    const tableBody = document.querySelector('.tabla tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>
        <button data-user-id="${id}" onclick="updateUser(event)">Actualizar Usuario</button>
        <button data-user-id="${id}" onclick="deleteUser(event)">Eliminar Usuario</button>
        </td>
    `
    
    tableBody.appendChild(row);
};

