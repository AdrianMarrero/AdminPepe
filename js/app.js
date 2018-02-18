var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $q, $filter, $http) {
  var config = {
    apiKey: "AIzaSyBRHf3QTmXwrmNX3vnvjYRLroOpLYgUQPk",
    authDomain: "pepeapp-e6fc3.firebaseapp.com",
    databaseURL: "https://pepeapp-e6fc3.firebaseio.com",
    projectId: "pepeapp-e6fc3",
    storageBucket: "pepeapp-e6fc3.appspot.com",
    messagingSenderId: "517134154769"
  };

    firebase.initializeApp(config);
    //var database = firebase.database();


    function leerDatos(){
  		var defered = $q.defer();
		var promise = defered.promise;
    	var ref = firebase.database().ref();

		ref.on("value", function(snapshot) {
		   $scope.records = snapshot.val();
		   defered.resolve($scope.records);
		}, function (error) {
		   console.log("Error: " + error.code);
		   defered.reject(error);
		});
		return promise;
    }

    function loadTable(){
  		var defered = $q.defer();
		var promise = defered.promise;
		$scope.data = [];
        try {
			angular.forEach($scope.records.partes_de_trabajo, function(value, key) {
					$scope.data.push(value);
			});
		defered.resolve($scope.data);
        } catch (e) {
			defered.reject(e);
        }
		return promise;
    }

	leerDatos().then(function(result){
		loadTable().then(function(result){ 
			    $("table").tableExport({
				    headings: false,                    // (Boolean), display table headings (th/td elements) in the <thead>
				    footers: false,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
				    formats: ["xls"],    // (String[]), filetypes for the export
				    fileName: "id",                    // (id, String), filename for the downloaded file
				    bootstrap: true,                   // (Boolean), style buttons using bootstrap
				    position: "bottom",                 // (top, bottom), position of the caption element relative to table
				    ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
				    ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
				    ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
				    emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
				    trimWhitespace: false  
				});
		}, function(error){
			console.log(error);
		})
	}, function(error){
		console.log(error);
	});

	$('.input-daterange input').each(function() {
    $	(this).datepicker('clearDates');
	});
    
});