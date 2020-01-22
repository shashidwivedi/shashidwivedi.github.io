var app = angular.module("myApp", []);

app.controller("myController", function ($scope, $http) {

    $http.get('assets/json/projects.json').then(function (response) {
        $scope.projectlist = response.data;
        $scope.projects = $scope.projectlist.projects;
    });


    $scope.flag1 = 1;
    $scope.flag2 = 1;
    $scope.flag3 = 1;

    $scope.sortByName = function () {

        if ($scope.flag1 == 1) {
            $scope.sortByNameFlag();
            $scope.flag1 = -1;

        } else {
            $scope.sortByNameFlag();
            $scope.flag1 = 1;
        }

    };

    $scope.sortByNameFlag = function () {
        $scope.projects.sort(function (a, b) {
            var nameA = a.Name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.Name.toUpperCase(); // ignore upper and lowercase

            if (nameA > nameB) {
                return $scope.flag1;
            }

            if (nameA < nameB) {
                return -1 * $scope.flag1;
            }

            // names must be equal
            return 0;
        });
    };


    $scope.sortByLastModifiedTime = function () {

        if ($scope.flag2 == 1) {
            $scope.sortByLastModifiedTimeFlag();
            $scope.flag2 = -1;
        } else {
            $scope.sortByLastModifiedTimeFlag();
            $scope.flag2 = 1;
        }

    };

    $scope.sortByLastModifiedTimeFlag = function () {
        $scope.projects.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return $scope.flag2 * new Date(b['Last Modified Time']) - $scope.flag2 * new Date(a['Last Modified Time']);
        });

    };

    $scope.sortByCreatedTime = function () {

        if ($scope.flag3 == 1) {
            $scope.sortByCreatedTimeFlag();
            $scope.flag3 = -1;
        } else {
            $scope.sortByCreatedTimeFlag();
            $scope.flag3 = 1;
        }

    };

    $scope.sortByCreatedTimeFlag = function () {
        $scope.projects.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return $scope.flag3 * new Date(b['Created Time']) - $scope.flag3 * new Date(a['Created Time']);
        });

    };

    $scope.delProject = function () {
        // console.log($scope.foo);
        if ($scope.foo > -1) {
            $scope.projects.splice($scope.foo, 1);
        }
    };

    $scope.$on("delProjEvent", function (evt, data) {

        $scope.foo = data;
        // console.log($scope.foo);

    });

    // For modal to display fields to add a project to the list

    $scope.myModal = document.getElementById("myModal");
    $scope.modalAlert = document.getElementById("modalAlert");
    $scope.countAdditions = 0;

    $scope.addProject = function () {
        $scope.myModal.style.display = "block";
        $scope.addProjError = null;
        $scope.projectname = null;
        $scope.createdbyname = null;
        $scope.projectdesc = null;
        $scope.modalAlert.style.display = "none";
        $scope.countAdditions = 0;

    };

    $scope.closeModal = function () {
        $scope.myModal.style.display = "none";

        $scope.pname.style.border = "1px solid black";
        $scope.createdby.style.border = "1px solid black";
        $scope.pdesc.style.border = "1px solid black";

        $scope.addProjError = "You have cancelled!";
        $scope.modalAlert.style.display = "block";
        setTimeout(() => {
            $scope.modalAlert.style.display = "none";
        }, 1500);
    };

    // Add a project to the list

    var nullOrUndefined = function (value) {
        return (value == undefined || value == null || value == "");
    };

    $scope.pname = document.getElementById('pname');
    $scope.createdby = document.getElementById('createdby');
    $scope.pdesc = document.getElementById('pdesc');

    $scope.addProjectToList = function () {

        $scope.addNewProject = {};

        if ($scope.projectname != undefined && $scope.projectname != null && $scope.projectname != "" &&
            $scope.createdbyname != undefined && $scope.createdbyname != null && $scope.createdbyname != "" &&
            $scope.projectdesc != undefined && $scope.projectdesc != null && $scope.projectdesc != "") {


            $scope.addNewProject["Name"] = $scope.projectname;
            $scope.addNewProject["Created By"] = $scope.createdbyname;
            $scope.addNewProject["Last Modified By"] = $scope.createdbyname;
            $scope.addNewProject["Created Time"] = 0;
            $scope.addNewProject["Last Modified Time"] = 0;
            $scope.addNewProject["Description"] = $scope.projectdesc;
            $scope.addNewProject["Created Time"] = new Date();
            $scope.addNewProject["Last Modified Time"] = $scope.addNewProject["Created Time"];
            $scope.projects.push($scope.addNewProject);

            $scope.countAdditions += 1;

            $scope.addProjError = null;
            $scope.addNewProject = {};
            $scope.projectname = null;
            $scope.createdbyname = null;
            $scope.projectdesc = null;

            $scope.myModal.style.display = "none";

            $scope.modalAlert.style.display = "block";
            $scope.pname.style.border = "1px solid black";
            $scope.createdby.style.border = "1px solid black";

            $scope.pdesc.style.border = "1px solid black";

            $scope.addProjError = "Project added!";
            setTimeout(() => {
                $scope.modalAlert.style.display = "none";
            }, 1500);

        } else {

            /*** Validations ***/

            if (nullOrUndefined($scope.projectname)) {
                $scope.addProjError = "Enter Project Name!";
                $scope.pname.style.border = "2px solid red";

                if (nullOrUndefined($scope.createdbyname)) {
                    $scope.addProjError = "Enter Project Name and Your Name!";
                    $scope.createdby.style.border = "2px solid red";

                    if (nullOrUndefined($scope.projectdesc)) {
                        $scope.addProjError = "Please Enter all details!";
                        $scope.pdesc.style.border = "2px solid red";

                    } else {
                        $scope.pdesc.style.border = "1px solid black";
                    }

                } else {
                    $scope.createdby.style.border = "1px solid black";

                    if (nullOrUndefined($scope.projectdesc)) {
                        $scope.pdesc.style.border = "2px solid red";
                        $scope.addProjError = "Enter Project Name and Description!";
                    } else {
                        $scope.pdesc.style.border = "1px solid black";
                    }
                }

            } else if (nullOrUndefined($scope.createdbyname)) {
                $scope.pname.style.border = "1px solid black";
                $scope.createdby.style.border = "2px solid red";
                $scope.addProjError = "Enter Your Name!";

                if (nullOrUndefined($scope.projectdesc)) {
                    $scope.pdesc.style.border = "2px solid red";
                    $scope.addProjError = "Enter Your Name and Description!";
                } else {
                    $scope.pdesc.style.border = "1px solid black";
                }
            } else {
                $scope.pname.style.border = "1px solid black";
                $scope.createdby.style.border = "1px solid black";
                $scope.pdesc.style.border = "2px solid red";
                $scope.addProjError = "Enter Project Description!";
            }


            $scope.myModal.style.display = "none";

            $scope.modalAlert.style.display = "block";
            // $scope.addProjError = "Please enter details correctly!";
            setTimeout(() => {
                $scope.modalAlert.style.display = "none";
                $scope.myModal.style.display = "block";
            }, 1500);

        }

    };


});


// Context Menu in angular

app.directive("myContextMenu", ["$document", function ($document) {

    return {
        restrict: 'A',
        // scope: {  },
        link: function (scope, element, attr) {

            const menu = document.querySelector(".menu");
            let menuVisible;

            function toggleMenu(command) {
                menu.style.display = command;
                command == "block" ? menuVisible = true : menuVisible = false;
            }

            function setPosition({ top, left }) {
                menu.style.left = left + 'px';
                menu.style.top = top + 'px';
                toggleMenu("block");
            }

            window.addEventListener("click", e => {
                if (menuVisible) {
                    toggleMenu("none");
                }

            });

            element.on("contextmenu", e => {
                e.preventDefault();

                const origin = {
                    left: e.pageX,
                    top: e.pageY
                };

                setPosition(origin);

            });


        }
    };

}]);

// Directive for finding where the rightclick event happened

app.directive("ngRightClick", ['$rootScope', function ($rootScope) {

    return {
        restrict: 'A',
        scope: {
            indexDel: "@myIndexDel"
        },
        link: function (scope, element) {

            element.on("contextmenu", e => {
                // console.log(scope.indexDel);
                $rootScope.$broadcast("delProjEvent", scope.indexDel);
            });

        }

    };

}]);

// app.filter('formatdate', function (format = 'dd/mm/yyyy') {
// return function (input) {
//     var d = new Date(input);
//     var year = d.getFullYear();
//     var month = d.getMonth() + 1;
//     var date = d.getDate();
//     return year + "/" + month + "/" + date;
// };
// });

// app.filter('formattime', function () {
// return function (input) {
//     // var d = new Date(input);
//     // var hours = d.getHours();
//     // var ampm = hours > 12 ? 'PM' : 'AM';
//     // var seconds = d.getSeconds();
//     // var hours = hours % 12;
//     // var minutes = d.getMinutes();
//     // return (hours ? 12 : hours) + ":" + minutes + ":" + seconds + " " + ampm;
// };
// });

app.filter('formatdate', function () {

    return function (input) {
        return (new kDate(input)).format('dd/mmm/yyyy');
    }

});

app.filter('formattime', function () {

    return function (input) {
        return (new kDate(input)).format('hh:mm:ss');
    }

});


