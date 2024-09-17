document.addEventListener("DOMContentLoaded", loadEmployees);

function loadEmployees() {
    const token = localStorage.getItem("token");

    fetch('http://localhost:3001/users', {
        method: "GET",
        headers: {
            'authorization-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === "jwt expired") {
            alert("Sessão expirada");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
            return;
        }

        const clients = data.users;
        console.log(clients)
        const clientList = document.getElementById('clients-list');
        clientList.innerHTML = ''; // Limpa o conteúdo existente

        if (clients && clients.length > 0) {
            clients.forEach(client => {
                const clientRow = document.createElement('tr');

                clientRow.innerHTML = `
                    <td><input type="text" value="${client.name}" id="name-${client._id}" class="disabled" disabled></td>
                    <td><input type="email" value="${client.email}" id="email-${client._id}" class="disabled" disabled></td>
                    <td><input type="text" value="${client.telefone}" id="telefone-${client._id}" class="disabled" disabled></td>
                    <td><input type="text" value="${client.position}" id="position-${client._id}" class="disabled" disabled></td>
                    <td>
                        <button class="update-btn" onclick="toggleEdit('${client._id}')">Atualizar</button>
                        <button class="remove-btn" onclick="removeEmployee('${client._id}')">Remover</button>
                        <button class="save-btn" id="save-${client._id}" style="display: none;" onclick="saveEmployee('${client._id}')">Salvar</button>
                    </td>
                `;
                
                clientList.appendChild(clientRow);
            });
        } else {
            clientList.innerHTML = '<tr><td colspan="5">Nenhum funcionário encontrado.</td></tr>';
        }
    })
    .catch(error => {
        console.error('Erro ao fazer requisição:', error);
        alert("Erro ao carregar dados. Logue novamente.");
    });
}

function toggleEdit(id) {
    const inputs = document.querySelectorAll(`#name-${id}, #email-${id}, #telefone-${id}, #position-${id}`);
    inputs.forEach(input => {
        input.disabled = !input.disabled;
        input.classList.toggle('disabled');
    });

    const saveButton = document.getElementById(`save-${id}`);
    saveButton.style.display = saveButton.style.display === 'none' ? 'inline-block' : 'none';
}

function saveEmployee(id) {
    const name = document.getElementById(`name-${id}`).value;
    const email = document.getElementById(`email-${id}`).value;
    const telefone = document.getElementById(`telefone-${id}`).value;

    fetch(`http://localhost:3001/updateUsers/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ name, email, telefone })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === "jwt expired") {
            alert("Sessão expirada");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
            return;
        }

        if (data.error) {
            alert(data.error);
            console.log(data.error)
        } else {
            alert('Funcionário atualizado com sucesso');
            toggleEdit(id); // Desativa o modo de edição
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar funcionário:', error);
        alert("Erro ao atualizar funcionário. Tente novamente.");
    });
}

function removeEmployee(id) {
    if (confirm("Tem certeza de que deseja remover este funcionário?")) {
        fetch(`http://localhost:3001/delete/${id}`, {
            method: "DELETE",
            headers: {
                'authorization-token': localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error === "jwt expired") {
                alert("Sessão expirada");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
                return;
            }

            if (data.error) {
                alert(data.error);
            } else {
                alert('Funcionário removido com sucesso');
                loadEmployees(); // Recarrega a lista de funcionários
            }
        })
        .catch(error => {
            console.error('Erro ao remover funcionário:', error);
            alert("Erro ao remover funcionário. Tente novamente.");
        });
    }
}
