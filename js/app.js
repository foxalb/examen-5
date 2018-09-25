


//inicio animacion letras del titulo
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

//fin de animacion de letras del titulo





// inicio llenado de columnas con caramelos al azar

function numero_entero_al_azar(minimo,maximo) {  //elige un numero entero al azar
  return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}

function colocar_dulce(columna){
for (var i = 0; i < 7; i++) {
  setTimeout(function(i){

  imagen = '<img src="image/' + numero_entero_al_azar(1,4) + '.png" class="caramelito"/>'

  // imagen = '<img src="image/' + numero_entero_al_azar(1,4) + '.png" class="caramelito"/>';

  $(columna).prepend(imagen);
  $(".caramelito").draggable();
},i*150);
}
}

function llenado_inicial(){
colocar_dulce(".col-1")
colocar_dulce(".col-2")
colocar_dulce(".col-3")
colocar_dulce(".col-4")
colocar_dulce(".col-5")
colocar_dulce(".col-6")

}

//fin de llenado de columnas inicial



$(document).ready(function(){


$(".btn-reinicio").click(function(){llenado_inicial()})  //inicializacion de boton

animacion_letras() //llamado de funcion de animacion de letras del titulo


$(".caramelito").draggable();

// $(".col-7").droppable()

$(".caramelito").droppable({
  drop: function(event, ui){
    $(ui.draggable)
      .css({
        width: "100%",
        position: "relative",
        left: "auto",
        top: "auto"
      })
      .appendTo($(this))
  }
});



// $(".caramelito")
//   .draggable({
//     start: function(){
//       $(this)
//         .off("click")
//         .css("z-index","2")
//     }
//   })





    // hasta aqui



});
