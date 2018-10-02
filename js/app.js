var info_arrastrado = {columna: 0, fila: 0, imagen: 0}
var info_movido = {columna: 0, fila: 0, imagen: 0}


//animacion de letras
function animacion_letras(){setTimeout(function(){
  $(".main-titulo").css("color","white");
  titulo_amarillo()
},2000);
}

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


//Llenar el tablero de caramelos
function llenado_inicial(){
  for (let i = 1; i <= 7; i++) { //por columnas
    for (let j = 7; j >= 1; j--) {//por filas
      $('.col-'+i).append(colocar_dulce(j))
    }
  }
}


//Funcion que retorna un elemento html con un dulce aleatorio
function colocar_dulce(fila,modo="aleatorio",nombre_imagen=0){
var html_para_agregar="";
  if(modo === "aleatorio"){
    nombre_imagen = numero_entero_al_azar(1,4);
  }
  html_para_agregar =  '<div class="candycru fila'+fila+'"><img src="image/'+nombre_imagen+'.png" alt=""></div>'
  return html_para_agregar
}


// crea un numero entero al azar
function numero_entero_al_azar(minimo,maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}



//verifica combos y actualiza tablero (completa dulces)
function actualizar_puntaje(){
  aplicar_animacion(seleccionar_combos())
  asignacion_de_eventos_drag_drop()
}


//aplica animacion
function aplicar_animacion(Combos_seleccionados){
  for (let i = 0; i < Combos_seleccionados.length; i++) {
    if (i == Combos_seleccionados.length - 1) {
      $(Combos_seleccionados[i]).delay(200).effect('explode',800,function(){
        revisar_dulces_y_tablero()
        valor=Combos_seleccionados.length*2
        Puntaje(Combos_seleccionados.length*2,'#score-text')
      })
    } else {
      $(Combos_seleccionados[i]).delay(200).effect('explode',800)
    }
  }
}

//cuales dulces hacen combo (alineados de 3 o mas)
function seleccionar_combos(){
  var Combos = []
  for (let i = 1; i <= 7; i++) { //por columnas
    for (let j = 1; j <= 5; j++) { //por filas
      var Posicion_actual  = '.fila'+j+' img'
      var Posicion_1='.fila'+(j+1)+' img'
      var Posicion_2='.fila'+(j+2)+' img'
      var dulce1 = $('.col-'+i).find(Posicion_actual).attr('src')
      var dulce2 = $('.col-'+i).find(Posicion_1).attr('src')
      var dulce3 = $('.col-'+i).find(Posicion_2).attr('src')
      if((dulce1 == dulce2) && (dulce2 == dulce3)){
        if (!Combos.includes('.col-'+i+' '+Posicion_actual)) {Combos.push('.col-'+i+' '+Posicion_actual) }
        if (!Combos.includes('.col-'+i+' '+Posicion_1))   {Combos.push('.col-'+i+' '+Posicion_1) }
        if (!Combos.includes('.col-'+i+' '+Posicion_2))   {Combos.push('.col-'+i+' '+Posicion_2) }
      }
    }
  }
  //Validación por filas
  for (let i = 1; i <= 7; i++) { //por filas
    var fila = $('.fila'+i);
    for (let j = 1; j <= 5; j++) {//por columnas
      var Posicion_actual  = '.col-'+j+' .fila'+i+' img'
      var Posicion_1    = '.col-'+(j+1)+' .fila'+i+' img'
      var Posicion_2    = '.col-'+(j+2)+' .fila'+i+' img'
      var dulce1 = $(Posicion_actual).attr('src')
      var dulce2 = $(Posicion_1).attr('src')
      var dulce3 = $(Posicion_2).attr('src')
      if((dulce1 == dulce2) && (dulce2 == dulce3)){
        if (!Combos.includes(Posicion_actual)){Combos.push(Posicion_actual) }
        if (!Combos.includes(Posicion_1)){Combos.push(Posicion_1) }
        if (!Combos.includes(Posicion_2)){Combos.push(Posicion_2) }
      }
    }
  }
  return Combos;
}


//Función que evalua estado de los dulces, los mueve y completa faltantes
function revisar_dulces_y_tablero(){
  var dulce_1 = undefined
  var dulce_2 = undefined
  var factor = 0
  var antifactor = 0
  var matriz_generada = undefined

  for (let col = 1; col <= 7; col++) { //por columnas
    for (let row = 1; row <= 8; row++) { //por fila
      var filai = $('.col-'+col).find('.fila'+row+' img')
      if (filai.is(':hidden')) {
        factor += 1;
        if (dulce_1 == undefined) { dulce_1 = filai; }
      }
      else if (row == 8){
        if((dulce_1!=undefined)&&(dulce_2==undefined)){

          filai = $('.col-'+col).find('.fila'+(row-1)+' img')
          dulce_1 = filai; dulce_2 = filai
          var desplazamiento = (96*factor).toString()
          dulce_2.animate(
            {
              top: desplazamiento
            },500 , function(){
             if (matriz_generada == undefined ) {
                matriz_generada = actualizar_html()
                rellenar_de_nuevo(matriz_generada)
              }
            })
        }
      }
      else{
        if (dulce_1 != undefined) {
          dulce_2 = filai
          dulce_1.clone().insertAfter(dulce_2)
          var desplazamiento = (96*factor).toString()
          dulce_2.animate(
            {
              top: desplazamiento
            },400, function(){
              if (matriz_generada == undefined ) {
                matriz_generada = actualizar_html()
                rellenar_de_nuevo(matriz_generada)
              }
            })
          row = 0
          dulce_1 = undefined
          dulce_2 = undefined
          antifactor -= 1
          factor = antifactor
        }
      }
    }
    dulce_1 = undefined
    dulce_2 = undefined
    factor = 0
    antifactor = 0
  }
}



//revisa elementos vivos en pantalla luego de los combos e indica donde agragar dulces
function actualizar_html(){
    var col_lista = []
    var matriz = []

    for (let columna = 1; columna <= 7; columna++) { //por columna
      for (let fila = 1; fila <= 7; fila++) {   //por fila
        var filai = $('.col-'+columna).find('.fila'+fila+' img')

        if (filai.length == 2) {
          if (!filai.eq(0).is(':hidden')) {
            col_lista.push(filai.eq(0).attr('src'))
          }
        } else {
          if (!filai.is(':hidden')) {
            col_lista.push(filai.attr('src'))
          }
        }
      }
      matriz.push(col_lista)
      col_lista = []
    }
    return matriz
}


//coloca nuevos dulces
function rellenar_de_nuevo(matriz){
  for (let i = 1; i <= 7; i++) { //por columnas
    $('.col-'+i).find("div").remove()
    for (let j = 7; j >= 1; j--) {//por fila
      if (matriz[i-1][j-1] == undefined) {
        $('.col-'+i).append(colocar_dulce(j))
      } else {
        var numero_imagen = matriz[i-1][j-1].substring(6,7)
        $('.col-'+i).append(colocar_dulce(j,'no',numero_imagen))
      }
    }
  }
  actualizar_puntaje();
}



//actualiza el puntaje (1caramelo vale 2 puntos)
function Puntaje(combos,de_donde){
  if(combos=="reset"){
    $(de_donde).text("0")
  }
  else{
    var Puntaje_actual = $(de_donde).text()
    var Total = Number(Puntaje_actual)+combos;
    $(de_donde).text(Total.toString())
  }
}


  function asignacion_de_eventos_drag_drop(){

    $('div[class^="col"]').find("div img").draggable({
      start: function(event){
        info_arrastrado.columna = $(event.target).parent().parent().attr('class').substring(4)
        info_arrastrado.fila  = $(event.target).parent().attr('class').substring(13,14)
        info_arrastrado.imagen  = $(event.target).attr('src')
      }
    });
    $('div[class^="col"]').find("div img").droppable({
      tolerance: "intersect",
      drop: function(event){
        info_movido.columna = $(event.target).parent().parent().attr('class').substring(4)
        info_movido.fila  = $(event.target).parent().attr('class').substring(13,14)
        info_movido.imagen  = $(event.target).attr('src')
        puedo_moverme()
      }
    });
  }


  //es valida la jugada???
  function puedo_moverme(){
    Puntaje(1,'#movimientos-text')
    var X_adonde = info_movido.columna - info_arrastrado.columna
    var Y_adonde = info_movido.fila - info_arrastrado.fila
    if (Math.abs(X_adonde)==1 && Y_adonde==0) {
      animar_dulce(-X_adonde,Y_adonde)
    }
    else if (Math.abs(Y_adonde)==1 && X_adonde==0) {
      animar_dulce(X_adonde,Y_adonde)
    } else {
      $('.col-'+info_arrastrado.columna+' .fila'+info_arrastrado.fila+' img').animate({
        top: 0,
        left: 0
      },200)
    }
  }


  //realiza animacion de dulces (como se mueven)
  function animar_dulce(sentido_X,sentido_Y){
    var top1 = sentido_Y*96;
    var left1 = (sentido_X*100).toString()+'%';
    $('.col-'+info_movido.columna+' .fila'+info_movido.fila+' img').animate({
      top: top1,
      left: left1
    },250,function(){
      moverse()
    })
  }


  //cambio de aspecto real en html
  function moverse(){
    $('.col-'+info_arrastrado.columna+' .fila'+info_arrastrado.fila).find('img').detach()
    $('.col-'+info_movido.columna+' .fila'+info_movido.fila).find('img').detach()
    $('.col-'+info_arrastrado.columna+' .fila'+info_arrastrado.fila).append('<img src="'+info_movido.imagen+'">')
    $('.col-'+info_movido.columna+' .fila'+info_movido.fila).append('<img src="'+info_arrastrado.imagen+'">')
    actualizar_puntaje()
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
    $(".panel-tablero").animate({height:'0px',width:'0px',opacity:'0.0'},'slow');
    $(".time").animate({opacity: '0'},'slow');
    $(".panel-score").animate({width:'100%'},'slow');
    $(".moves").animate({width:'100%'},'slow');
    $(".panel-score").prepend('<div class="fin"><h1 class="findeljuego">Juego Terminado</h1></div>');
    $(".fin").animate({width:'100%'},'slow');
  }





//inicializacion de pagina
$(document).ready(function(){
  var inicio=120; //segundos en los que comienza el reloj
  //cambiar color del titulo
  animacion_letras()
  //click del boton inicio
  $('.btn-reinicio').on('click',function(){
    if ($(this).text() == "Iniciar") { //inicia juego
      $(this).text('Reiniciar'); //cambia el texto
      llenado_inicial()
      actualizar_puntaje()
      conteo1(inicio)
    }
    else { //reinicia juego
      location.reload()
    }
  })

})
