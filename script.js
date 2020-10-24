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

    this._getProducts();
  }

  // _getProducts() {
  //   return fetch(`${API}/catalogData.json`)
  //     .then(response => response.json())
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }

  _getProductsXhr(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      if (url) {
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              console.log('Error')
            }
            else {
              resolve(JSON.parse(xhr.responseText))
            }
          }
        }
        xhr.send();
      } else {
        reject('Error: Add url')
      }
    })
  }

  _getProducts() {
    this._getProductsXhr(`${API}/catalogData.json`)
      .then((data) => {
        this._goods = [...data];
        this._render();
        this._totalCost();
      })
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
    let total = this._goods.reduce((sum, { price }) => sum + price, 0)
    totalHead.insertAdjacentHTML("beforeend", total)
  }

  _addGoodsCost() {

  }

  _removeGoodsCost() {

  }

  getListCost() {

  }
}
class ProductItem {
  constructor(product, img = "https://picsum.photos/200/300") {
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

const cart = new ProductList()

// fetch(`${API}/catalogData.json`)
//   .then((res) => res.json())
//   .then((res)=>{
//     console.log(res)
//   })