document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 1000);
            setTimeout(() => {
                preloader.remove();
            }, 2000);
        });
    }

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const togglescrollTop = function () {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }));
    }


    /**
     * Animation on scroll function and init
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    window.addEventListener('load', () => {
        aos_init();
    });

});


function cargarPersonajes() { // Se cargan todos los personajes de marvel
    var node = document.getElementById("listado");
    var lButtons = [];
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=f1dcbee8219ea175e1ba41efeddb4415",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var i = 0;
            for (hero of res.data.results) {
                console.log(hero.thumbnail.path + "." + hero.thumbnail.extension);

                var divCol = document.createElement("div");
                divCol.classList.add("col-xl-3");
                divCol.classList.add("col-lg-4");
                divCol.classList.add("col-md-6");
                node.appendChild(divCol);

                var divItem = document.createElement("div");
                divItem.classList.add("gallery-item");
                divItem.classList.add("h-100");
                divCol.appendChild(divItem);

                var img = document.createElement("img");
                img.src = hero.thumbnail.path + "." + hero.thumbnail.extension;
                img.width = 500;
                img.height = 500;
                img.classList.add("img-fluid");
                divItem.appendChild(img);

                var divLinks = document.createElement("div");
                divLinks.classList.add("gallery-links");
                divLinks.classList.add("d-flex");
                divLinks.classList.add("align-items-center");
                divLinks.classList.add("justify-content-center");
                divItem.appendChild(divLinks);

                var divInfo = document.createElement("div");
                divInfo.classList.add("line-clamp");
                divInfo.classList.add("module");
                divInfo.innerHTML = "<div class=\"row gy-4 justify-content-center\">" +
                    "<p style=\"text-align: justify;\"><strong><br>Nombre</strong>: " + hero.name + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>Descripci&oacute;n</strong>: " + hero.description + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>N&ordm; de Comics</strong>: " + hero.comics.available + "</p>";
                divLinks.appendChild(divInfo)

                var button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-danger");
                button.type = "button";
                button.textContent = "Mas info sobre " + hero.id;
                lButtons[i] = button;
                divInfo.appendChild(button);
                i++;
            }
            lButtons.forEach((button) => {
                var url = "about.html?id=" + button.textContent.substring(15) + "&type=hero";
                console.log(url);
                button.onclick = function () {
                    location.replace(url);
                }
            })
        }
    });
}

function cargarComics() { // Se cargan todos los comics de marvel
    var node = document.getElementById("listado");
    var lButtons = [];
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=f1dcbee8219ea175e1ba41efeddb4415",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var i = 0;
            for (var comic of res.data.results) {
                var algo = comic.thumbnail.path + "." + comic.thumbnail.extension;
                if (algo === "http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada.jpg") {
                    comic.id;
                }

                var divCol = document.createElement("div");
                divCol.classList.add("col-xl-3");
                divCol.classList.add("col-lg-4");
                divCol.classList.add("col-md-6");
                node.appendChild(divCol);

                var divItem = document.createElement("div");
                divItem.classList.add("gallery-item");
                divItem.classList.add("h-100");
                divCol.appendChild(divItem);

                var img = document.createElement("img");
                img.src = comic.thumbnail.path + "." + comic.thumbnail.extension;
                img.width = 500;
                img.height = 500;
                img.classList.add("img-fluid");
                divItem.appendChild(img);

                var divLinks = document.createElement("div");
                divLinks.classList.add("gallery-links");
                divLinks.classList.add("d-flex");
                divLinks.classList.add("align-items-center");
                divLinks.classList.add("justify-content-center");
                divItem.appendChild(divLinks);

                var divInfo = document.createElement("div");
                divInfo.classList.add("line-clamp");
                divInfo.classList.add("module");
                divInfo.id = "divInfo";
                divInfo.innerHTML = "<div class=\"row gy-4 justify-content-center\">" +
                    "<p style=\"text-align: justify;\"><strong><br>T&iacute;tulo</strong>: " + comic.title + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>Descripci&oacute;n</strong>: " + comic.description + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>N&ordm; de Personajes</strong>: " + comic.characters.available + "</p>";
                divLinks.appendChild(divInfo);

                var button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-danger");
                button.type = "button";
                button.textContent = "Mas info sobre " + comic.id;
                lButtons[i] = button;
                divInfo.appendChild(button);
                i++;
            }
            lButtons.forEach((button) => {
                var url = "about.html?id=" + button.textContent.substring(15) + "&type=comic";
                console.log(url);
                button.onclick = function () {
                    location.replace(url);
                }
            })
        }
    });

}


function aboutComic(id) {

    var uri = "https://gateway.marvel.com:443/v1/public/comics/" + id + "?apikey=f1dcbee8219ea175e1ba41efeddb4415"
    var node = document.getElementById("imgAbout");
    $.ajax({
        url: uri,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var img = document.createElement("img");
            img.classList.add("img-fluid");
            for (comic of res.data.results) {
                img.src = comic.thumbnail.path + "." + comic.thumbnail.extension
                node.appendChild(img);
                var h2 = document.getElementById("titleAbout");
                h2.innerText = comic.title;
                var description = document.getElementById("descriptionAbout");
                description.innerText = comic.description;
            }

        }
    });
    cargarPersonajesAbout(id);
}

function aboutHero(id) {

    var uri = "https://gateway.marvel.com:443/v1/public/characters/" + id + "?apikey=f1dcbee8219ea175e1ba41efeddb4415"
    var node = document.getElementById("imgAbout");
    $.ajax({
        url: uri,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var img = document.createElement("img");
            img.classList.add("img-fluid");
            for (hero of res.data.results) {
                img.src = hero.thumbnail.path + "." + hero.thumbnail.extension
                node.appendChild(img);
                var h2 = document.getElementById("titleAbout");
                h2.innerText = hero.name;
                var description = document.getElementById("descriptionAbout");
                description.innerText = hero.description;
            }

        }
    });
    cargarComicsAbout(id);
}

function cargarComicsAbout(id) {
    var uri = "https://gateway.marvel.com:443/v1/public/characters/" + id + "/comics?limit=100&apikey=f1dcbee8219ea175e1ba41efeddb4415"
    var aparecen = document.getElementById("Aparecen");
    aparecen.innerText = "Comics en los que aparece el personaje";
    var lButtons = [];
    var node = document.getElementById("listadoAbout");
    $.ajax({
        url: uri,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var i = 0;
            for (comic of res.data.results) {
                console.log(comic.thumbnail.path + "." + comic.thumbnail.extension);

                var divCol = document.createElement("div");
                divCol.classList.add("col-xl-3");
                divCol.classList.add("col-lg-4");
                divCol.classList.add("col-md-6");
                node.appendChild(divCol);

                var divItem = document.createElement("div");
                divItem.classList.add("gallery-item");
                divItem.classList.add("h-100");
                divCol.appendChild(divItem);

                var img = document.createElement("img");
                img.src = comic.thumbnail.path + "." + comic.thumbnail.extension;
                img.width = 500;
                img.height = 500;
                img.classList.add("img-fluid");
                divItem.appendChild(img);

                var divLinks = document.createElement("div");
                divLinks.classList.add("gallery-links");
                divLinks.classList.add("d-flex");
                divLinks.classList.add("align-items-center");
                divLinks.classList.add("justify-content-center");
                divItem.appendChild(divLinks);

                var divInfo = document.createElement("div");
                divInfo.classList.add("line-clamp");
                divInfo.classList.add("module");
                divInfo.innerHTML = "<div class=\"row gy-4 justify-content-center\">" +
                    "<p style=\"text-align: justify;\"><strong><br>Nombre</strong>: " + comic.title + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>Descripci&oacute;n</strong>: " + comic.description + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>N&ordm; de Comics</strong>: " + comic.characters.available + "</p>";
                divLinks.appendChild(divInfo)

                var button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-danger");
                button.type = "button";
                button.textContent = "Mas info sobre " + comic.id;
                lButtons[i] = button;
                divInfo.appendChild(button);
                i++;
            }
            lButtons.forEach((button) => {
                var url = "about.html?id=" + button.textContent.substring(15);
                console.log(url);
                button.onclick = function () {
                    location.replace(url);
                }
            })
        }
    });
}

function cargarPersonajesAbout(id) {
    var uri = "https://gateway.marvel.com:443/v1/public/comics/" + id + "/characters?limit=100&apikey=f1dcbee8219ea175e1ba41efeddb4415"
    var lButtons = [];
    var node = document.getElementById("listadoAbout");
    var aparecen = document.getElementById("Aparecen");
    aparecen.innerText = "Personajes que aparecen en el comic";
    $.ajax({
        url: uri,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var i = 0;
            for (hero of res.data.results) {
                console.log(hero.thumbnail.path + "." + hero.thumbnail.extension);

                var divCol = document.createElement("div");
                divCol.classList.add("col-xl-3");
                divCol.classList.add("col-lg-4");
                divCol.classList.add("col-md-6");
                node.appendChild(divCol);

                var divItem = document.createElement("div");
                divItem.classList.add("gallery-item");
                divItem.classList.add("h-100");
                divCol.appendChild(divItem);

                var img = document.createElement("img");
                img.src = hero.thumbnail.path + "." + hero.thumbnail.extension;
                img.width = 500;
                img.height = 500;
                img.classList.add("img-fluid");
                divItem.appendChild(img);

                var divLinks = document.createElement("div");
                divLinks.classList.add("gallery-links");
                divLinks.classList.add("d-flex");
                divLinks.classList.add("align-items-center");
                divLinks.classList.add("justify-content-center");
                divItem.appendChild(divLinks);

                var divInfo = document.createElement("div");
                divInfo.classList.add("line-clamp");
                divInfo.classList.add("module");
                divInfo.innerHTML = "<div class=\"row gy-4 justify-content-center\">" +
                    "<p style=\"text-align: justify;\"><strong><br>Nombre</strong>: " + hero.name + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>Descripci&oacute;n</strong>: " + hero.description + "</p>" +
                    "<p style=\"text-align: justify;\"><strong>N&ordm; de Comics</strong>: " + hero.comics.available + "</p>";
                divLinks.appendChild(divInfo)

                var button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-danger");
                button.type = "button";
                button.textContent = "Mas info sobre " + hero.id;
                lButtons[i] = button;
                divInfo.appendChild(button);
                i++;
            }
            lButtons.forEach((button) => {
                var url = "about.html?type=hero&id=" + button.textContent.substring(15);
                console.log(url);
                button.onclick = function () {
                    location.replace(url);
                }
            })
        }
    });
}


if (window.location.href.includes("index.html")) {
    var queryString = window.location.search;
    console.log(queryString);
    var urlParams = new URLSearchParams(queryString);
    if (urlParams.get("catalogo") === "heros") {
        cargarPersonajes();
    } else {
        cargarComics();
    }
    var divResumen = document.getElementById("resumen");
    // Buscamos cuantos comics hay
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/comics?apikey=f1dcbee8219ea175e1ba41efeddb4415",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var button = document.createElement("button");
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.type = "button";
            button.textContent = "Comics: " + res.data.total;
            button.onclick = function () {
                location.replace("index.html?catalogo=comics");
            };
            divResumen.appendChild(button);
        }
    });

    // Buscamos cuantos personajes hay
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/characters?apikey=f1dcbee8219ea175e1ba41efeddb4415",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            var button = document.createElement("button");
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.classList.add("btn-space");
            button.type = "button";
            button.textContent = "Personajes: " + res.data.total;
            button.onclick = function () {
                location.replace("index.html?catalogo=heros");
            }
            divResumen.appendChild(button);
        }
    });

} else {
    if (window.location.href.includes("about.html")) {
        var queryString = window.location.search;
        console.log(queryString);
        var urlParams = new URLSearchParams(queryString);
        if (urlParams.get("type") === "hero") {
            aboutHero(urlParams.get("id"));
        } else {
            aboutComic(urlParams.get("id"));
        }
    }
}