
function register(event) {
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const telefone = document.getElementById('telefone').value;
    const position = document.getElementById('posicao').value;
    if (!name ||!email ||!password ||!telefone || !posicao) {
        return alert("Preencha os campos!");
    }
    const datas = {
        name:name,
        email: email,
        password: password,
        telefone:telefone,
        position:position
        
    }
    fetch('http://localhost:3001/employees/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(datas)
    }).then(response => response.json()).then(data => {
        if(data.error === "Email existente.Logue para acessar"){
            alert(data.error)
            setTimeout(()=>{
                window.location.href ="login.html"
            },2000)
        }
        setTimeout(()=>{
            console.log(data)
            window.location.href ="login.html"
        },3000)
        



    }).catch(error => console.log(error))
}