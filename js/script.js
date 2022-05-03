var cartas
var aleatorizar = [0, 0, 1, 1, 2, 2, 3, 3]
var contador = 0
var levantadasResp = []
var levantadas = []
var acertos = 0
var milisegundos = 00, segundos = 00, minutos = 00
var SetMilisegundos = window.document.querySelector('span#milisegundos')
var SetSegundos = window.document.querySelector('span#segundos')
var SetMinutos = window.document.querySelector('span#minutos')
var melhorTempo = window.document.querySelector('p#best-time')
var interval    
var emJogo = 0

function aleatorizador(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

function MontarJogo(){
    window.document.querySelector('div.container').innerHTML = 
    `<div class="cards" id="cards" onclick="VirarCarta(0)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(1)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(2)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(3)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(4)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(5)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(6)"><img src="images/logo.png" alt="logo-PicaPau"></div>
     <div class="cards" id="cards" onclick="VirarCarta(7)"><img src="images/logo.png" alt="logo-PicaPau"></div>`
     aleatorizador(aleatorizar)
     cartas = window.document.querySelectorAll('div#cards')
}

function Recomecar(){
    contador = 0
    emJogo = 0
    levantadas = []
    levantadasResp = []
    acertos = 0
    ResetarTimer()
    MontarJogo()
}

function VirarCarta(n) {
    if (emJogo == 0) {
        emJogo = 1
        ResetarTimer()
        IniciarTimer()
    }

    if (aleatorizar[n] == 0) {
        cards[n].innerHTML = `<img id="pica-pau" src="images/pica-pau.png" alt="Pica-Pau">`
        cards[n].style.backgroundColor = `#FFCE00`  
    }
    if (aleatorizar[n] == 1) {
        cards[n].innerHTML = `<img id="zeca" src="images/zeca.png" alt="logo-Zeca-Urubu">`
        cards[n].style.backgroundColor = `#72b331`
    }
    if (aleatorizar[n] == 2) {
        cards[n].innerHTML = `<img id="pano" src="images/pano.png" alt="Pé-de-Pano">`
        cards[n].style.backgroundColor = `#c58554`
    }
    if (aleatorizar[n] == 3) {
        cards[n].innerHTML = `<img id="leoncio" src="images/leoncio.png" alt="Leôncio">`
        cards[n].style.backgroundColor = `#f19d64`
    }
    levantadas[contador] = n
    levantadasResp[contador] = aleatorizar[n]
    contador++
    if (contador == 2) {
        setTimeout(function() {
            if (levantadasResp[0] == levantadasResp[1]) {
                acertos++
                if (acertos == 4) {
                    alert(`Parabéns você venceu!`)
                    window.document.querySelector('div.container').innerHTML = `<div class="cards" id="cards" style="cursor: auto;"><img src="images/logo.png" alt="logo-PicaPau"></div>`
                    acertos = 0
                    emJogo = 0
                    PararTimer()
                    if(melhorTempo == '00 : 00 : 00') {
                        melhorTempo.innerHTML = `${minutos} : ${segundos} : ${milisegundos}`
                    } else if (melhorTempo > `${minutos} : ${segundos} : ${milisegundos}`) {
                        melhorTempo.innerHTML = `${minutos} : ${segundos} : ${milisegundos}`
                    }
                    ResetarTimer()
                }
            } else {
                cards[levantadas[0]].innerHTML = `<img src="images/logo.png" alt="logo-PicaPau">`
                cards[levantadas[0]].style.backgroundColor = `#81ACD6`
                cards[levantadas[1]].innerHTML = `<img src="images/logo.png" alt="logo-PicaPau">`
                cards[levantadas[1]].style.backgroundColor = `#81ACD6`
            }
            contador = 0
            levantadasResp = []
            levantadas = []
        }, 1000)    
    }
}

function IniciarTimer() {
    clearInterval(interval)
    interval = setInterval(startTimer, 10)
}

function PararTimer() {
    clearInterval(interval)
}

function ResetarTimer() {
    clearInterval(interval)
    minutos = '00'
    segundos = '00'
    milisegundos = '00'

    SetMilisegundos.innerHTML = milisegundos
    SetSegundos.innerHTML = segundos
    SetMinutos.innerHTML = minutos
}

function startTimer() {
    milisegundos++

    if(milisegundos <= 9) {
        SetMilisegundos.innerHTML = `0${milisegundos}`
    }

    if(milisegundos > 9) {
        SetMilisegundos.innerHTML = `${milisegundos}`
    }

    if(milisegundos > 99) {
        segundos++
        SetSegundos.innerHTML = `0${segundos}`
        milisegundos = 0 
        SetMilisegundos.innerHTML = "0" + 0
    }

    if(segundos > 9){
        SetSegundos.innerHTML = `${segundos}`
    }

    if(segundos > 59) {
        minutos++
        SetMinutos.innerHTML = `0${minutos}`
        segundos = 0 
        SetSegundos.innerHTML = "0" + 0
    }

    if(minutos > 9){
        SetMinutos.innerHTML = `${minutos}`
    }
}