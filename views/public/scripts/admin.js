
document.addEventListener("DOMContentLoaded", () => {

    const email = localStorage.getItem("email")
    // if (!email) {
    //   alert("Acesso negado!")
    //   window.location.href = "index.html"
    // }
    fetch('http://localhost:3001/admin', {
        method: "GET",
        headers: {
            'headerEmail': email
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.msg === "Acesso negado,Somente Admins!!!") {
                alert("Acesso negado!")
                window.location.href = "index.html"
            }
            const user = data.users;
            console.log(user)
            const user1 = document.getElementById("user1");
            const user2 = document.getElementById("user2");
            const user3 = document.getElementById("user3");
            const user4 = document.getElementById("user4");

           
            if(!user1 ||!user2 || !user3 || !user4){
                alert("Crie mais usuarios")
            }
            user1.textContent = user[0].name;
            user2.textContent = user[1].name;
            user3.textContent = user[2].name;
            user4.textContent = user[3].name;

            user1.id = user[0]._id;
            user2.id = user[1]._id;
            user3.id = user[2]._id;
            user4.id = user[3]._id;


        })
});


function removeUser(event) {
  
    const clickedButton = event.target;

    
    const profileItem = clickedButton.closest(".profile-item");

    
    const userIdSpan = profileItem.querySelector(".profile-name");

    
    const userId = userIdSpan.id;

    fetch(`http://localhost:3001/delete/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao remover usuário.");
        }
        // Remoção bem-sucedida, atualize a interface ou faça qualquer ação necessária
        console.log(`Usuário com ID ${userId} removido com sucesso.`);
        // Por exemplo, você pode recarregar a página para atualizar a lista de usuários
        location.reload();
    })
    .catch(error => {
        console.error("Erro ao remover usuário:", error.message);
    });
}
function updateUser(event) {
  
    const clickedButton = event.target;

    
    const profileItem = clickedButton.closest(".profile-item");

    
    const userIdSpan = profileItem.querySelector(".profile-name");

    
    const userId = userIdSpan.id;
    
    fetch(`http://localhost:3001/updateUsers/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({assinatura:true})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao atualizar usuário.");
        }
        // Remoção bem-sucedida, atualize a interface ou faça qualquer ação necessária
        console.log(`Usuário com ID ${userId} atualizado com sucesso.`);
        // Por exemplo, você pode recarregar a página para atualizar a lista de usuários
        location.reload();
    })
    .catch(error => {
        console.error("Erro ao remover usuário:", error.message);
    });
}
