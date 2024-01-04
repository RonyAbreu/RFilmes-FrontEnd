const inputNome = document.getElementById('input-nome')
const inputEmail = document.getElementById('input-email')
const inputSenha = document.getElementById('input-senha')
const inputConfirmaSenha = document.getElementById('input-confirma-senha')
const btnConfirmar = document.getElementById('btn-confirmar')
const form = document.querySelector('form')

const url = 'http://localhost:8080/usuario/registro'

form.addEventListener('submit', function (e) {
    e.preventDefault()
    cadastrarUsuario()
})

function cadastrarUsuario() {
    let usuario = criarUsuario();
    if (usuario == null) {
        alert('Senhas são diferentes')
    } else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }).then(response=>{
            if(!response.ok){
                alert('Verifique se preencheu os campos corretamente!')
                throw new Error('Erro na requisição: ')
            }
            alert('Cadastro realizado com sucesso!')
            fazerLogin()
            limparCampos()
            return response.json()
        })
        .then(error =>{
            console.error(error)
        })
    }
}

function criarUsuario() {
    let nome = inputNome.value
    let email = inputEmail.value
    let senha = inputSenha.value
    let confirmaSenha = inputConfirmaSenha.value

    if (senha === confirmaSenha) {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        }
        return usuario
    }
    return null
}

function fazerLogin() {
    const url = 'http://localhost:8080/usuario/login'
    let email = inputEmail.value
    let senha = inputSenha.value

    const usuario = {
        email: email,
        senha: senha
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao fazer login ${response.statusText}`)
            }
            window.location.href = '/routes/home.html'
            return response.json()
        }).then(data => {
            localStorage.setItem('token', data.token)
        }).catch(error => {
            console.error(error)
        })
}

function limparCampos() {
    inputNome.value = ''
    inputEmail.value = ''
    inputSenha.value = ''
    inputConfirmaSenha.value = ''
}





