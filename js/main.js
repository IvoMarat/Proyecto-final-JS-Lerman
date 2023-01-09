// PERFUMES

const productos = [
    // CAROLINA HERRERA
    {
        id: "ch-01",
        titulo: "CH Men",
        imagen: "./img/ch/ch-1.jpg",
        categoria: {
            nombre: "Carolina Herrera",
            id: "ch"
        },
        precio: 15000,
    },

    {
        id: "ch-02",
        titulo: "CH Bad Boy",
        imagen: "./img/ch/ch-2.jpg",
        categoria: {
            nombre: "Carolina Herrera",
            id: "ch"
        },
        precio: 25000,
    },

    {
        id: "ch-03",
        titulo: "CH 212 Vip",
        imagen: "./img/ch/ch-3.jpg",
        categoria: {
            nombre: "Carolina Herrera",
            id: "ch"
        },
        precio: 20000,
    },

    // CALVIN KLEIN
    {
        id: "ck-01",
        titulo: "CK All",
        imagen: "./img/ck/ck-1.jpg",
        categoria: {
            nombre: "Calvin Klein",
            id: "ck"
        },
        precio: 18000,
    },

    {
        id: "ck-02",
        titulo: "Ck One",
        imagen: "./img/ck/ck-2.jpg",
        categoria: {
            nombre: "Calvin Klein",
            id: "ck"
        },
        precio: 27000,
    },

    {
        id: "ck-03",
        titulo: "Ck Every One",
        imagen: "./img/ck/ck-3.jpg",
        categoria: {
            nombre: "Calvin Klein",
            id: "ck"
        },
        precio: 22000,
    },

    // PACO RABANNE
    {
        id: "pr-01",
        titulo: "PR Invictus",
        imagen: "./img/paco-rabanne/pr-1.jpg",
        categoria: {
            nombre: "Paco Rabanne",
            id: "pr"
        },
        precio: 30000,
    },

    {
        id: "pr-02",
        titulo: "PR One Million",
        imagen: "./img/paco-rabanne/pr-2.jpg",
        categoria: {
            nombre: "Paco Rabanne",
            id: "pr"
        },
        precio: 29000,
    },

    {
        id: "pr-03",
        titulo: "PR Pure XS",
        imagen: "./img/paco-rabanne/pr-3.jpg",
        categoria: {
            nombre: "Paco rabanne",
            id: "pr"
        },
        precio: 24000,
    },
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll (".producto-agregar")
const recuento = document.querySelector("#recuento")

function cargarProductos (productosElegidos){
    
    contenedorProductos.innerHTML = ""

    productosElegidos.forEach(producto => {

        const div = document.createElement ("div");
        div.classList.add ("producto");
        div.innerHTML = `
        <img class="producto-imagen" src=" ${producto.imagen} " alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar () 
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if(e.currentTarget.id != "todos"){ 
            const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
        cargarProductos(productosBoton); 
        }else{
            tituloPrincipal.innerText = "Nuestras fragancias"
            cargarProductos(productos)
        }
    })
});

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll (".producto-agregar");
    botonesAgregar.forEach (boton=>{
        boton.addEventListener("click", agregarAlCarrito)
    });
}


let productosEnCarrito
let productosEnCarritoLS =localStorage.getItem("productos-en-carrito")


if(productosEnCarritoLS){

    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarRecuento ()
}else{
    productosEnCarrito = []
}


function agregarAlCarrito (e){
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if (productosEnCarrito.some (producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex (producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push (productoAgregado); 
    }
    actualizarRecuento ()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}


function actualizarRecuento (){
    let nuevoRecuento = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0 )
    recuento.innerText = nuevoRecuento
}


