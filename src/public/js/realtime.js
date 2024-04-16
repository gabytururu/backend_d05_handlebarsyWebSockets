const socket=io()
let productsList = document.querySelector('#productsList')

socket.on("newProduct", ...product=>{
    console.log(`se agrego el nuevo producto: ${product}`)
    productsList.innerHTML += `<li>${{...product}}</li>`
})