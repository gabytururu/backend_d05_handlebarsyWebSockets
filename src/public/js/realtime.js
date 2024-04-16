const socket=io()
let productsList = document.querySelector('#ulcontainer')

socket.on("newProduct", prodToPost=>{
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Nuevo Producto Agregado",
            showConfirmButton: false,
            timer: 1500
          });
        productsList.innerHTML += `
            <div class="productCard">
                <li>
                    <strong>${prodToPost.data.title}:</strong> ${prodToPost.data.description}
                </li>
            <div>
        `
})

socket.on("productDeleted", productsListPostDel=>{
    Swal.fire("Producto borrado de la Lista");
    productsList.innerHTML=""
    productsListPostDel.forEach(prod=>{
        productsList.innerHTML += `
            <div class="productCard">
                <li>
                    <strong>${prod.title}:</strong> ${prod.description}
                </li>
            <div>
        `
    })
})