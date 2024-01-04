const form = document.getElementById('form')
const inputEmail = document.getElementById('input-email')
const inputSenha = document.getElementById('input-senha')
const btnEntrar = document.getElementById('btn-entrar')

const url = 'http://localhost:8080/usuario/login'

form.addEventListener('submit', function (e) {
    e.preventDefault()
    fazerLogin()
})

function fazerLogin() {
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
                alert('Email ou senha inválidos!')
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
