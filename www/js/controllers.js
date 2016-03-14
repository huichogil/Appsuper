angular.module('app.controllers', [])
.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $ionicPopup, $location, $http,$ionicLoading,LoginService,EnvioService) {
  // With the new vi
  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.showConfirm = function() {
var backup=JSON.parse(window.localStorage.getItem("backup"));//extraemos la información
var i=0; 
var error=null;
try{
  var longitud=backup.length;
  error=1;
}catch(err) {    
}
if(error==null){
 $rootScope.Alertas({
  title:"Mensaje", //titulo de la alerta
  message:'No has ingresado nada' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
}
else{
 var confirmPopup = $ionicPopup.confirm({
   title: 'Sincronizar',
   template: 'Estas Seguro de Subir a Internet?'
 });
 confirmPopup.then(function(res) {
   if(res) {
//////////////////
var id=window.localStorage.getItem("idusuario");
$ionicLoading.show({
  template:'Enviando datos  <br><ion-spinner icon="bubbles" class="spiner-balanced"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga
/* $rootScope.Alertas({
  title:"Subiendo a Internet", //titulo de la alerta
  message:'Por Favor Espere...' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
*/
$timeout(function() { 
  for(i=0; i<backup.length; i++){
// aqui inicia la transferencia
if(backup[i].foto=="1" || backup[i].foto==null || backup[i].foto=="undefined"){  
  alert('foto='+"1"+'&comentario='+backup[i].comentario+'&activo='+backup[i].activo+'&usuario='+id+'&idobra='+backup[i].idobra+'&etiqueta='+backup[i].etiqueta+'&fecha='+backup[i].fecha);

  EnvioService.enviar('foto='+"1"+'&comentario='+backup[i].comentario+'&activo='+backup[i].activo+'&usuario='+id+'&idobra='+backup[i].idobra+'&etiqueta='+backup[i].etiqueta+'&fecha='+backup[i].fecha).then(function(resultados){

   if(resultados.data.res==="ok"){
/*
  $ionicLoading.show({
  template:'Subida Correctamente<br><ion-spinner icon="dots" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga 
*/

//$ionicLoading.hide();//ocutamos el loading
//alert("Ok");
}
else if(resultados.data.res==="error" || resultados.data.res ===null){
  alert("Ocurrio un error"+JSON.stringify(resultados.data.res));
}
else{
  alert("No tenemos conexion"+JSON.stringify(resultados.data.res));
}
  }); //cierre del envioservices
}else{
  var options = new FileUploadOptions();
  options.fileKey = "file";
  options.fileName = backup[i].foto.substr(backup[i].foto.lastIndexOf('/') + 1);
  options.mimeType = "image/jpeg";
  options.chukedMode=true;

  var params = new Object();
  options.params=params;
  options.params={
    "comentario": backup[i].comentario,
    "activo": backup[i].activo,
    "usuario": id,
    "idobra": backup[i].idobra,
    "etiqueta": backup[i].etiqueta,
    "fecha":backup[i].fecha

  }

//params.value1 = "test";
//params.value2 = "param";
//options.params = params;
var ft = new FileTransfer();
ft.upload(backup[i].foto , "http://supervisionobras.net/tienda3/upload.php" , win, fail, options); 

function win (r) {

 alert("Exito");

//alert("Exito");
//$rootScope.Alertas({
  //title:"Exito", //titulo de la alerta
  //message:'Se subio Correctamente ' //el mensaje que se muestra en el mensaje
//});//el cierre de la funcion de la alerta 

 // $ionicLoading.hide();//ocutamos el loading
/*
$rootScope.Alertas({
  title:"Exito", //titulo de la alerta
  message:'Se subio Correctamente cuan no tenia internet' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
*/

console.log("Code = " + r.responseCode);
console.log("Response = " + r.response);
console.log("Sent = " + r.bytesSent);
}

function fail(error) {

  alert("Ocurrio un error: Code = " + error.code);
   // $ionicLoading.hide();//ocutamos el loading
   console.log("upload error source " + error.source);
   console.log("upload error target " + error.target);
 }

}

if(i>=longitud-1){

$ionicLoading.hide();//ocutamos el loading

$rootScope.Alertas({
  title:"exito", //titulo de la alerta
  message:'subidos correctamente...' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 

window.localStorage.removeItem("backup");

}

}

},2000); //agregamos un tiempo extra para ejecucion este es el cierre del timeout

/////////////////

         //console.log('You are sure');

       } else {
         console.log('You are not sure');
       }
     });

}

};

$scope.showClose = function() {
 var confirmPopup = $ionicPopup.confirm({
   title: 'Cerrar Aplicación',
   template: 'Estas Seguro de Cerrar Session?'
 });
 confirmPopup.then(function(res) {
   if(res) {
         //console.log('You are sure');
         //alert("salio");
         window.localStorage.removeItem("verificado");
         $location.path('/app/inicio');

       } else {
         console.log('You are not sure');
         //alert("se quedo");
       }
     });
};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
//////////////////////////////
.controller('inicioCtrl', function($scope,$rootScope,$http,$ionicLoading,$timeout,$ionicPopup,$location,$ionicLoading,LoginService,EnvioService) {
$rootScope.Alertas =function(mensaje){ //se crea la funcion en rootscope para que genere la alerta
  $ionicPopup.alert({
    title: mensaje.title,
    template: mensaje.message,
        okText:'Aceptar', //el titulo del boton
        okType: 'button-positive' //este boton lo pinta de color azul
      });//cierre del popup
        };//cierre de la alerta
        $scope.CerrarApp=function(){
 // alert("esta seguro de salir");
 window.localStorage.removeItem("verificado");
 $location.path('/');
}

$scope.eliminarcache=function(){

  $rootScope.Alertas({
  title:"Exito", //titulo de la alerta
  message:'Puede Comenzar Otro Reporte Sin Internet' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
  window.localStorage.removeItem("backup");

}

$scope.sincronizar=function(){

}

var id=window.localStorage.getItem("idusuario");
$rootScope.perfil=id;

var nombre=window.localStorage.getItem("nombre");
$rootScope.nombre=nombre;

var puesto=window.localStorage.getItem("puesto");
$rootScope.puesto=puesto;

$scope.entrar=function(usuario,password){

  $ionicLoading.show({

  template:'Verificado Usuario <br><ion-spinner icon="lines" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga 

  window.localStorage.setItem("usuario",usuario);
  LoginService.enviar('username='+usuario+'&password='+password).then(function(resultados)

  {

    if(resultados.data.res==="ok"){
  $ionicLoading.hide();//ocutamos el loading

  window.localStorage.setItem("verificado", "1");
//  window.localStorage.setItem("idusu", "1");

  window.localStorage.setItem("idusu",JSON.stringify(resultados.data.datos));//guardamos la información 
var idusu=JSON.parse(window.localStorage.getItem("idusu"));//extraemos la información
$rootScope.datosusuario=idusu; //visualisamos la información

window.localStorage.setItem("idusuario", idusu[0].id );
window.localStorage.setItem("nombre", idusu[0].nombre);
window.localStorage.setItem("puesto", idusu[0].puesto );
var id=window.localStorage.getItem("idusuario");
var nombre=window.localStorage.getItem("nombre");
var puesto=window.localStorage.getItem("puesto");
$rootScope.perfil=id;
$rootScope.nombre=nombre;
$rootScope.puesto=puesto;
//alert("idusuario:"+id);

//////////////////////////////////////////////////////////////////////////
/*
var networkState = navigator.connection.type;
var states= {};
states[Connection.UNKNOWN] = 'Unknown';
states[Connection.ETHERNET] = 'Ethernet';
states[Connection.WIFI] = 'Wifi';
states[Connection.CELL_2G] = 'Cell2G';
states[Connection.CELL_3G] = 'Cell3G';
states[Connection.CELL_4G] = 'Cell4G';
states[Connection.CELL] = 'Cellgeneric';
states[Connection.NONE] = 'Nonetwork';

*/

if(1==0){//states[networkState]=='Nonetwork'){
//  $rootScope.Alertas({title:"Atencion",message:'Su dispositivo no esta conectado a una red de internet,puede qeu algunas funciones de la aplkicacion requieran '  });


//alert("estoy aqui"); navigator.notification.alert( 'Su dispositivo no esta conectado a internet puede que genere un gasto en su bolsillo', alertDismissed, 'Atencion', 'Aceptar' );

function alertDismissed(){
          //dosomething
        }
        


        if(!(window.localStorage.getItem("obras"))){
// alert('no tenemos en cache');  navigator.notification.alert( 'tenemos cache', alertDismissed, 'Atencion', 'Aceptar'   );

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
window.localStorage.setItem("obras",JSON.stringify(obras.obras));//guardamos la información 
   var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
$rootScope.obras =vistasofertas; //visualisamos la información 

  }////// cierre de if
  else{
 // alert("tenemos cache");
var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
$rootScope.obras =vistasofertas; //visualisamos la información
var vistasusuarios=JSON.parse(window.localStorage.getItem("usuarios"));//extraemos la información
$rootScope.usuarios =vistasusuarios; //visualisamos la información
var vistasformatos=JSON.parse(window.localStorage.getItem("formatos"));//extraemos la información
$rootScope.formatos =vistasformatos; //visualisamos la información
var vistasplanos=JSON.parse(window.localStorage.getItem("planos"));//extraemos la información
$rootScope.planos =vistasplanos; //visualisamos la información
$location.path('/page1/obras');
}//cierre del else

}else{

  $ionicLoading.show({

  template:'Conectando a Servidor <br><ion-spinner icon="dots" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga 

  $timeout(function() {
  // body...

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

window.localStorage.setItem("planos",JSON.stringify(data.planos));//guardamos la información 
var vistasplanos=JSON.parse(window.localStorage.getItem("planos"));//extraemos la información
$rootScope.planos =vistasplanos; //visualisamos la información

$location.path('/app/obras');
$ionicLoading.hide();//ocutamos el loading

$rootScope.Alertas({
  title:"Atención", //titulo de la alerta
  message:'Datos Actualizados correctamente' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 


}//cierre del if
}) //cierre del succes
.error(function(data,status,headers,config){

//alert("Esto no se pede actualizar");
var vistasofertas=JSON.parse(window.localStorage.getItem("ofertas"));
$rootScope.ofertas =vistasofertas;
$ionicLoading.hide();//ocutamos el loading

$location.path('/app/obras');
$rootScope.Alertas({
  title:"Atención",
  message:' Los Datos NO se Actualizaron correctamente'
});//el cierre de la funcion de la alerta 


});// cierre del error 

},2000); //agregamos un tiempo extra para ejecucion este es el cierre del timeout


}// cierre del Nonetwork 


 //window.open('/#page1/obras');
}
else if(resultados.data.res==="error" || resultados.data.res ===null){
  $rootScope.Alertas({
  title:"Datos Incorrectos", //titulo de la alerta
  message:'Verifique sus Datos' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 

$ionicLoading.hide();//ocutamos el loading
}
else{
  alert("Surgio un error");
$ionicLoading.hide();//ocutamos el loading
}
      }); //cierre del login services
    }//cierre del entrar
    $scope.misdatos=function(){

      var usuario =window.localStorage.getItem("usuario");
      alert("usuario guardado es:"+usuario);
}//cierre de mis datos


/*
$scope.CerrarApp=function(){
      alert("Deseas Salir de la Aplicacion?");
     $location.path('/page1/entrar');
      {
        */
      })
/////////////////////////////////
.controller('formatosformCtrl', function($scope,$rootScope,$http,$location,$timeout) {
  $scope.doRefresh =function(){
 // alert("estoy aqui");
  //Esta funcion esta para que se actualize al deslizar
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){

if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
//alert("funciona");
window.localStorage.setItem("obras",JSON.stringify(data.obras));//guardamos la información 
var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
$rootScope.obras =vistasofertas; //visualisamos la información
window.localStorage.setItem("reportes",JSON.stringify(data.reportes));//guardamos la información 
var vistasreportes=JSON.parse(window.localStorage.getItem("reportes"));//extraemos la información
$rootScope.reportes =vistasreportes; //visualisamos la información
window.localStorage.setItem("usuarios",JSON.stringify(data.usuarios));//guardamos la información 
var vistasusuarios=JSON.parse(window.localStorage.getItem("usuarios"));//extraemos la información
$rootScope.usuarios =vistasusuarios; //visualisamos la información
window.localStorage.setItem("formatos",JSON.stringify(data.formatos));//guardamos la información 
var vistasformatos=JSON.parse(window.localStorage.getItem("formatos"));//extraemos la información
$rootScope.formatos =vistasformatos; //visualisamos la información

window.localStorage.setItem("planos",JSON.stringify(data.planos));//guardamos la información 
var vistasplanos=JSON.parse(window.localStorage.getItem("planos"));//extraemos la información
$rootScope.planos =vistasplanos; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){
  //alert("saleindo de aqui");
  $rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally

}//cierre de la funcion de refrescar

$scope.enviarformatos=function(id){
//alert("id"+idobra);
$location.path('/app/formatosdetalle');

//var idobra=window.localStorage.getItem("idobra");
$rootScope.idformato=id;

}

$scope.datosfiltrados = [
{ text: "orienteaciÃ³n hacia el Sur", checked: false },
{ text: "inclinacion 22.5 grados con la horizonta", checked: false },
{ text: "Libre de Sombras en area de asoleamiento", checked: false }
];

})
///////////////////////////////////////
.controller('formatosCtrl', function($scope,$rootScope,$http,$location,$timeout,EnvioService,$ionicPopup) {
  $scope.enviareporte=function(idobra){
//alert("id"+idobra);
$location.path('/app/reporte');
//var idobra=window.localStorage.getItem("idobra");
$rootScope.idobra=idobra;
}
$scope.enviame=function(id,datos){
//alert("id"+id);
$location.path('/app/formatosdetalle');
$rootScope.idformato=id;
//var datos=JSON.parse(window.localStorage.getItem("formatos"[0]));
//alert(datos);
var a=datos.split(",");
$arreglo=[];
var i=0; 
for(i=0; i<a.length; i++){
  $arreglo.push({text:a[i],checked: false }); 
}
$rootScope.xd=$arreglo;
}
$scope.enviarFormato=function(valores,usuario,formato,obra,nomformato){
//var y=$rootScope.xd;
var a= JSON.stringify(valores);//guardamos la información 
var b=JSON.parse(a);//extraemos la información
//$arreglo=[];
var cadena=null;
for(i=0; i<b.length; i++){
  if(b[i].checked==true){
    cadena = cadena+','+b[i].text;
  }
}
// para enviar la cadena a php 
EnvioService.enviarcadena('cadena='+cadena+'&obra='+obra+'&usuario='+usuario+'&formato='+formato+'&nomformato='+nomformato).then(function(resultados){
  if(resultados.data.respuesta==="ok"){
    //alert("Ok"+JSON.stringify(resultados.data.res));
 $rootScope.Alertas({
  title:"Exito", //titulo de la alerta
  message:'Guardado Correctamente' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 

 $location.path('/app/informesformatos');
  }
  else if(resultados.data.respuesta==="error" || resultados.data.respuesta ===null){
    alert("Ocurrio un error"+JSON.stringify(resultados.data.respuesta));
  }
  else{
    alert("No tenemos conexion"+JSON.stringify(resultados.data.respuesta));
  }
}); //cierre del envioservices
//alert("datos id:"+cadena+obra+usuario+formato);
}//cierre de enviar formatos

$scope.doRefresh =function(){

//Esta funcion esta para que se actualize al deslizar
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
//alert("funciona");
window.localStorage.setItem("formatos",JSON.stringify(data.formatos));//guardamos la información 
var vistasformatos=JSON.parse(window.localStorage.getItem("formatos"));//extraemos la información
$rootScope.formatos =vistasformatos; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){

//alert("saleindo de aqui");
$rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally

}//cierre de la funcion de refrescar



})//cierre del controlador
////////////////////////////////////////////////////////////
.controller('obrasCtrl', function($scope,$rootScope,$http,$location,$timeout) {
  var idusa=window.localStorage.getItem("idusuario");
  $rootScope.idverificador=idusa;
  $scope.enviame=function(nomobra,idobra){
//para la funcion que este le mande el id
//alert("si llega"+idobra);
$location.path('app/opciones');
$rootScope.idobra=idobra;
$rootScope.nomobra=nomobra;
}; // cierre de la funcion de enviame
$scope.doRefresh =function(){

//Esta funcion esta para que se actualize al deslizar
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
//alert("funciona");
window.localStorage.setItem("obras",JSON.stringify(data.obras));//guardamos la información 
var vistasofertas=JSON.parse(window.localStorage.getItem("obras"));//extraemos la información
$rootScope.obras =vistasofertas; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){

//alert("saleindo de aqui");
$rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally

}//cierre de la funcion de refrescar

})//cierre del controler de Obras

//////////////////////////////////////////   
.controller('opcionesCtrl', function($scope,$rootScope,$location) {
  $scope.enviaformatos=function(idobra){
    $location.path('app/formatos');
    $rootScope.idobra=idobra;
  }
  $scope.enviaindividual=function(idobra){
    $location.path('app/informes');
    $rootScope.idobra=idobr;
  }
  $scope.reporteformatosbtn=function(idobra){
    $location.path('app/informesformatos');
    $rootScope.idobra=idobra;
  }
  $scope.enviapruebas=function(idobra){
    $location.path('app/pruebas');
    $rootScope.idobra=idobr;
  }
  $scope.enviagps=function(idobra){
    $location.path('app/gps');
    $rootScope.idobra=idobr;
  }
})
////////////////////////////////////////

////////////////////////////////////////////////
.controller('informesCtrl', function($scope,$rootScope,$location,$http,$ionicActionSheet,$timeout,EnvioService) {
 
 // Triggered on a button click, or some other target
 $scope.show = function(reporte) {
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
      { text: '<b>Ver Reporte</b> ' },
       { text: '<b>Editar Reporte</b> ' },
     ],
     destructiveText: 'Eliminar',
     cancelText: 'Cancelar',
     cancel: function() {
          // add cancel code..
        },
        destructiveButtonClicked: function() {
        //alert("eliminar"+reporte);

EnvioService.eliminareporte('&reporteid='+reporte).then(function(resultados){
  if(resultados.data.respuesta==="ok"){
    //alert("Ok"+JSON.stringify(resultados.data.res));

 $rootScope.Alertas({
  title:"Exito", //titulo de la alerta
  message:'Se Elimino Correctamente' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 

  }
  else if(resultados.data.respuesta==="error" || resultados.data.respuesta ===null){
    alert("Ocurrio un error"+JSON.stringify(resultados.data.respuesta));
  }
  else{
    alert("No tenemos conexion"+JSON.stringify(resultados.data.respuesta));
  }
}); //cierre del envioservices

        return true; //Close the model
    },
     buttonClicked: function(index) {
      switch(index){
      case 0 :
        //Handle Editar
        //alert("editar el registro"+reporte);
    //alert("quieres editar"+reporte);
    $location.path('app/verinformes');
    $rootScope.reporteid=reporte;
 
        return true;
        case 1 :
        //Handle Share Button
        $location.path('app/editarinformes');
    $rootScope.reporteid=reporte;

        return true;
}
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 3000);

 };

  $scope.editar =function(reporte){
    //alert("quieres editar"+reporte);
    $location.path('app/editarinformes');
    $rootScope.reporteid=reporte;
  }

  $scope.doRefresh =function(){
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
window.localStorage.setItem("reportes",JSON.stringify(data.reportes));//guardamos la información 
var vistasreportes=JSON.parse(window.localStorage.getItem("reportes"));//extraemos la información
$rootScope.reportes =vistasreportes; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){
  $rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally
}//cierre de la funcion de refrescar
})
//////////////////////////////////

////////////////////////////////////////////////
.controller('editarinformesCtrl', function($scope,$rootScope,$location,$http,EnvioService,$ionicPopup) {
  $scope.editarinforme =function(reporteid,comentario){
   //alert("reporteid:"+reporteid+"comentario"+comentario); 

EnvioService.editarinforme('comentario='+comentario+'&reporteid='+reporteid).then(function(resultados){
  if(resultados.data.respuesta==="ok"){
    //alert("Ok"+JSON.stringify(resultados.data.res));
    $rootScope.Alertas({
  title:"Exito", //titulo de la alerta
  message:'Se Actualizó Correctamente' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 

$location.path('app/informes');

  }
  else if(resultados.data.respuesta==="error" || resultados.data.respuesta ===null){
    alert("Ocurrio un error"+JSON.stringify(resultados.data.respuesta));
  }
  else{
    alert("No tenemos conexion"+JSON.stringify(resultados.data.respuesta));
  }
}); //cierre del envioservices

  }

  $scope.doRefresh =function(){
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
window.localStorage.setItem("reportes",JSON.stringify(data.reportes));//guardamos la información 
var vistasreportes=JSON.parse(window.localStorage.getItem("reportes"));//extraemos la información
$rootScope.reportes =vistasreportes; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){
  $rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally
}//cierre de la funcion de refrescar
})
//////////////////////////////////

////////////////////////////////////////////////
.controller('editarformatoCtrl', function($scope,$rootScope,$location,$http,EnvioService) {
  $scope.editarformato =function(formatoid,datos){

   alert("reporteid:"+reporteid+"comentario"+comentario); 

EnvioService.editarinforme('comentario='+comentario+'&reporteid='+reporteid).then(function(resultados){
  if(resultados.data.respuesta==="ok"){
    alert("Ok"+JSON.stringify(resultados.data.res));
  }
  else if(resultados.data.respuesta==="error" || resultados.data.respuesta ===null){
    alert("Ocurrio un error"+JSON.stringify(resultados.data.respuesta));
  }
  else{
    alert("No tenemos conexion"+JSON.stringify(resultados.data.respuesta));
  }
}); //cierre del envioservices

  }

  $scope.doRefresh =function(){
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
window.localStorage.setItem("reportes",JSON.stringify(data.reportes));//guardamos la información 
var vistasreportes=JSON.parse(window.localStorage.getItem("reportes"));//extraemos la información
$rootScope.reportes =vistasreportes; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){
  $rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally
}//cierre de la funcion de refrescar
})
//////////////////////////////////


///////////////////////////////////////////////
.controller('informesformatosCtrl', function($scope,$rootScope,$location,$http,EnvioService,$ionicActionSheet,$timeout) {


 // Triggered on a button click, or some other target
 $scope.editarformato = function(formatoid,datos) {
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Ver Formato</b> ' },
        { text: '<b>Editar Formato</b> ' },
     ],
     destructiveText: 'Eliminar',
     cancelText: 'Cancelar',
     cancel: function() {
          // add cancel code..
        },
        destructiveButtonClicked: function() {
        //alert("eliminar"+reporte);

EnvioService.eliminarformato('formatoid='+formatoid).then(function(resultados){
  if(resultados.data.respuesta==="ok"){
    alert("Ok"+JSON.stringify(resultados.data.res));
  }
  else if(resultados.data.respuesta==="error" || resultados.data.respuesta ===null){
    alert("Ocurrio un error"+JSON.stringify(resultados.data.respuesta));
  }
  else{
    alert("No tenemos conexion"+JSON.stringify(resultados.data.respuesta));
  }
}); //cierre del envioservices

        return true; //Close the model
    },
     buttonClicked: function(index) {
      switch(index){
      case 0 :
        //Handle Editar
        //alert("editar el registro"+reporte);
    //alert("quieres editar"+reporte);
$location.path('app/editarformato');
$rootScope.formatoid=formatoid;

var a=datos.split(",");
$arreglo=[];
var i=0; 
for(i=0; i<a.length; i++){
  $arreglo.push({text:a[i],checked: true }); 
}
$rootScope.formatoscheck=$arreglo;
        return true;
        case 1 :
        //Handle Share Button
        return true;
}
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };




////////////////////
/*
$scope.editarformato=function(formatoid,datos){

 $location.path('app/editarformato');
$rootScope.formatoid=formatoid;

var a=datos.split(",");
$arreglo=[];
var i=0; 
for(i=0; i<a.length; i++){
  $arreglo.push({text:a[i],checked: true }); 
}
$rootScope.formatoscheck=$arreglo;
}
*/
///////////////////////////////////
  $scope.doRefresh =function(){
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
window.localStorage.setItem("formatos",JSON.stringify(data.reportesformato));//guardamos la información 
var vistasreportesformato=JSON.parse(window.localStorage.getItem("formatos"));//extraemos la información
$rootScope.reportesformato =vistasreportesformato; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){
  $rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally
}//cierre de la funcion de refrescar
})
//////////////////////////////////

////////////////////////////////////
.controller('reporteCtrl', function($scope, EnvioService, $ionicLoading ,$ionicPopup,$rootScope,$location) {

$rootScope.Alertas =function(mensaje){ //se crea la funcion en rootscope para que genere la alerta
$ionicPopup.alert({
title: mensaje.title,
template: mensaje.message,
okText:'Aceptar', //el titulo del boton
okType: 'button-positive' //este boton lo pinta de color azul
});//cierre del popup        
};//cierre de la alerta
var fichero;
$scope.takeImage = function() {
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
destinationType: Camera.DestinationType.FILE_URI });
function onSuccess(imageURI) {
//alert("se tomo la foto");
document.getElementById("imagen").src=imageURI;
fichero=imageURI;
//alert("ruta de la imagen:"+fichero);
// var image = document.getElementById('myImage');
// image.src = imageURI;
// $scope.srcImage="data:image/jpeg;base64," + imageURI;
// image.src = "data:image/jpeg;base64," + imageData;
  }
function onFail(message) {
alert('Failed because: ' + message);
}
/*
var options = {
quality: 80,
destinationType: Camera.DestinationType.DATA_URL,
sourceType: Camera.PictureSourceType.CAMERA,
allowEdit: true,
encodingType: Camera.EncodingType.JPEG,
targetWidth: 250,
targetHeight: 250,
popoverOptions: CameraPopoverOptions,
saveToPhotoAlbum: true
};        
$cordovaCamera.getPicture(options).then(function(imageData) {
$scope.srcImage = "data:image/jpeg;base64," + imageData;
window.localStorage.setItem("imagenes",imageData);
}, function(err) {
// error
});
*/
}
$scope.enviarfoto=function(comentario,activo,idobra,etiqueta){
var fecha=new Date();
var year=fecha.getFullYear();
var mes=fecha.getMonth();
if(mes<=8){
var suma=mes+1;
mes="0"+suma;
}
else{
mes=mes+1;
}
var dia=fecha.getDate();
if(dia<=9){
dia="0"+dia;
}
var hora=fecha.getHours();
var minuto=fecha.getMinutes();
var segundo=fecha.getSeconds();
var fullday=year+"-"+mes+"-"+dia+" "+hora+":"+minuto+":"+segundo;
//alert(fullday);
var id=window.localStorage.getItem("idusuario");
//var idobr=window.localStorage.getItem("idobra");
$ionicLoading.show({
  template:'Guardando Imagen Espere 1<br><ion-spinner icon="bubbles" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga
//////////////////////////////////////////////////////////////////////////



















/*
var networkState = navigator.connection.type;
var states= {};
states[Connection.UNKNOWN] = 'Unknown';
states[Connection.ETHERNET] = 'Ethernet';
states[Connection.WIFI] = 'Wifi';
states[Connection.CELL_2G] = 'Cell2G';
states[Connection.CELL_3G] = 'Cell3G';
states[Connection.CELL_4G] = 'Cell4G';
states[Connection.CELL] = 'Cellgeneric';
states[Connection.NONE] = 'Nonetwork';
*/
//if(states[networkState]=='Nonetwork'){
  if(1==1){
/* var reportessinc={
      "reportessinc": [
      {
        "idusuario":id,
        "foto":"1",
        "comentario":comentario,
        "activo": activo
      },
       {
        "idusuario":id,
        "foto":"2",
        "comentario":comentario,
        "activo": activo
      }       
]
    };//cierre de la obra

    */
/*
window.localStorage.setItem("reportessinc",JSON.stringify(reportessinc.reportessinc));//guardamos la información 
   var vistareportesinc=JSON.parse(window.localStorage.getItem("reportessinc"));//extraemos la información
alert("estoy aqui"+id+comentario+activo);
$scope.reportessinc =vistareportesinc; //visualisamos la información 
//fichero=null;
*/
 //var backup=JSON.parse(window.localStorage.getItem("reportessinc"));//extraemos la información
 $arr=[];
//$backup=[];
//$arr.push({idusuario:id,foto:"1",comentario:comentario,activo:activo});
//window.localStorage.setItem("backup",JSON.stringify($backup));//guardamos la información 
if(!(window.localStorage.getItem("backup"))){
$ionicLoading.show({
template:'Guardando Imagen Espere <br><ion-spinner icon="bubbles" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga
if(fichero==null){
//alert("nulo:"+fichero);
fichero="1";
}else{
// alert("xd:"+fichero);
}
$arr.push({idusuario:id,foto:fichero,comentario:comentario,activo:activo,idobra:idobra,etiqueta:etiqueta,fecha:fullday});
window.localStorage.setItem("backup",JSON.stringify($arr));//guardamos la información 
var backup=JSON.parse(window.localStorage.getItem("backup"));//extraemos la información
$scope.reportessinc =backup; //visualisamos la información 
$ionicLoading.hide();//ocutamos el loading
$rootScope.Alertas({
title:"Exito", //titulo de la alerta
message:'Se Guardo correctamente 1' //el mensaje que se muestra en el mensaje

});

$location.path('app/exito');

}
else{
// alert("si tenemos informacion");
if(fichero==null){
// alert("nulo:"+fichero);
fichero="1";
}else{
//alert("xd:"+fichero);
}
var backup=JSON.parse(window.localStorage.getItem("backup"));//extraemos la información
var i=0; 
for(i=0; i<backup.length; i++){
$arr.push({idusuario:backup[i].idusuario,foto:backup[i].foto,comentario:backup[i].comentario,activo:backup[i].activo,idobra:backup[i].idobra,etiqueta:backup[i].etiqueta,fecha:backup[i].fecha});
//alert("datos id:"+backup[i].comentario);
}
$arr.push({idusuario:id,foto:fichero,comentario:comentario,activo:activo,idobra:idobra,etiqueta:etiqueta,fecha:fullday});
window.localStorage.setItem("backup",JSON.stringify($arr));//guardamos la información 
$rootScope.Alertas({
title:"Exito", //titulo de la alerta
message:'Se Guardo correctamente 2' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
$location.path('app/exito');
//alert("datos:"+idobras);
$ionicLoading.hide();//ocutamos el loading
// var backup=JSON.parse(window.localStorage.getItem("backup"));//extraemos la información
//$scope.reportessinc =backup; //visualisamos la información 
}
/*
var longitud=backup.length;
longitud=longitud+1;
alert("longitud:"+longitud);
alert("estoy aqui"+id+comentario+activo);
*/
}else{
if(fichero==null){
// alert("nulo:"+fichero);
fichero="1";
}else{
// alert("xd:"+fichero);
}
var options = new FileUploadOptions();
options.fileKey = "file";
options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
options.mimeType = "image/jpeg";
options.chukedMode=true;

var params = new Object();
options.params=params;
options.params={
  "comentario": comentario,
  "activo": activo,
  "usuario": id,
  "idobra": idobra,
  "etiqueta": etiqueta,
  "fecha": fullday
}
//params.value1 = "test";
//params.value2 = "param";
//options.params = params;
var ft = new FileTransfer();
ft.upload(fichero , "http://supervisionobras.net/tienda3/upload.php" , win, fail, options); 
function win (r) {
  $rootScope.Alertas({
  title:"Exito", //titulo de la alerta
  message:'Se subio Correctamente' //el mensaje que se muestra en el mensaje
});//el cierre de la funcion de la alerta 
  $ionicLoading.hide();//ocutamos el loading
  console.log("Code = " + r.responseCode);
  console.log("Response = " + r.response);
  console.log("Sent = " + r.bytesSent);
}
function fail(error) {
  alert("Ocurrio un error: Code = " + error.code);
    $ionicLoading.hide();//ocutamos el loading
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
  }
}
  /*
  EnvioService.enviar('foto='+"foto"+'&comentario='+comentario+'&activo='+activo).then(function(resultados){
   if(resultados.data.res==="ok"){
  $ionicLoading.show({
  template:'Subida Correctamente<br><ion-spinner icon="dots" class="spiner-light"></ion-spinner>'//con eso es el mensaje que se manda cuando inicia el loading
}); //el spiner es el dibujo cuando carga 
$ionicLoading.hide();//ocutamos el loading
        }
        else if(resultados.data.res==="error" || resultados.data.res ===null){
alert("Ocurrio un error");
        }
        else{
alert("No tenemos conexion");
        }
  }); //cierre del envioservices
  */
}
}) //cierre del Controlador
///////////////////      

///////////////////////////////////

.controller('pruebasCtrl', function($scope,$rootScope,$stateParams,EnvioService,$http,$timeout) {

 $scope.doRefresh =function(){
  //alert("sillega aqui");
$http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"; //permite que la palicacion acepte JSON foraneos
$http.post('http://supervisionobras.net/tienda3/obras/',{timeout:5000}) //con esta linea mandamos llamar al servidor que tiene la funcion de ofertas en el slimphp
.success(function (data, status, headers, config){
if(data.respuesta==="ok"){ //esta respueta la trae del arreglo Json del php 
window.localStorage.setItem("planos",JSON.stringify(data.planos));//guardamos la información 
var vistasplanos=JSON.parse(window.localStorage.getItem("planos"));//extraemos la información
$rootScope.planos =vistasplanos; //visualisamos la información
}//ciere del ok
})//cierre del succes
.finally(function(){
  $rootScope.$broadcast('scroll.refreshComplete');
});//cierre del finally
}//cierre de la funcion de refrescar
/*
 $scope.archivo=function(){

  $cordovaFileOpener2.open(
    '/sdcard/Download/gmail.apk',
    'application/vnd.android.package-archive'
  ).then(function() {
      // Success!
  }, function(err) {
      // An error occurred. Show a message to the user
  });
 } 
 */
/*


  $scope.enviarprueba=function(comentario){
/////////////////////////////////
EnvioService.enviarprueba('comentario='+comentario).then(function(resultados){
  if(resultados.data.respuesta==="ok"){
    alert("Ok"+JSON.stringify(resultados.data.res));
  }
  else if(resultados.data.respuesta==="error" || resultados.data.respuesta ===null){
    alert("Ocurrio un error"+JSON.stringify(resultados.data.respuesta));
  }
  else{
    alert("No tenemos conexion"+JSON.stringify(resultados.data.respuesta));
  }
}); //cierre del envioservices
}
*/
}) //cierrre del controlador
///////////////////////////////////////

.controller('exitoCtrl', function($scope, $stateParams,$location) {
$scope.volver=function(idobra){
    $location.path('app/reporte2');
    $rootScope.idobra=idobra;
    $rootScope.comentario.reset();

  }
  $scope.informes=function(idobra){
    $location.path('app/informes');
    $rootScope.idobra=idobr;
  }
  $scope.salir=function(){
    $location.path('app/obras');
    
  }

})


.controller('gpsCtrl', function($scope, $stateParams) {
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
