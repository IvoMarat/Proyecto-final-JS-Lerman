let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector ("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector ("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector ("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector ("#carrito-comprado");
let botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0 ){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove ("disabled");
        contenedorCarritoAcciones.classList.remove ("disabled");
        contenedorCarritoComprado.classList.add ("disabled");
    
        contenedorCarritoProductos.innerHTML = []
    
        productosEnCarrito.forEach(producto =>{
            
            const div = document.createElement ("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Nuestras fragancia</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-productp-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
            
        contenedorCarritoProductos.append(div)
        })
    
    }else{
    
        Swal.fire({
            title: 'Tienes tu carrito vacío',
            text: 'Selecciona tus productos',
            icon: 'error',
            confirmButtonText: 'Volver a inicio'
        }).then ((result) => {
            if (result.isConfirmed){
            location.href= "./index.html"
            }
        })
        contenedorCarritoProductos.classList.add ("disabled");
        contenedorCarritoAcciones.classList.add ("disabled");
        contenedorCarritoComprado.classList.add ("disabled");    
    }

    actualizarBotonesEliminar ();
    actualizarTotal ()
}

cargarProductosCarrito()


function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar");

    botonesEliminar.forEach (boton=>{
        boton.addEventListener("click", eliminarDelCarrito)

    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Toastify({
        text: "Se ha eliminado el producto",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
        background: "#f5cb5c",
        color: "black"
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito()

    Swal.fire({
        title: 'Se han eliminado los productos del carrito',
        text: 'Seleccionalos nuevamente',
        icon: 'warning',
        confirmButtonText: 'Volver a inicio'
    }).then ((result) => {
        if (result.isConfirmed){
        location.href= "./index.html"
        }
    })
}

function actualizarTotal (){
    total.innerText ="$" + productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0); 
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito()

    Swal.fire({
        title: 'Muchas gracias por su compra',
        text: 'Que lo disfrutes',
        icon: 'success',
        confirmButtonText: 'Volver a inicio'
    }).then ((result) => {
        if (result.isConfirmed){
        location.href= "./index.html"
        }
    })
}

