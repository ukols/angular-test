var app = angular.module('app', ['ui.bootstrap']);



function peopleList ($scope, $modal, $log) {
	$scope.persons = [
		{
			firstName: "Jack",
			lastName: "Petrov",
			phoneNumber: "555",
			group: 'admin'
		},
		{
			firstName: "Bob",
			lastName: "Ivanov",
			phoneNumber: "123456",
			group: 'user'
		},
		{
			firstName: "Ivan",
			lastName: "Sidarov",
			phoneNumber: "444",
			group: 'user'
		}
	];

	$scope.edit = [];
	$scope.newPerson = '';
	 
	$scope.deletePerson = function(contactToRemove) {
		var index = this.persons.indexOf(contactToRemove);
		this.persons.splice(index, 1);
	};

	$scope.openAddPopup = function () {
		var modalInstance = $modal.open({
			templateUrl: 'add_person.html',
			controller: PopupCtrl,
			resolve: {
				items: function () {
					return $scope.persons;
				}
			}
		});
	};


	$scope.openEditPopup = function (person) {
		var modalInstance = $modal.open({
			templateUrl: 'edit_person.html',
			controller: PopupCtrl,
			resolve: {
				items: function () {
					return person;
				}
			}
		});
	};

	var PopupCtrl = function ($scope, $modalInstance, items) {
		$scope.items = items;

		$scope.editPerson = {
			firstName: items.firstName,
			lastName: items.lastName,
			phoneNumber: items.phoneNumber,
			group: items.group
		};

		$scope.addPerson = function() {
			if (this.personForm.$valid ) {
				$modalInstance.close();
				$scope.items.push(this.newPerson);
			} else {
				$('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		
		$scope.savePerson = function() {
			if (this.editPersonForm.$valid ) {
				$.extend(items, this.editPerson);
				$modalInstance.close();
			} else {
				$('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
			}
		};
	};


};
