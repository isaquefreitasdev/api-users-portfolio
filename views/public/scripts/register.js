
function register(event) {
    const name = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    if (!email || !password) {
        return alert("Preencha os campos!");
    }
    const datas = {
        name:name,
        email: email,
        password: password
    }
    fetch('http://localhost:3001/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(datas)
    }).then(response => response.json()).then(data => {
        if(data.error === "Email existente.Logue para acessar"){
            window.location.href = "login.html"
        }
        setTimeout(()=>{
            window.location.href = "login.html"
        },3000)
        



    }).catch(error => console.log(error))
}