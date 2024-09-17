
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3001/users', {
        method: "GET",
        headers: {
          'authorization-token': token
        }
      })
        .then(response => response.json())
        .then(data => {
          const user = data.users;
          const img = document.getElementById("img")
          const img1 = document.getElementById("img1")
          const img2 = document.getElementById("img2")
          const img3 = document.getElementById("img3")
    
    
    
          console.log(user)
          img.alt = user[0].name;
          img1.alt = user[1].name;
          img2.alt = user[2].name;
          img3.alt = user[3].name;
          
          
            if (data.error == "jwt expired") {
              alert("Sessão expirada");
              setTimeout(() => {
                window.location.href = "login.html"
              }, 1000)
            }
        })
        .catch(error => {
          console.error('Erro ao fazer requisição:', error);
          alert("LOGAR NOVAMENTE")
          setTimeout(() => {
            window.location.href = "login.html"
          }, 1000)
        });
    }else{
      window.location.href = "login.html"
    }
    
  });