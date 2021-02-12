// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor() {
    var x = JSON.parse(localStorage.getItem("products"));

    const template = document.createElement('template');
    template.innerHTML= `
      <style>.price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
      </style>
      <li class="product">
      <img id="pic" src="" alt="" width=200>
      <p id="title" class="title"></p>
      <p id="price" class="price"></p>
      <button id="button">Add to Cart</button>
      </li>`

    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.appendChild(template.content.cloneNode(true));
    this.root.getElementById("button").addEventListener('click', this.myfunc);
  }
  
  set item(newValue) {
    this.shadowRoot.getElementById("pic").src= newValue.image;
    this.shadowRoot.getElementById("pic").alt= newValue.title;
    this.shadowRoot.getElementById("title").innerText = newValue.title;
    this.shadowRoot.getElementById("price").innerText = newValue.price;
    this.setAttribute("id", newValue.id);
  }
  set cartR (newValue) {
    this.root.getElementById("button").innerText = newValue;
  }
  myfunc = () => {
    var x = JSON.parse(localStorage.getItem("products"));
    if ( (localStorage.getItem("cartItems")!=null)) {
      items = localStorage.getItem("cartItems").split(',');
    }

    if(this.root.getElementById("button").innerText == 'Remove from Cart') {
      var index = items.indexOf(this.id);
      items.splice(index, 1);
      document.getElementById('cart-count').innerHTML = items.length;
      this.root.getElementById("button").innerText = 'Add to Cart';
    }
    else {
      this.root.getElementById("button").innerText = 'Remove from Cart';
      // counter++;
      items.push(this.id);
      document.getElementById('cart-count').innerHTML = items.length;
      alert('Added to Cart!');
    }
    localStorage.setItem('cartItems', items.toString());
  }
}
var counter = 0;
var items = [];
customElements.define('product-item', ProductItem);