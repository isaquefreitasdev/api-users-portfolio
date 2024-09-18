
function register(event) {
    const name = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const password = document.getElementById("password").value;
    if (!email ||!telefone ||  !password) {
        return alert("Preencha os campos!");
    }
    const datas = {
        name:name,
        email: email,
        telefone:telefone,
        password: password
    }
    fetch('https://api-users-portfolio.vercel.app/api/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(datas)
    }).then(response => response.json()).then(data => {
        if(data.error){
            alert("Houve erro,os dados já podem existirem")
            setTimeout(()=>{
                window.location.href ="login.html"
            },2000)
        }
    
            console.log(data)
            // window.location.href ="selecaodevcomprar.html"
        
        



    }).catch(error => console.log(error))
}