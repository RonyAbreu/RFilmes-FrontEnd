const btnMenu = document.getElementById('btn-menu')
const menu = document.querySelector('.menu')
const btnFechar = document.getElementById('btn-fechar')
const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

btnMenu.addEventListener('click', function(){
    menu.style.display = 'flex'
})

btnFechar.addEventListener('click', function(){
    menu.style.display = 'none'
})