
document.addEventListener("DOMContentLoaded", () => {
    
    const email = localStorage.getItem("email")
    // if (!email) {
    //   alert("Acesso negado!")
    //   window.location.href = "index.html"
    // }
    fetch('http://localhost:3001/admin', {
      method: "GET",
      headers: {
        'headerEmail':email
      }
    })
      .then(response => response.json())
      .then(data =>{
        if(data.msg === "Acesso negado,Somente Admins!!!"){
            alert("Acesso negado!")
            window.location.href = "index.html"
        }
        const user = data.users;
        console.log(user)
        const user1 = document.getElementById("user1");
        const user2 = document.getElementById("user2");
        const user3  = document.getElementById("user3");
        const user4 = document.getElementById("user4");

        user1.textContent = user[0].name;
        user2.textContent = user[1].name;
        user3.textContent = user[2].name;
        user4.textContent = user[3].name;
        
      })
  });