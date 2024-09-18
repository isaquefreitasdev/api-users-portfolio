document.addEventListener("DOMContentLoaded", loadEmployees);

function loadEmployees() {
    const token = localStorage.getItem("token");

    fetch('https://api-users-portfolio.vercel.app/api/employees', {
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

        const employees = data.employees;
        const employeesList = document.getElementById('employees-list');
        employeesList.innerHTML = ''; // Limpa o conteúdo existente

        if (employees && employees.length > 0) {
            employees.forEach(employee => {
                const employeeRow = document.createElement('tr');

                employeeRow.innerHTML = `
                    <td><input type="text" value="${employee.name}" id="name-${employee._id}" class="disabled" disabled></td>
                    <td><input type="email" value="${employee.email}" id="email-${employee._id}" class="disabled" disabled></td>
                    <td><input type="text" value="${employee.telefone}" id="telefone-${employee._id}" class="disabled" disabled></td>
                    <td><input type="text" value="${employee.position}" id="position-${employee._id}" class="disabled" disabled></td>
                    <td>
                        <button class="update-btn" onclick="toggleEdit('${employee._id}')">Atualizar</button>
                        <button class="remove-btn" onclick="removeEmployee('${employee._id}')">Remover</button>
                        <button class="save-btn" id="save-${employee._id}" style="display: none;" onclick="saveEmployee('${employee._id}')">Salvar</button>
                    </td>
                `;
                
                employeesList.appendChild(employeeRow);
            });
        } else {
            employeesList.innerHTML = '<tr><td colspan="5">Nenhum funcionário encontrado.</td></tr>';
        }
    })
    .catch(error => {
        console.error('Erro ao fazer requisição:', error);
        alert("Erro ao carregar dados. Logue novamente.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
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
    const position = document.getElementById(`position-${id}`).value;

    fetch(`https://api-users-portfolio.vercel.app/api/employees/update/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization-token': localStorage.getItem("token")
        },
        body: JSON.stringify({ name, email, telefone, position })
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
        fetch(`https://api-users-portfolio.vercel.app/api/employees/delete/${id}`, {
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
