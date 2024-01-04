const btnCadastrarFilme = document.getElementById('btn-cadastrar')
const btnSair = document.getElementById('btn-sair')
const btnDePaginacao1 = document.getElementById('btn-paginacao-1')
const btnDePaginacao2 = document.getElementById('btn-paginacao-2')
const btnDePaginacao3 = document.getElementById('btn-paginacao-3')
const btnPesquisar = document.getElementById('btn-pesquisar')
const btnFecharTelaDeCadastro = document.getElementById('btn-fechar-tela')
const btnCadastrar = document.getElementById('btn-cadastrar-form')
const btnMenu = document.getElementById('btn-menu')

const setaDaEsquerda = document.getElementById('seta-da-esquerda')
const setaDaDireita = document.getElementById('seta-da-direita')

const btnCadastrarMenu = document.getElementById('btn-cadastrar-menu')
const btnSairMenu = document.getElementById('btn-sair-menu')
const btnFechar = document.getElementById('btn-fechar')

const inputPesquisaFilme = document.getElementById('input-filme')
const inputTitulo = document.getElementById('input-titulo')
const inputDescricao = document.getElementById('input-descricao')
const inputCategoria = document.getElementById('input-categoria')
const inputDiretor = document.getElementById('input-diretor')
const inputLancamento = document.getElementById('input-lancamento')
const inputTempo = document.getElementById('input-tempo')
const inputUrl = document.getElementById('input-url')

const containerFilmes = document.querySelector('.container-filmes')
const containerCadastrar = document.querySelector('.container-cadastrar')
const menu = document.querySelector('.menu')

btnFechar.addEventListener('click', function(){
    menu.style.display = 'none'
})

btnCadastrarMenu.addEventListener('click', function(e){
    e.preventDefault()
    menu.style.display = 'none'
    containerCadastrar.style.display = 'flex'
})

btnSairMenu.addEventListener('click', function(e){
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.href = '/index.html'
})

btnCadastrarFilme.addEventListener('click', function(e){
    containerCadastrar.style.display = 'flex'
})

btnSair.addEventListener('click', function(e){
    localStorage.removeItem('token')
    window.location.href = '/index.html'
})

btnFecharTelaDeCadastro.addEventListener('click', function(e){
    containerCadastrar.style.display = 'none'
})

btnMenu.addEventListener('click', function(){
    menu.style.display = 'flex'
})

btnCadastrar.addEventListener('click', function(e){
    e.preventDefault();
    const filme = criarObjetoFilme();

    axiosCustomToken.post('/api/v1/filmes', {
        titulo: filme.titulo,
        descricao: filme.descricao,
        urlDaCapa: filme.urlDaCapa,
        categoria: filme.categoria,
        diretor: filme.diretor,
        anoDeLancamento: filme.anoDeLancamento,
        tempoEmMinutos: filme.tempoEmMinutos
    })
    .then(resposta=>{
        if(resposta.data.titulo){
            alert('Filme cadastrado com sucesso!')
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar o filme:', error);
        alert('Erro ao cadastrar o filme. Verifique as permissões ou tente novamente mais tarde.');
        return
    })
    limparCampos()
})

function criarObjetoFilme(){
    let titulo = inputTitulo.value 
    let descricao = inputDescricao.value
    let categoria = inputCategoria.value
    let diretor = inputDiretor.value
    let anoDeLancamento = inputLancamento.value
    let tempoEmMinutos = inputTempo.value
    let urlDaCapa = inputUrl.value

    const filme = {
        titulo:titulo,
        descricao:descricao,
        categoria:categoria,
        diretor:diretor,
        anoDeLancamento:anoDeLancamento,
        tempoEmMinutos:tempoEmMinutos,
        urlDaCapa:urlDaCapa
    }

    return filme
}

function limparCampos(){
    inputTitulo.value = '' 
    inputDescricao.value = ''
    inputCategoria.value = ''
    inputDiretor.value = ''
    inputLancamento.value = ''
    inputTempo.value = ''
    inputUrl.value = ''
}

async function retornarFilmes(titulo = ''){
    try {
        const resposta = await axiosCustomToken.get(`/api/v1/filmes/busca?titulo=${titulo}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const filmesRetornados = resposta.data._embedded.filmeRespostaMinimoDTOList
        return filmesRetornados
    } catch (error) {
        console.log(error)
    }   
}

async function carregarFilmes(){
    containerFilmes.innerHTML = ''

    const titulo = inputPesquisaFilme.value
    const listaDeFilmes = await retornarFilmes(titulo)
    listaDeFilmes.forEach((filme) =>{
            const div = document.createElement('div')
            adicionaEventoAoFilme(div,filme)
            const img = document.createElement('img')
            const titulo = document.createElement('p')
            exibirFilmesNaTela(div,img,titulo,filme)
        })
}

carregarFilmes()


btnPesquisar.addEventListener('click', function(){
    carregarFilmes()
})

function adicionaEventoAoFilme(elemento, filme){
    elemento.addEventListener('click', function(){
        const id = filme.id
        window.location.href = '/routes/filme.html?f='+id
    })
}

function exibirFilmesNaTela(div, img, titulo, filme){
    img.src = filme.urlDaCapa
    titulo.innerHTML = filme.titulo
    div.setAttribute('class', 'filme')

    div.appendChild(img)
    div.appendChild(titulo)

    containerFilmes.appendChild(div)
}

async function retornarPagina1DeFilmes(pagina = '1'){
    try {
        const resposta = await axiosCustomToken.get(`/api/v1/filmes?page=${pagina}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const filmesRetornados = resposta.data._embedded.filmeRespostaMinimoDTOList
        return filmesRetornados
    } catch (error) {
        console.log(error)
    }   
}

async function carregarFilmes1(){
    containerFilmes.innerHTML = ''
    const listaDeFilmes = await retornarPagina1DeFilmes()
    listaDeFilmes.forEach((filme) =>{
            const div = document.createElement('div')
            adicionaEventoAoFilme(div,filme)
            const img = document.createElement('img')
            const titulo = document.createElement('p')
            exibirFilmesNaTela(div,img,titulo,filme)
        })
}

async function retornarPagina2DeFilmes(pagina = '2'){
    try {
        const resposta = await axiosCustomToken.get(`/api/v1/filmes?page=${pagina}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const filmesRetornados = resposta.data._embedded.filmeRespostaMinimoDTOList
        return filmesRetornados
    } catch (error) {
        console.log(error)
    }   
}

async function carregarFilmes2(){
    containerFilmes.innerHTML = ''
    const listaDeFilmes = await retornarPagina2DeFilmes()
    listaDeFilmes.forEach((filme) =>{
            const div = document.createElement('div')
            adicionaEventoAoFilme(div,filme)
            const img = document.createElement('img')
            const titulo = document.createElement('p')
            exibirFilmesNaTela(div,img,titulo,filme)
        })
}

btnDePaginacao1.addEventListener('click', function(){
    btnDePaginacao1.style.backgroundColor = 'blue'
    btnDePaginacao2.style.backgroundColor = 'black'
    btnDePaginacao3.style.backgroundColor = 'black'
    setaDaEsquerda.style.display = 'none'
    setaDaDireita.style.display = 'block'
    carregarFilmes()
})

btnDePaginacao2.addEventListener('click', function(){
    btnDePaginacao2.style.backgroundColor = 'blue'
    btnDePaginacao1.style.backgroundColor = 'black'
    btnDePaginacao3.style.backgroundColor = 'black'
    setaDaEsquerda.style.display = 'block'
    setaDaDireita.style.display = 'block'
    carregarFilmes1()
})

btnDePaginacao3.addEventListener('click', function(){
    btnDePaginacao3.style.backgroundColor = 'blue'
    btnDePaginacao2.style.backgroundColor = 'black'
    btnDePaginacao1.style.backgroundColor = 'black'
    setaDaEsquerda.style.display = 'block'
    setaDaDireita.style.display = 'none'
    carregarFilmes2()
})

setaDaDireita.addEventListener('click', function(){
    if(btnDePaginacao1.style.backgroundColor === 'blue'){
        carregarFilmes1()
        btnDePaginacao1.style.backgroundColor = 'black'
        btnDePaginacao2.style.backgroundColor = 'blue'
        setaDaEsquerda.style.display = 'block'
    } else if(btnDePaginacao2.style.backgroundColor === 'blue') {
        carregarFilmes2()
        btnDePaginacao2.style.backgroundColor = 'black'
        btnDePaginacao3.style.backgroundColor = 'blue'
        setaDaDireita.style.display = 'none'
        setaDaEsquerda.style.display = 'block'
    }
})

setaDaEsquerda.addEventListener('click', function(){
    if(btnDePaginacao2.style.backgroundColor === 'blue'){
        carregarFilmes()
        btnDePaginacao1.style.backgroundColor = 'blue'
        btnDePaginacao2.style.backgroundColor = 'black'
        btnDePaginacao3.style.backgroundColor = 'black'
        setaDaEsquerda.style.display = 'none'
    } else if(btnDePaginacao3.style.backgroundColor === 'blue') {
        carregarFilmes1()
        btnDePaginacao2.style.backgroundColor = 'blue'
        btnDePaginacao3.style.backgroundColor = 'black'
        btnDePaginacao3.style.backgroundColor = 'black'
        setaDaDireita.style.display = 'block'
    }
})
