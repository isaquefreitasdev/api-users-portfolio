
const name = document.getElementById("nome");


document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token")
  if (!token) {
    return window.location.href = "login.html"
  }
  fetch('http://localhost:3001/users',{
      method:"GET",
      headers:{
        'authorization-token':token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("logado")
        
      })
      .catch(error => {
        console.error('Erro ao fazer requisição:', error);
      });
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const datas = {
    email: email,
    password: password
  }
  fetch('http://localhost:3001/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'

    },
    body: JSON.stringify(datas)
  }).then(response => response.json()).then(data => {
    console.log(data)
    localStorage.setItem("token", data.token)
    setTimeout(()=>{
      window.location.href = "index.html"
    },5000)
      
    
  }).catch(error => console.log(error))
}