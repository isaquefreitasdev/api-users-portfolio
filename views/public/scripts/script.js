const nome = document.getElementById("nome");
const email = document.getElementById("email");
const mensagem = document.getElementById("mensagem");

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3001/users')
    .then(response => response.json())
    .then(data => {
      for (let index = 0; index < data.users.length; index++) {
        const user=  data.users[index];
        nome.textContent = user.name;
        email.textContent = user.email;
        mensagem.textContent = user.message;
      }
    })
    .catch(error => {
      console.error('Erro ao fazer requisição:', error);
    });
});