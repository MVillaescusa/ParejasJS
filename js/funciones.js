window.onload = inicia;

var cartas;
var clic;
var clics = Array(2);
var tiempo = 3;

function inicia() {
    cartas = Array(
        "luffy",
        "zoro",
        "ussop",
        "sanji",
        "nami",
        "chopper",
        "robin",
        "franky",
        "brook",
        "luffy",
        "zoro",
        "ussop",
        "sanji",
        "nami",
        "chopper",
        "robin",
        "franky",
        "brook"
    );
    cartas.sort(() => Math.random() - 0.5);
    generaCartas();
    clic = 0;
    muestraCartas();
}

function generaCartas() {
    for (var y = 0; y < cartas.length; y++) {
        var carta = document.createElement("div");
        carta.id = cartas[y] + " " + y;
        carta.setAttribute("name", "carta");
        carta.classList.add("flip-card");
        carta.onclick = voltea;
        var inner = document.createElement("div");
        inner.id = "inner " + y;
        inner.setAttribute("name", "inner");
        inner.classList.add("flip-card-inner");
        inner.classList.add("clicked");
        var front = document.createElement("div");
        front.id = "front " + y;
        front.name = "front";
        front.classList.add("flip-card-front");
        var imgFront = document.createElement("img");
        imgFront.id = "imgFront " + y;
        imgFront.name = "imgFront";
        imgFront.src = "./img/reverso.png";
        imgFront.alt = "Vacio";
        imgFront.classList.add("img");
        var back = document.createElement("div");
        back.id = "back " + y;
        back.name = "back";
        back.classList.add("flip-card-back");
        var imgBack = document.createElement("img");
        imgBack.id = "imgBack " + y;
        imgBack.name = "imgBack";
        imgBack.src = "./img/" + cartas[y] + ".png";
        imgBack.alt = cartas[y];
        imgBack.classList.add("img");
        front.appendChild(imgFront);
        back.appendChild(imgBack);
        inner.appendChild(front);
        inner.appendChild(back);
        carta.appendChild(inner);
        document.body.appendChild(carta);
    }
}

function voltea() {
    if (!this.classList.contains("pareja")) {
        document.getElementById("inner " + this.id.split(" ")[1]).classList.toggle("clicked");
        clics[clic] = this.id;
        compruebaClics();
    }
}

function compruebaClics() {
    clic++;
    if (clic == 2) {
        clic = 0;
        compruebaPareja();
        compruebaFin();
    }
}

function compruebaPareja() {
    if (clics[0].split(" ")[0] == clics[1].split(" ")[0]) {
        desactivaClic();
    } else {
        setTimeout(() => {
            document.getElementById("inner " + clics[0].split(" ")[1]).classList.remove("clicked");
            document.getElementById("inner " + clics[1].split(" ")[1]).classList.remove("clicked");
        }, 500);
    }
}

function desactivaClic() {
    var cartas = document.getElementsByName("carta");
    for (var i = 0; i < cartas.length; i++) {
        if (cartas[i].id.split(" ")[0] == clics[0].split(" ")[0]) {
            cartas[i].classList.add("pareja");
        }
    }
}

function muestraCartas() {
    interval = setInterval(muestraTiempo, 1000);
}

function muestraTiempo() {
    document.getElementById("tiempo").innerHTML = tiempo;
    tiempo--;
    if (tiempo < 0) {
        clearInterval(interval);
        var cartas = document.getElementsByName("inner");
        for (var i = 0; i < cartas.length; i++) {
            cartas[i].classList.remove("clicked");
        }
        document.getElementById("tiempo").remove();
    }
}

function compruebaFin() {
    var fin = true;
    var cartas = document.getElementsByName("inner");
    for (var i = 0; i < cartas.length; i++) {
        if (!cartas[i].classList.contains("clicked")) {
            fin = false;
        }
    }
    if (fin) {
        alert("Enhorabuena, has ganado!");
        var boton = document.createElement("div");
        var reset = document.createElement("button");
        reset.type = "button";
        reset.id = "reset";
        reset.setAttribute("name", "reset");
        reset.innerText = "Reiniciar";
        reset.onclick = reinicia;
        boton.appendChild(reset);
        document.body.appendChild(boton);
    }
}

function reinicia() {
    location.reload();
}
