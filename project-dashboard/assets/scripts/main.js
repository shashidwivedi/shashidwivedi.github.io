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

    }

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
    }


    $scope.sortByLastModifiedTime = function () {

        if ($scope.flag2 == 1) {
            $scope.sortByLastModifiedTimeFlag();
            $scope.flag2 = -1;
        } else {
            $scope.sortByLastModifiedTimeFlag();
            $scope.flag2 = 1;
        }

    }

    $scope.sortByLastModifiedTimeFlag = function () {
        $scope.projects.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return $scope.flag2 * new Date(b['Last Modified Time']) - $scope.flag2 * new Date(a['Last Modified Time']);
        });

    }

    $scope.sortByCreatedTime = function () {

        if ($scope.flag3 == 1) {
            $scope.sortByCreatedTimeFlag();
            $scope.flag3 = -1;
        } else {
            $scope.sortByCreatedTimeFlag();
            $scope.flag3 = 1;
        }

    }

    $scope.sortByCreatedTimeFlag = function () {
        $scope.projects.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return $scope.flag3 * new Date(b['Created Time']) - $scope.flag3 * new Date(a['Created Time']);
        });

    }


    // Context Menu

    setTimeout(() => {
        const menu = document.querySelector(".menu");
        let menuVisible = false;
        const menuOption = document.querySelector(".menu-option");


        const projectdivs = document.getElementsByClassName('project');

        const toggleMenu = command => {
            menu.style.display = command;
            command == "block" ? menuVisible = true : menuVisible = false;
        }

        const setPosition = ({ top, left }) => {
            menu.style.left = `${left}px`;
            menu.style.top = `${top}px`;

            toggleMenu("block");
        }

        window.addEventListener("click", e => {
            if (menuVisible) {
                toggleMenu("none");
            }

        });

        // window.addEventListener("contextmenu", e => {
        //     e.preventDefault();
        // });

        for (i = 0; i < projectdivs.length; i++) {

            projectdivs[i].addEventListener("contextmenu", e => {
                e.preventDefault();

                const origin = {
                    left: e.pageX,
                    top: e.pageY
                };

                setPosition(origin);

                return false;
            });

        }

    }, 50);



});



