var tablero=new Array(8);
var dragSrcEl = null;
var quien_se_arrastra=0;
var id_quien_se_arrastra=""
var X_arrastrado=0;
var Y_arrastrado=0;
var quien_se_mueve=0;
var id_quien_se_mueve=""
var X_adonde_se_mueve=0;
var Y_adonde_se_mueve=0;
var conteo_de_caramelos=0;
var conteo_de_cajas=0;
var movimientos=0;
var puntaje=0;


//guardamos el contenido que queremos cambiar para la transferencia al dejar de arrastrar
function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  X_arrastrado=this.firstElementChild.x;
  Y_arrastrado=this.firstElementChild.y;
  // id_quien_se_arrastra=this.firstElementChild.attributes["0"].nodeValue;
  // quien_se_arrastra=Number(this.firstElementChild.dataset.id);//anota el data-id de la imagen que se mueve
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';  //efecto al mover
  return false;
}


function handleDragLeave(e) {
  this.classList.remove('over'); //eliminamos borde rojo en el estilo css
}


function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); //evitamos abrir contenido en otra pagina al soltar
  }
	//hacemos el intercambio de contenido html de el elemento origne y destino
	if (dragSrcEl != this){
    X_adonde_se_mueve=this.firstElementChild.x;
    Y_adonde_se_mueve=this.firstElementChild.y;
    if ((X_adonde_se_mueve===X_arrastrado)&&(Y_adonde_se_mueve!=Y_arrastrado)){
      resultado=Y_arrastrado-Y_adonde_se_mueve;
      if ((resultado===74)||(resultado===-74)||(resultado===-75)||(resultado===75)){
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.classList.remove('over');
        movimientos=movimientos+1;
        $("#movimientos-text")["0"].innerText=movimientos;
      }
    }
    else {
      if ((Y_adonde_se_mueve===Y_arrastrado)&&(X_adonde_se_mueve!=X_arrastrado)){
        resultado=X_arrastrado-X_adonde_se_mueve;
        if ((resultado===118)||(resultado===-118)||(resultado===-118)||(resultado===118)){
          dragSrcEl.innerHTML = this.innerHTML;
          this.innerHTML = e.dataTransfer.getData('text/html');
          this.classList.remove('over');
          movimientos=movimientos+1;
          $("#movimientos-text")["0"].innerText=movimientos;
        }
      }
    }
	}
  verificar_combos()
  return false;
}


////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//animacion de letras

function titulo_amarillo(){setTimeout(function(){
   $(".main-titulo").css("color","yellow");
   titulo_blanco()
 },500);
}

function titulo_blanco(){setTimeout(function(){
   $(".main-titulo").css("color","white");
   titulo_amarillo()
 },500);
}

function animacion_letras(){setTimeout(function(){
  $(".main-titulo").css("color","white");
  titulo_amarillo()
},2000);
}

// crea un numero entero al azar

function numero_entero_al_azar(minimo,maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}


//colocar la matriz Tablero inicializada
function inicializar_matriz_tablero(){
  for (i = 1; i < 8; i++){
    tablero[i]= new Array(8);
  }
  for (i = 1; i < 8; i++){ //por columnas
    for (var j = 1; j < 8; j++){//por filas
      tablero[i][j]={id_div:"", nombreimagen:""};
    }
  }
}


//llena o reinicia el tablero
function llenado_inicial(){
var numero_imagen=0;
  for (var i = 1; i <= 7 ; i++) {//por columnas
    for (var j = 1; j <= 7 ; j++) {//por filas
      conteo_de_caramelos=conteo_de_caramelos+1;
      conteo_de_cajas=conteo_de_cajas+1;
      numero_imagen=numero_entero_al_azar(1,4);
      imagen = '<div id="div' + conteo_de_cajas + '" class="caja_dulce" draggable="true"><img id="' + conteo_de_caramelos + '"class="caramelito" src="image/' + numero_imagen + '.png"></div>';
      $(".col-"+i).prepend(imagen);
    }
  }
}


//llenado inicial o de reinicio del Tablero
function colocar_dulce(columna){
  conteo_de_caramelos=conteo_de_caramelos+1;
  conteo_de_cajas=conteo_de_cajas+1;
  numero_imagen=numero_entero_al_azar(1,4);
  imagen = '<div id="div' + conteo_de_cajas + '" class="caja_dulce" draggable="true"><img id="' + conteo_de_caramelos + '"class="caramelito" src="image/' + numero_imagen + '.png"></div>';
  $(".col-"+columna).prepend(imagen);
}




//verificar combos disponibles

 function verificar_combos(){

   var para_eliminar=new Array(300);
   var divs;
   var valor1;
   var valor2;
   var valor3;
   var conteo_eliminados=0;
   var se_elimino="no";

do {
   //limpio el Tablero
  conteo_eliminados=0
  for (i = 1; i < 8; i++){ //por columnas
    for (var j = 1; j < 8; j++){//por filas
      tablero[i][j].id_div="";
      tablero[i][j].nombreimagen="";
    }
  }
  //llenar la matrix para luego revisarla

   for (var i = 1; i < 8; i++) {
      divs=$("div.col-"+i).children('div');
      for (var j = 0; j < divs.length; j++) {
        tablero[i][7-j].id_div=divs[j].id;
        tablero[i][7-j].nombreimagen=$("#"+divs[j].id).find("img").attr("src");
      }
    }

 // reviso por  filas
   for (var i = 1; i < 8; i++) {
     for (var j = 1; j < 6; j++) {
       valor1=tablero[i][j].nombreimagen;
       valor2=tablero[i][j+1].nombreimagen;
       valor3=tablero[i][j+2].nombreimagen;
       if ((valor1===valor2)&&(valor2===valor3)) {
         for (var x = 0; x < 3; x++) {
           conteo_eliminados=conteo_eliminados+1;
           para_eliminar[conteo_eliminados]=tablero[i][j+x].id_div;
         }
       }
     }
   }

   //reviso por  columnas
     for (var i = 1; i < 8; i++) {
       for (var j = 1; j < 6; j++) {
         valor1=tablero[j][i].nombreimagen;
         valor2=tablero[j+1][i].nombreimagen;
         valor3=tablero[j+2][i].nombreimagen;
         if ((valor1===valor2)&&(valor2===valor3)) {
           for (var x = 0; x < 3; x++) {
             conteo_eliminados=conteo_eliminados+1;
             para_eliminar[conteo_eliminados]=tablero[j+x][i].id_div;
           }
         }
       }
     }
     //elimina combos
     if (conteo_eliminados>0) {
       for (var i = 1; i <= conteo_eliminados; i++) {
         $("#"+para_eliminar[i]).delay(800*i).fadeOut(0);
         $("#"+para_eliminar[i]).detach();
         se_elimino="si";
         puntaje=puntaje+(conteo_eliminados*20);//cada dulce eliminado vale 20 puntos
         score-text
       }
     }

} while (conteo_eliminados=0);
if (se_elimino==="si"){
  rellenar()
}
}




//rellenar luego de eliminar combos
function rellenar(){
var divs;
for (var i = 1; i < 8; i++) {
  divs=$("div.col-"+i).children('div')
  if (divs.length!=0 ){
    for (var j = 1; j <= 7-divs.length; j++) {
      colocar_dulce(i)
    }
  }
}
eventos()
verificar_combos()
}


//asignar evento pordrag and drop

function eventos(){

  cols = document.querySelectorAll("div[class^='col'] .caja_dulce");

  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
  });

}


//inicio del reloj en retroceso
function conteo1(tiempo){setTimeout(function(){
  tiempo-=1;
  segundos=tiempo%60;
  minutos=(tiempo-(tiempo%60))/60;
  if (segundos<10) {
    $("#timer").html("0"+minutos+":0"+segundos);
  }else {
    $("#timer").html("0"+minutos+":"+segundos);
  }
  if ($("#timer").html()=="00:00") {
    fin_del_juego()
    return
  }
  conteo2(tiempo)
 },1000);
}

function conteo2(tiempo){setTimeout(function(){
  tiempo-=1;
  segundos=tiempo%60;
  minutos=(tiempo-(tiempo%60))/60;
  if (segundos<10) {
    $("#timer").html("0"+minutos+":0"+segundos);
  }else {
    $("#timer").html("0"+minutos+":"+segundos);
  }
  if ($("#timer").html()=="00:00") {
    fin_del_juego()
    return
  }
  conteo1(tiempo)
 },1000);
}


//proceso al finalizar el tiempo
function fin_del_juego(){
  $(".caja_dulce").detach();
  $(".panel-tablero").animate({height:'toggle',width:'toggle',opacity:'toggle'},'slow');
  $(".time").animate({opacity: '0'},'slow');
  $(".panel-score").animate({width:'100%'},'slow');
  $(".moves").animate({width:'100%'},'slow');
  $(".panel-score").prepend('<div class="fin"><h1>Juego Terminado</h1></div>');
  $(".fin").animate({width:'100%'},'slow');
  $(".fin h1").animate({color:'yellow',textAlign:'center',fontFamily:'gameFont', fontSize:'30px'},'slow');
}







//inicializacion

$(document).ready(function(){

animacion_letras() //llamado de funcion de animacion de letras del titulo

inicializar_matriz_tablero()//llama funcion para inicializar la matriz del tablero




$(".btn-reinicio").click(function(){
var inicio=24; //segundos en los que comienza el reloj

  if ($(this).html()=="Iniciar") {
      conteo_de_caramelos=0;
      conteo_de_cajas=0;
      llenado_inicial()
      $(this).html("Reiniciar");
      verificar_combos()
      conteo1(30)  //inicio del contador en segundos

  }else {
      verificar_combos()
  }

  eventos()
})

});
