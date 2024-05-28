document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "login.html"
    }
    fetch('http://localhost:3001/users',{
        method:"GET",
        headers:{
          'authorization-token':token
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.error == "jwt expired"){
            alert("Sessão expirada");
            setTimeout(()=>{
                window.location.href = "login.html"
            },3000)
          }
        })
        .catch(error => {
          console.error('Erro ao fazer requisição:', error);
         
        });
  });