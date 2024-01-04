const imgDoFilme = document.getElementById('imagem-do-filme')
const tituloDoFilme = document.getElementById('titulo-do-filme')
const anoDoFilme = document.getElementById('ano-do-filme')
const categoriaDoFilme = document.getElementById('categoria-do-filme')
const tempoDoFilme = document.getElementById('tempo-do-filme')
const descricaoDoFilme = document.getElementById('descricao-do-filme')
const diretorDoFilme = document.getElementById('diretor-do-filme')

const inputTitulo = document.getElementById('input-titulo-editar')
const imgEditar = document.getElementById('img-editar')
const inputDescricao = document.getElementById('input-descricao-editar')
const inputCategoria = document.getElementById('input-categoria-editar')
const inputDiretor = document.getElementById('input-diretor-editar')
const inputLancamento = document.getElementById('input-lancamento-editar')
const inputTempo = document.getElementById('input-tempo-editar')
const inputUrl = document.getElementById('input-url-editar')

const btnFecharTelaDeCadastro = document.getElementById('btn-fechar-tela')
const btnMenu = document.getElementById('btn-menu')
const btnFechar = document.getElementById('btn-fechar')
const btnSair = document.getElementById('btn-sair')
const btnEditar = document.getElementById('btn-editar')
const btnEditarForm = document.getElementById('btn-editar-form')
const btnDeletar = document.getElementById('btn-deletar')

const menu = document.querySelector('.menu')
const containerEditar = document.querySelector('.container-editar')

btnDeletar.addEventListener('click', function () {
    const resposta = confirm('Deseja remover o filme?')
    if (resposta) {
        const idFilme = pegaIdDoFilme()
        const url = `http://localhost:8080/api/v1/filmes/${idFilme}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.status !== 204) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                alert('Filme removido com sucesso!')
                window.location.href = '/routes/home.html'
            })
            .catch(error => {
                alert('Você não tem permissão para remover um filme!')
                console.error('Erro ao atualizar filme:', error);
            });
    }
})

btnFecharTelaDeCadastro.addEventListener('click', function (e) {
    containerEditar.style.display = 'none'
})

btnEditarForm.addEventListener('click', function (e) {
    e.preventDefault()
    const idFilme = pegaIdDoFilme()
    const url = `http://localhost:8080/api/v1/filmes/${idFilme}`;
    const dadosFilme = {
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        categoria: inputCategoria.value,
        diretor: inputDiretor.value,
        anoDeLancamento: inputLancamento.value,
        urlDaCapa: inputUrl.value,
        tempoEmMinutos: inputTempo.value
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(dadosFilme)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Filme atualizado com sucesso!')
            containerEditar.style.display = 'none'
            exibirDadosDoFilme()
        })
        .catch(error => {
            console.error('Erro ao atualizar filme:', error);
        });
})

btnEditar.addEventListener('click', function () {
    containerEditar.style.display = 'flex'
    preencheDadosDaTelaEditar()
})

function preencheDadosDaTelaEditar() {
    const dadosFilme = retornarDadosDoFilme()
    dadosFilme.then(filme => {
        inputTitulo.value = filme.titulo
        imgEditar.src = filme.urlDaCapa
        inputDescricao.value = filme.descricao
        inputCategoria.value = filme.categoria
        inputDiretor.value = filme.diretor
        inputLancamento.value = filme.anoDeLancamento
        inputTempo.value = filme.tempoEmMinutos
        inputUrl.value = filme.urlDaCapa
    })
}

btnMenu.addEventListener('click', function () {
    menu.style.display = 'flex'
})

btnFechar.addEventListener('click', function () {
    menu.style.display = 'none'
})

btnSair.addEventListener('click', function () {
    localStorage.removeItem('token')
    window.location.href = '/index.html'
})

async function retornarDadosDoFilme() {
    const idFilme = pegaIdDoFilme()
    try {
        const dados = await axiosCustomToken.get(`/api/v1/filmes/${idFilme}`)
        return dados.data
    } catch (error) {
        console.log(error)
    }
}

function pegaIdDoFilme() {
    const urlParam = new URLSearchParams(window.location.search)
    return urlParam.get('f')
}

function exibirDadosDoFilme() {
    retornarDadosDoFilme().then(filme => {
        imgDoFilme.src = filme.urlDaCapa
        tituloDoFilme.innerHTML = filme.titulo
        descricaoDoFilme.innerHTML = filme.descricao
        anoDoFilme.innerHTML = filme.anoDeLancamento
        categoriaDoFilme.innerHTML = filme.categoria
        tempoDoFilme.innerHTML = filme.tempoEmMinutos + ' min'
        diretorDoFilme.innerHTML = filme.diretor
    })
}

exibirDadosDoFilme()


