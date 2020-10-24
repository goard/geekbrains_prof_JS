const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error')
      }
      else {
        cb(xhr.responseText)
      }
    }
  };
  xhr.send();
}

class ProductList {
  _goods;

  constructor(container = ".goods-list") {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._getProducts().then((data) => {
      this._goods = [...data];
      this._render()
    })
    this._totalCost();
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch((error) => {
        console.log(error)
      });
  }

  _render() {
    const block = document.querySelector(this.container)

    for (let product of this._goods) {
      const productObject = new ProductItem(product)

      this._allProducts.push(productObject)

      block.insertAdjacentHTML('beforeend', productObject.render())
    }
  }

  _totalCost() {
    const totalHead = document.querySelector('.total')
    let total = this._goods.reduce((sum, {price}) => sum + price, 0)
    totalHead.insertAdjacentHTML("beforeend",total)
  }
}
class ProductItem {
  constructor(product, img="https://picsum.photos/200/300") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id=${this.id}>
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <button class="btn btn-success" type="button">Купить</button>
              </div>
            </div>`;
  }
}

class SendForm {
  constructor() {

  }

  _sendForm() {

  }
}

const cart = new ProductList()

//Home work for Lesson4
let str = 'dfghjk \'dfg\' aren\'t \'sdf' ;
console.log(str)
let regExp = /\b\'\B|\B\'\b/ig
console.log(regExp)
console.log(str.replace(regExp, '\"'))