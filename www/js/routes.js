angular.module('app.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
 
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.obras', {
    url: '/obras',

    views: {
      'menuContent': {
        templateUrl: 'templates/obras.html',
        controller: 'obrasCtrl'
      }
    }
  })

  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html'
      }
    }
  })

  .state('app.opciones', {
    url: '/opciones',

    views: {
      'menuContent': {
        templateUrl: 'templates/opciones.html',
        
      }
    }
  })

  .state('app.formatos', {
    url: '/formatos',

    views: {
      'menuContent': {
        templateUrl: 'templates/formatos.html',
        controller: 'formatosCtrl'
        
      }
    }
  })


  .state('app.pruebas', {
    url: '/pruebas',

    views: {
      'menuContent': {
        templateUrl: 'templates/pruebas.html',
        controller: 'pruebasCtrl'
      }
    }
  })
////////////////////////////////
.state('app.informes', {
  url: '/informes',

  views: {
    'menuContent': {
      templateUrl: 'templates/informes.html',
      controller: 'informesCtrl'

    }
  }
})

//////////////
.state('app.informesformatos', {
  url: '/informesformatos',

  views: {
    'menuContent': {
      templateUrl: 'templates/informesformatos.html',
      controller: 'informesformatosCtrl'

    }
  }
})
////////////////////

//////////////
.state('app.editarinformes', {
  url: '/editarinformes',

  views: {
    'menuContent': {
      templateUrl: 'templates/editarinformes.html',
      controller: 'editarinformesCtrl'

    }
  }
})
////////////////////


//////////////
.state('app.gps', {
  url: '/gps',

  views: {
    'menuContent': {
      templateUrl: 'templates/gps.html',
      controller: 'gpsCtrl'

    }
  }
})
////////////////////


//////////////
.state('app.verinformes', {
  url: '/verinformes',

  views: {
    'menuContent': {
      templateUrl: 'templates/verinformes.html',
      controller: 'editarinformesCtrl'

    }
  }
})
////////////////////

//////////////
.state('app.editarformato', {
  url: '/editarformato',

  views: {
    'menuContent': {
      templateUrl: 'templates/editarformatos.html',
      controller: 'editarformatoCtrl'

    }
  }
})
////////////////////
/*
//////////////
.state('app.exito', {
    url: '/exito',
   
    views: {
      'menuContent': {
        templateUrl: 'templates/exito.html',
        controller: 'exitoCtrl'

      }
    }
  })
////////////////////
*/

.state('app.browse', {
  url: '/browse',
  views: {
    'menuContent': {
      templateUrl: 'templates/browse.html'
    }
  }
})
.state('app.playlists', {
  url: '/playlists',
  views: {
    'menuContent': {
      templateUrl: 'templates/playlists.html',
      controller: 'PlaylistsCtrl'
    }
  }
})

.state('app.inicio', {
  url: '/inicio',
  views: {
   'menuContent': {
    templateUrl: 'templates/inicio.html',
    controller: 'inicioCtrl'
  }
}
})

.state('app.reporte', {
  url: '/reporte',
  views: {
   'menuContent': {
    templateUrl: 'templates/reporte.html',
    controller: 'reporteCtrl'

  }
}
})

.state('app.reporte2', {
  url: '/reporte2',
  views: {
   'menuContent': {
    templateUrl: 'templates/reporte2.html',
    controller: 'reporteCtrl'

  }
}
})
.state('app.exito', {
  url: '/exito',
  views: {
   'menuContent': {
    templateUrl: 'templates/exito.html',
    controller: 'exitoCtrl'

  }
}
})


.state('app.formatosdetalle', {
  url: '/formatosdetalle',
  views: {
   'menuContent': {
    templateUrl: 'templates/formatosdetalle.html',
    controller: 'formatosCtrl'
  }
}
})

.state('app.single', {
  url: '/playlists/:playlistId',
  views: {

    templateUrl: 'templates/playlist.html',
    controller: 'PlaylistCtrl'

  }
}); 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});

