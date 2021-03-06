(function() {
    'use strict';

    angular
        .module('epressingApp')
        .controller('CommandeDialogController', CommandeDialogController);

    CommandeDialogController.$inject = ['$timeout', '$scope', '$stateParams', 'entity', 'Commande', 'CarteBancaire', 'Utilisateur','$rootScope','$state','$localStorage','Principal'];

    function CommandeDialogController ($timeout, $scope, $stateParams, entity, Commande, CarteBancaire, Utilisateur,$rootScope, $state,$localStorage,Principal) {
        var vm = this;
       
        vm.commande = entity; 
        vm.setUserToCommand = setUserToCommand;
        vm.ligneCommandes = $rootScope.commandeForm.ligneCommandes;
        vm.total = total;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.cartebancaires = CarteBancaire.query();
        vm.utilisateurs = Utilisateur.query();
        vm.maCommandeForm ={};
        vm.resetCart = resetCart;
        vm.commande.netAPayer = vm.total();
        
        function setUserToCommand(){
            Principal.identity().then(function(user){
                $scope.commandeForm.commande.user = user;
            });
        }
        function total () {
            var resultat = 0;
            for (var i = 0; i < vm.ligneCommandes.length; i++) {
                resultat= resultat + vm.ligneCommandes[i].tarif;            
            }
            return resultat;
        }

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }
        function resetCart(){
            var taille = $rootScope.commandeForm.ligneCommandes.length;
            $rootScope.commandeForm.ligneCommandes.splice(0,taille);
            $localStorage.commandeForm = $rootScope.commandeForm;
        }

        function save () {
            vm.isSaving = true;
            $scope.commandeForm.commande = vm.commande;
            if (vm.commande.id !== null) {
                alert('Mise a jour non configurée');
            } else {               
                $scope.commandeForm.ligneCommandes = $rootScope.commandeForm.ligneCommandes;
                vm.setUserToCommand();
                vm.resultat = Commande.saveCommand($scope.commandeForm, onSaveSuccess, onSaveError);
                vm.resultat.$promise.then(function(data){
                    resetCart();
                });
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('epressingApp:commandeUpdate', result);
             $state.go('commande-current-user');
/*             $state.go('commande');commande-current-user*/
            vm.isSaving = false;
        }
        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.dateCommande = false;
        vm.datePickerOpenStatus.dateFacture = false;
        vm.datePickerOpenStatus.dateFacturation = false;
        vm.datePickerOpenStatus.dateCueillette = false;
        vm.datePickerOpenStatus.dateLivraison = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
