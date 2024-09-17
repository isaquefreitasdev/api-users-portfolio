
const name = document.getElementById("nome");




function login(event) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(!email || !password){
    return alert("Preencha os campos!");
  }
  const datas = {
    email: email,
    password: password
  }
  fetch('http://localhost:3001/employees/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'

    },
    body: JSON.stringify(datas)
  }).then(response => response.json()).then(data => {
    
      if(data.error){
        return alert(data.error)
      }
      localStorage.setItem("token", data.token)
      localStorage.setItem("email",data.email)
      setTimeout(()=>{
        window.location.href = "opcoes.html"

      },3000)
    
      
      
    
  }).catch(error => console.log(error))
}