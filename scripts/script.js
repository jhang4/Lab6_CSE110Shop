// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  fetch('https://fakestoreapi.com/products')
  .then( response => response.json() )
  .then(data => {
    localStorage.setItem('products', JSON.stringify(data));
  })

  var x = JSON.parse(localStorage.getItem("products"));

  if ((localStorage.getItem("cartItems") == '[""]') || (localStorage.getItem("cartItems")==null)) {
    var old = [];
  }
  else {
    var old = localStorage.getItem("cartItems").split(',');

  }

  for (i = 0; i < x.length; i++) {
    var x = JSON.parse(localStorage.getItem("products"));
    var prod = document.createElement('product-item');
    prod.item = x[i];

    old.forEach(element => {
      if (Number(element) == i+1){
        prod.cartR = 'Remove from Cart';
      }
    });

    document.getElementById("product-list").appendChild(prod);
    if (old[0] ==""){
      document.getElementById('cart-count').innerHTML = 0;
    }
    else {
      document.getElementById('cart-count').innerHTML = old.length;
    }
  }
});