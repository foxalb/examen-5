
var columna="";
var caja="";
var imagen="";
// var tablero = {
//     fila: "John",
//     lastName : "Doe",
//     id       :  5566
// };


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
i=1;
  alert("hola");
  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
  },i*1000);

  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
  },i*1000);

  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
    },i*1000);

  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
  },i*1000);

  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
  },i*1000);


  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
  },i*1000);

  setTimeout(function(){
    imagen = '<div data-id="'+ 1 +'" class="row caja_dulce clase' + numero_entero_al_azar(1,4) + '"></div>';
    $(".col-"+columna).prepend(imagen);
    $(".caja_dulce").draggable();
    $(".caja_dulce").droppable();
  },i*1000);
}

function llenado_inicial(){
  colocar_dulce("1")
  colocar_dulce("2")
  colocar_dulce("3")
  colocar_dulce("4")
  colocar_dulce("5")
  colocar_dulce("6")
  colocar_dulce("7")
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
  $(".caja_dulce").empty();
  $(".panel-tablero").animate({height:'toggle',width:'toggle',opacity:'toggle'},'slow');
  $(".time").animate({opacity: '0'},'slow');
  $(".panel-score").animate({width:'100%'},'slow');
  $(".moves").animate({width:'100%'},'slow');
  $(".panel-score").prepend('<div class="fin"><h1>Juego Terminado</h1></div>');
  $(".fin").animate({width:'100%'},'slow');
  $(".fin h1").animate({color:'yellow',textAlign:'center',fontFamily:'gameFont', fontSize:'30px'},'slow');
}



//verificacion de si hay dulces en linea

// function verificacion_dulces_en_linea(){
// for (var columna = 1; columna < 8; columna++) {
//   conteo=0;
//   for (var fila = 7; fila > 0; fila--) {
//     if (fila==1 && columna==1) {
//       caja="#"+columna+"-"+fila;
//       nombre=$(caja + " img").attr('src');
//       alert(nombre);
//     }
//   }
// }
// }
//

function reiniciar(){
  $(".caja_dulce").empty();
  $("#movimientos-text").html("0");
  $("#movimientos-text").html("0");
  $("#score-text").html("0");
  llenado_inicial()
}


$(document).ready(function(){

animacion_letras() //llamado de funcion de animacion de letras del titulo


$(".btn-reinicio").click(function(){
var inicio=24; //segundos en los que comienza el reloj

  if ($(this).html()=="Iniciar") {
      // llenado_inicial()
      $(this).html("Reiniciar");
      conteo1(inicio)  //inicio del contador en segundos
  }else {
      // reiniciar()
      conteo1(inicio) //inicio del contador en segundos
  }


})  //inicializacion de boton




// verificacion_dulces_en_linea()

});
