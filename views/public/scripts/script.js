
const name = document.getElementById("nome");




function login(event) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  if(!email || !password){
    return alert("Preencha os campos!");
  }
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
    window.location.href = "index.html"
  
      
    
  }).catch(error => console.log(error))
}