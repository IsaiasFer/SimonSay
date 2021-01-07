const btnEmpezar=document.getElementById("btnEmpezar")
const celeste=document.getElementById("celeste")
const violeta=document.getElementById("violeta")
const naranja=document.getElementById("naranja")
const verde=document.getElementById("verde")
const ULTIMO_NIVEL=parseInt(prompt("cuantos niveles quieres?"))
document.getElementById("NumeroDeNiveles").innerHTML=ULTIMO_NIVEL
var contador=0

class Juego{
    constructor(){
        this.inicializar=this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuency()
        setTimeout(this.siguienteNivel(),50)
        }
    inicializar(){
        this.siguienteNivel=this.siguienteNivel.bind(this)
        this.elegirColor=this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel=1
        this.colores={
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains("hide")){
            btnEmpezar.classList.remove("hide")
        }else{
            btnEmpezar.classList.add("hide")
        }
    }
    generarSecuency(){
        this.secuency=new Array(ULTIMO_NIVEL).fill(0).map(n=>Math.floor(Math.random()*4))}
    siguienteNivel(){
        this.cambiarContador()
        this.subnivel=0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(num){
        switch(num){
            case 0:return "celeste"
            case 1:return "violeta"
            case 2:return "naranja"
            case 3:return "verde"
        }
    }
    transformarColorANumber(color){
        switch(color){
            case "celeste":return 0 
            case "violeta":return 1
            case "naranja":return 2
            case "verde":return 3
        }
    }
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {
            const color=this.transformarNumeroAColor(this.secuency[i])
            setTimeout(()=>{this.iluminarColor(color)},500*i)
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add("light")
        setTimeout(()=>this.apagarColor(color),250)
    }
    apagarColor(color){
        this.colores[color].classList.remove("light")
    }
    agregarEventosClick(){
        this.colores.celeste.addEventListener("click",this.elegirColor)
        this.colores.verde.addEventListener("click",this.elegirColor)
        this.colores.naranja.addEventListener("click",this.elegirColor)
        this.colores.violeta.addEventListener("click",this.elegirColor)
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener("click",this.elegirColor)
        this.colores.verde.removeEventListener("click",this.elegirColor)
        this.colores.naranja.removeEventListener("click",this.elegirColor)
        this.colores.violeta.removeEventListener("click",this.elegirColor)
    }
    cambiarContador(){
        contador++
        document.getElementById("NumeroDeNivel").innerHTML=contador
    }
    elegirColor(ev){
        const nombreColor=ev.target.dataset.color
        const numeroColor =this.transformarColorANumber(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor===this.secuency[this.subnivel]){   
            this.subnivel++
            if(this.subnivel===this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel===(ULTIMO_NIVEL+1)){
                    contador=0
                    this.ganoElJuego()
                }else{
                    setTimeout(this.siguienteNivel,700)
                }
            }
        }else{
            contador=0
            this.PerdioElJuego()
        }
    }
    ganoElJuego(){
        swal("Oh si","Felicitaciones ,Ganaste el juego","success")
        .then(this.inicializar)
    }  
    PerdioElJuego(){
        swal("Oh Rayos","Lo lamentamos,Perdiste el juego :(","error")
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}
function empezarJuego(){
    window.juego=new Juego
}
colores=[celeste,violeta,naranja,verde]