

const endPoint = "http://localhost/vehiculoAereoTerrestre.php";
let ListaDeObjetos = [];





//#region objeto 
function generarArrayObjetos(datosString) {
    const arrayDeObjetos = [];

    JSON.parse(datosString).forEach(element => {
        if (element.altMax !== undefined && element.autonomia !== undefined) {
            empleado = new Aereo(element.modelo, element.anoFab, element.velMax,
                element.altMax, element.autonomia, element.id);
            arrayDeObjetos.push(empleado);
        } else
            if (element.cantPue !== undefined && element.cantRue !== undefined) {
                cliente = new Terrestre(element.modelo, element.anoFab, element.velMax,
                    element.cantPue, element.cantRue, element.id,);
                arrayDeObjetos.push(cliente);
            } else {
                vehiculo = new Vehiculo(element.id, element.modelo, element.anoFab, element.velMax);
                arrayDeObjetos.push(vehiculo);
            }
    });

    return arrayDeObjetos;
}

class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = parseInt(velMax);
    }
    toString() {
        return `ID: ${this.id}, Nombre: ${this.modelo}, Apellido: ${this.anoFab}, Edad: ${this.velMax}`;
    }
    toJson() {
        if (this.id !== null || this.id === undefined) {
            return JSON.stringify({
                id: this.id,
                modelo: this.modelo,
                anoFab: this.anoFab,
                velMax: this.velMax,
            });
        } else {
            return JSON.stringify({
                modelo: this.modelo,
                anoFab: this.anoFab,
                velMax: this.velMax,
            });
        }

    }
}


class Aereo extends Vehiculo {
    constructor(modelo, anoFab, velMax, altMax, autonomia, id = null) {
        super(id, modelo, anoFab, velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }
    toString() {

        return `${super.toString()} - Ventas: ${this.autonomia} - Sueldo: ${this.altMax}`;
    }

    toJson() {
        const vehiculoJson = super.toJson();
        const aeroeJson = JSON.stringify({
            altMax: this.altMax,
            autonomia: this.autonomia,
        });
        return JSON.stringify({ ...JSON.parse(vehiculoJson), ...JSON.parse(aeroeJson) });
    }
}



class Terrestre extends Vehiculo {
    constructor(modelo, anoFab, velMax, cantPue, cantRue, id = null) {
        super(id, modelo, anoFab, velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
    toString() {
        return `${super.toString()} - Compras: ${this.cantPue} - Teléfono: ${this.cantRue}`;
    }
    toJson() {
        const vehiculoJson = super.toJson();
        const terrestreJson = JSON.stringify({
            cantPue: this.cantPue,
            cantRue: this.cantRue,
        });
        return JSON.stringify({ ...JSON.parse(vehiculoJson), ...JSON.parse(terrestreJson) });
    }
}





//#endregion


//#region variados
function $(id) {
    return document.getElementById(id);
}
function mostrarMensaje(mensaje) {
    alert(mensaje);
}
function EstadoSpinner(estado) {
    spinner = $("overlay")
    estado ? spinner.style.setProperty("display", "flex") : spinner.style.removeProperty("display");
}

function limpiarTxt() {

    var txtElements = document.querySelectorAll('.controles-inputs input');
  
    txtElements.forEach(function (txtElement) {
        txtElement.value = '';
    });
}

//#endregion



//#region Tabla



function cargarTabla(arrayDeObjetos) {

    if ($("table-container").hasChildNodes())
        $("table-container").firstChild.remove();

    $("table-container").appendChild(crearTabla(arrayDeObjetos));
}

function crearTabla(arrayDeObjetos) {

    if (!Array.isArray(arrayDeObjetos)) return null;

    if (arrayDeObjetos.length > 0) {
        const tabla = document.createElement("table");
        const thead = crearThead(arrayDeObjetos);
        const tbody = crearTbody(arrayDeObjetos);
        tabla.appendChild(thead);
        tabla.appendChild(tbody);


        return tabla;
    }
}

function crearThead(arrayDeObjetos) {
    const thead = document.createElement("thead");
    const trThead = document.createElement("tr");
    const keys = getKeys(arrayDeObjetos);

    keys.forEach(key => {
        const newTh = document.createElement("th");
        const newBtn = document.createElement("button");
        newBtn.textContent = key;
        newTh.setAttribute("id", key);
        newBtn.setAttribute("id", key);
        newTh.appendChild(newBtn);
        trThead.appendChild(newTh);
    });


    const ThModificar = document.createElement("th");
    const BtnModificar = document.createElement("button");
    const ThEliminar = document.createElement("th");
    const BtnEliminar = document.createElement("button");

    BtnModificar.textContent = "Modificar";


    ThModificar.appendChild(BtnModificar);
    trThead.appendChild(ThModificar);

    BtnEliminar.textContent = "Eliminar";
    ThEliminar.setAttribute("id", "Eliminar");
    BtnEliminar.setAttribute("id", "btnEliminar");
    ThEliminar.appendChild(BtnEliminar);
    trThead.appendChild(ThEliminar);


    thead.appendChild(trThead);

    return thead;
}

function crearTbody(arrayDeObjetos) {
    const tbody = document.createElement("tbody");
    const keys = getKeys(arrayDeObjetos);



    arrayDeObjetos.forEach(obj => {

        const tr = document.createElement("tr");

        const tdEliminar = document.createElement("td");
        const tdModificar = document.createElement("td");

        const btnModificar = document.createElement("button");
        const btnEliminar = document.createElement("button");

        btnEliminar.setAttribute("class", "btnEliminar");
        btnEliminar.textContent = "Eliminar"
        tdEliminar.appendChild(btnEliminar);
        btnEliminar.addEventListener("click", mostrarABMAgregar);

        tr.setAttribute("id", obj["id"]);

        btnModificar.textContent = "Modificar"
        btnModificar.setAttribute("class", "btnModificar");
        btnModificar.addEventListener("click", mostrarABMAgregar);
        tdModificar.appendChild(btnModificar);




        for (let key in keys) {
            const newTd = document.createElement("td");

            newTd.setAttribute("id", keys[key]);
            if (obj.hasOwnProperty(keys[key]))
                newTd.textContent = obj[keys[key]];
            else
                newTd.textContent = "N/A";


            tr.appendChild(newTd);
            tr.appendChild(tdModificar);
            tr.appendChild(tdEliminar);

        }

        tbody.appendChild(tr);
    })
    return tbody;
}

function getKeys(arrayDeObjetos) {
    const keys = [];

    arrayDeObjetos.forEach(obj => {
        for (let key in obj) {
            if (!keys.includes(key)) {
                keys.push(key);
            }
        }
    })
    return keys;
}

//#endregion


//#region form


function mostrarABMAgregar() {
    let tipo = "Aereo";
    $("agregarPor").value = tipo;
    crearTxt(ListaDeObjetos);
    $("txtid").readOnly = true;

    $("agregarPor").removeAttribute("disabled");

    $("titulo-form").textContent = "Alta";

    const tr = this.closest("tr");
    if (tr != null) {

        const objeto = ListaDeObjetos.find(item => {
            return tr.id == item.id;
        });

        tipo = $("agregarPor").value;
        cargarFormModificar(objeto);

        tipo = objeto.constructor === Aereo ? "Aereo"
            : objeto.constructor === Terrestre ? "Terrestre" : "Vehiculo";
        $("agregarPor").value = tipo;
        if (this.textContent == "Modificar") {
            $("titulo-form").textContent = "Modificacion";

        } else {
            $("titulo-form").textContent = "Baja";

        }
    }


    filtrarTxt(tipo);
    mostrarForms();
}


function crearTxt(arrayDeObjetos) {

    const container = $("containerTxt");
    if (!container.hasChildNodes()) {
        const keys = getKeys(arrayDeObjetos);

        keys.forEach(key => {

            const div = document.createElement("div");
            div.classList.add("controles-inputs");

            div.id = "div" + key;
          
            const txtBox = document.createElement("input");
            txtBox.type = "text";
            txtBox.id = "txt" + key;

            const label = document.createElement("label");
            label.textContent = key + ":";
            div.appendChild(label);
            div.appendChild(txtBox);

            container.appendChild(div);
        });
    }
}


function cargarFormModificar(vehiculo) {

    $("txtid").value = vehiculo.id;
    $("txtmodelo").value = vehiculo.modelo;
    $("txtanoFab").value = vehiculo.anoFab;
    $("txtvelMax").value = vehiculo.velMax;
    $("agregarPor").setAttribute("disabled", "true");

    if (vehiculo.constructor === Aereo) {
        $("txtautonomia").value = vehiculo.autonomia;
        $("txtaltMax").value = vehiculo.altMax;
    } else if (vehiculo.constructor === Terrestre) {
        $("txtcantRue").value = vehiculo.cantRue;
     
        $("txtcantPue").value = vehiculo.cantPue;
    }

}



function mostrarForms() {
    alternarVisibilidadForm();
    alternarVisibilidadFormABM();
}

function alternarVisibilidadFormABM() {
    $("containerABM").classList.toggle("frm-oculto");
    // $("containerABM").classList.toggle("container_form_ABM");
}

function alternarVisibilidadForm() {
    $("containerForm").classList.toggle("frm-oculto");
    // $("containerForm").classList.toggle("container_form");

}




function mostrarTxtSegunFiltro() {
    let valor = this.value;
    filtrarTxt(valor)
}

function filtrarTxt(tipo) {

    const containerTxt = $("containerTxt");
    $("divcantPue").classList.remove("frm-oculto");
    $("divcantRue").classList.remove("frm-oculto");
    $("divaltMax").classList.remove("frm-oculto");
    $("divautonomia").classList.remove("frm-oculto");

    if (tipo == "Aereo") {

        $("divcantPue").classList.add("frm-oculto");
        $("divcantRue").classList.add("frm-oculto");
    } else if (tipo == "Terrestre") {
        $("divaltMax").classList.add("frm-oculto");
        $("divautonomia").classList.add("frm-oculto");
    }
}



//#endregion





//#region botonesClick
function cancelarClick() {
    mostrarForms();
    limpiarTxt();


}
function aceptarClick() {
    let vehiculo;
    let variableDeControl;



    if($("titulo-form").textContent == "Baja"){
        eliminarElemento($("txtid").value);
    }else{
        tipo = $("agregarPor").value;
        if(tipo == "Terrestre"){
            variableDeControl = validarTerrestre();
            vehiculo =  new Terrestre($("txtmodelo").value, $("txtanoFab").value, $("txtvelMax").value, $("txtcantPue").value, $("txtcantRue").value);
        }else{
            variableDeControl = validarAereo();
            vehiculo =  new Aereo($("txtmodelo").value, $("txtanoFab").value, $("txtvelMax").value, $("txtaltMax").value, $("txtautonomia").value)
        }

    
        if(!variableDeControl){
            mostrarMensaje("Por favor revisar los campos!")
        }else{
            if ($("titulo-form").textContent == "Alta") {
                agregarElemento(vehiculo);
            } else {
                debugger
                vehiculo.id = $("txtid");
                modificarElemento(vehiculo);
            } 
        }

    }



}
//#endregion

//#region consumos
function CargarLista() {

    fetch(endPoint, {
        method: 'GET'
    }).then(function (response) {

        if (response.status == 200) {
            return response.text();
        } else
            throw new Error('Error en la solicitud: ' + response.status);

    }).then(function (data) {

        ListaDeObjetos = generarArrayObjetos(data);
        cargarTabla(ListaDeObjetos);

    }).catch(function (error) {
        mostrarMensaje('Algo fallo: ', error)
    });
}



 function  agregarElemento(objetoAAgregar) {

    EstadoSpinner(true);

    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPoint, true);
     xhttp.setRequestHeader('Content-type', 'application/json');

      xhttp.onreadystatechange =  function () {
        EstadoSpinner(false);
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                let objJson = JSON.parse(xhttp.response);
                objetoAAgregar.id = objJson.id;
                ListaDeObjetos.push(objetoAAgregar);
                mostrarMensaje("Se agrego con exito");
                cargarTabla(ListaDeObjetos);


            } else {
                alert("Hubo un problema con el alta!")
            }
        }

        limpiarTxt();
        mostrarForms();
    };

    xhttp.send(JSON.stringify(objetoAAgregar));

}









async function modificarElemento(objetoModificar) {
    try {

        console.log(objetoModificar.toJson());
        EstadoSpinner(true);
        const respuesta = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: objetoModificar.toJson()
        });
        EstadoSpinner(false);
        if (respuesta.status == 200) {
            mostrarMensaje("Se modificó con exito");

            modificacion(objetoModificar);
            cargarTabla(ListaDeObjetos);
           

        } else {
            mostrarMensaje("Error al modificar el elemento");
        }
    } catch (error) {
        mostrarMensaje("Algo fallo: ", error);
        EstadoSpinner(false);
    }finally{
        mostrarForms();
        limpiarTxt();
    }


}

function modificacion() {


    const objetoEncontrado = ListaDeObjetos.find(item => {
        return item.id == $("txtid").value;
    });

    objetoEncontrado.modelo = $("txtmodelo").value;
    objetoEncontrado.velMax = $("txtvelMax").value;
    objetoEncontrado.anoFab = $("txtanoFab").value;
    if (objetoEncontrado instanceof Aereo) {
        objetoEncontrado.altMax = $("txtaltMax").value;
        objetoEncontrado.autonomia = $("txtautonomia").value
    } else {
        objetoEncontrado.cantRue = $("txtcantRue").value;
        objetoEncontrado.cantPue = $("txtcantPue").value
    }

}


async function eliminarElemento(idObjeto) {

    try {
        EstadoSpinner(true);
        let respuesta = await fetch(endPoint, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id: idObjeto }),

        });

       
        if (respuesta.status === 200) {
            mostrarMensaje("Eliminacion exitosa");
            eliminar(idObjeto);
           
        } else {
            mostrarMensaje("Error tratando de eliminar el elemento. ", respuesta);
        }
        EstadoSpinner(false);
        limpiarTxt();
        mostrarForms();
    } catch (error) {
        mostrarMensaje("Algo fallo: " + error);
        EstadoSpinner(false);
    }
}


function eliminar(id) {
  
    ListaDeObjetos = ListaDeObjetos.filter(function (objeto) {
     
        return objeto.id != id;
    });
    cargarTabla(ListaDeObjetos);
}



//#endregion

//#region eventos

addEventListener("load", CargarLista);
$("btn-agregar").addEventListener("click", mostrarABMAgregar);
$("btn-cancelar").addEventListener('click', cancelarClick);
$("agregarPor").addEventListener('change', mostrarTxtSegunFiltro);
$("btn-aceptar").addEventListener('click', aceptarClick);
//#endregion


//#region validaciones

function validarVehiculo() {
    
    if(!(Number.isInteger(parseInt($("txtvelMax").value)) && parseInt($("txtvelMax").value) > 0)  ||$("txtmodelo").value == "" || !(Number.isInteger(parseInt($("txtanoFab").value)) && parseInt($("txtanoFab").value) > 1885) )
        return false;
    
    return true;
}

function validarAereo() {
    if(!validarVehiculo())
        return false;
    if(!(Number.isInteger(parseInt($("txtaltMax").value)) && parseInt($("txtaltMax").value) > 0)  ||!(Number.isInteger(parseInt($("txtautonomia").value)) && parseInt($("txtautonomia").value) > 0) )
        return false;
    
    return true;
}

function validarTerrestre() {
    if(!validarVehiculo())
        return false;
    if(!(Number.isInteger(parseInt($("txtcantPue").value)) && parseInt($("txtcantPue").value) > -1)  ||!(Number.isInteger(parseInt($("txtcantRue").value)) && parseInt($("txtcantRue").value) > 0) )
        return false;
    
    return true;
}

//#endregion