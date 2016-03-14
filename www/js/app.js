// Ionic aqui empieza todo
//desarrollada por huichogil
angular.module('app', ['ionic', 'app.controllers','app.services','app.routes'])
.run(function($ionicPlatform,$rootScope,$http,$ionicLoading,$timeout,$ionicPopup,$location,$ionicViewService) {
$ionicPlatform.ready(function() {
// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
if (window.cordova && window.cordova.plugins.Keyboard) {
cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
cordova.plugins.Keyboard.disableScroll(true);
}
if (window.StatusBar) {
// org.apache.cordova.statusbar required
StatusBar.styleDefault();
}
//////Comprovamos si esta guardado algun usuario
var verificado= window.localStorage.getItem("verificado");
if(verificado=='1'){
//en caso de estarlo lo manda a obras
$ionicViewService.nextViewOptions({
disableAnimate: false,
disableBack: true
});  
$location.path('/app/obras');

var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown';
      states[Connection.ETHERNET] = 'Ethernet';
      states[Connection.WIFI]     = 'WiFi';
      states[Connection.CELL_2G]  = 'Cell2G';
      states[Connection.CELL_3G]  = 'Cell3G';
      states[Connection.CELL_4G]  = 'Cell4G';
      states[Connection.CELL]     = 'Cellgeneric';
      states[Connection.NONE]     = 'Nonetwork';
    //  if(states[networkState]=='Nonetwork'){
        
if(1==1){
//if(states[networkState]=='Nonetwork'){
  //$rootScope.Alertas({title:"Atencion",message:'Su dispositivo no esta conectado a una red de internet,puede qeu algunas funciones generen cargos a su operador '  });
//alert("estoy aqui"); navigator.notification.alert( 'Su dispositivo no esta conectado a internet puede que genere un gasto en su bolsillo', alertDismissed, 'Atencion', 'Aceptar' );

function alertDismissed(){
          //dosomething
        }
//Si no Tenemos Cache entra a este apartado para que muestre algo
if(!(window.localStorage.getItem("obras"))){
 //alert('no tenemos en cache');  navigator.notification.alert( 'tenemos cache', alertDismissed, 'Atencion', 'Aceptar'   );
 var obras={
  "obras": [
  {
    "id":"0",
    "nomobra":"Obra en Guadalupe",
    "constructora":"plata",
    "ubicacion":" Guadalupe Zacatecas"
  },
  {
    "id":"1",
    "nomobra":"Obra en Zacatecas",
    "constructora":"grupo loco",
    "descripcion":"Calera Zacatecas"
  }
  ]
    };//cierre de la obra
 //Guardamos en cache los datos    
    window.localStorage.setItem("obras",JSON.stringify(obras.obras));//guardamos la información 
    var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
    $rootScope.obras =vistasofertas; //visualisamos la información 
  }////// cierre de if de localstorage
 //En caso de tener cache 
 else{
var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
$rootScope.obras =vistasofertas; //visualisamos la información
var vistasreportes=JSON.parse(window.localStorage.getItem("reportes"));//extraemos la información
$rootScope.reportes =vistasreportes; //visualisamos la información
var vistasreportesformato=JSON.parse(window.localStorage.getItem("reportesformato"));//extraemos la información
$rootScope.reportesformato =vistasreportesformato; //visualisamos la información
var vistasusuarios=JSON.parse(window.localStorage.getItem("usuarios"));//extraemos la información
$rootScope.usuarios =vistasusuarios; //visualisamos la información
var vistasformatos=JSON.parse(window.localStorage.getItem("formatos"));//extraemos la información
$rootScope.formatos =vistasformatos; //visualisamos la información
var vistasplanos=JSON.parse(window.localStorage.getItem("planos"));//extraemos la información
$rootScope.planos =vistasplanos; //visualisamos la información
$location.path('/app/obras');
}//cierre del else
//alert("no tenemos internet");
}// cierre del if del notnetwork
else{
//////// ???????? Este no se  creo que el else de notnetwork
$ionicLoading.show({
  template:'Conectando a Servidor <br><ion-spinner icon="dots" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga 
$timeout(function() {
//esto hace la funcion del la conceccion para traer los Json
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/index.php/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
//alert("funciona");
window.localStorage.setItem("obras",JSON.stringify(data.obras));//guardamos la información 
var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
$rootScope.obras =vistasofertas; //visualisamos la información
window.localStorage.setItem("usuarios",JSON.stringify(data.usuarios));//guardamos la información 
var vistasusuarios=JSON.parse(window.localStorage.getItem("usuarios"));//extraemos la información
$rootScope.usuarios =vistasusuarios; //visualisamos la información
window.localStorage.setItem("formatos",JSON.stringify(data.formatos));//guardamos la información 
var vistasformatos=JSON.parse(window.localStorage.getItem("formatos"));//extraemos la información
$rootScope.formatos =vistasformatos; //visualisamos la información
window.localStorage.setItem("reportes",JSON.stringify(data.reportes));//guardamos la información 
var vistasreportes=JSON.parse(window.localStorage.getItem("reportes"));//extraemos la información
$rootScope.reportes =vistasreportes; //visualisamos la información
window.localStorage.setItem("planos",JSON.stringify(data.planos));//guardamos la información 
var vistasplanos=JSON.parse(window.localStorage.getItem("planos"));//extraemos la información
$rootScope.planos =vistasplanos; //visualisamos la información
$ionicLoading.hide();//ocutamos el loading
$location.path('/app/obras');
$rootScope.Alertas({
  title:"Atención", //titulo de la alerta
  message:'Datos Actualizados correctamente' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
}//cierre del if de la respuesta del OK
}) //cierre del succes si trajo datos
.error(function(data,status,headers,config){
//alert("Esto no se pede actualizar");
var vistasofertas=JSON.parse(window.localStorage.getItem("ofertas"));
$rootScope.ofertas =vistasofertas;
$ionicLoading.hide();//ocutamos el loading
$location.path('/app/obras');
$rootScope.Alertas({
  title:"Atención",
  message:' No estas Conectado a Internet'
});//el cierre de la funcion de la alerta 
});// cierre del error 
},3000); // este es el cierre del timeout
}// cierre del else Nonetwork 
} /// deveria ser el cierre el if de verificado
else{ // este else no se por que esta aqui
//alert("ninguno esta aqui");
}
});
})
