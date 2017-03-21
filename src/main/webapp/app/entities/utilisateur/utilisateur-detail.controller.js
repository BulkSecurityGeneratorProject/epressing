(function() {
    'use strict';

    angular
        .module('epressingApp')
        .controller('UtilisateurDetailController', UtilisateurDetailController);

    UtilisateurDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Utilisateur', 'User', 'TypeUtilisateur'];

    function UtilisateurDetailController($scope, $rootScope, $stateParams, previousState, entity, Utilisateur, User, TypeUtilisateur) {
        var vm = this;

        vm.utilisateur = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('epressingApp:utilisateurUpdate', function(event, result) {
            vm.utilisateur = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
