angular.module('app.services', [])

.factory('BlankFactory', [function(){

}]) /// cierre del services


.factory('LoginService',['$http', function( $http) {
  var obj = {};
  var url = "http://supervisionobras.net/tienda3/index.php/";
  var url_cadena = "http://supervisionobras.net/tienda3/formatos.php/";

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  obj.enviar = function(enviar){
    return $http.post(url + 'login/', enviar, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
  return obj;
}]) /// cierre del services

.factory('EnvioService',['$http', function( $http) {
  var obj = {};
  var url = "http://supervisionobras.net/tienda3/index.php/";

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  obj.enviar = function(enviar){
    return $http.post(url + 'envio/', enviar, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
///////////////////////////////////////////////////////
  obj.enviarcadena = function(enviarcadena){
    return $http.post(url + 'enviocadena/', enviarcadena, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
//////////////////////////////////////
///////////////////////////////////////////////////////
  obj.enviarprueba = function(enviarprueba){
    return $http.post(url + 'envioprueba/', enviarprueba, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
  //////////////////////////////////////

///////////////////////////////////////////////////////
  obj.editarinforme = function(editarinforme){
    return $http.post(url + 'editarinforme/', editarinforme, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
  //////////////////////////////////////

///////////////////////////////////////////////////////
  obj.editarformato = function(editarformato){
    return $http.post(url + 'editarformato/', editarformato, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
  //////////////////////////////////////
///////////////////////////////////////////////////////
  obj.eliminareporte = function(eliminareporte){
    return $http.post(url + 'eliminareporte/', eliminareporte, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
  //////////////////////////////////////
  ///////////////////////////////////////////////////////
  obj.eliminarformato = function(eliminarformato){
    return $http.post(url + 'eliminarformato/', eliminarformato, { timeout: 20000 })
        .success(
        function (resultados){return resultados; })
        .error(
        function (resultados){return resultados;})
        .then(function (resultados)
        {return resultados;
        }
    );
  }
  //////////////////////////////////////


  return obj;
}]) /// cierre del services


.service('BlankService', [function(){

}]); /// cierre del services

