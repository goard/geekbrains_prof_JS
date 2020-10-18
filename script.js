class ProductList {
  constructor(container = ".goods-list") {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
    this._totalCost();
  }

  _fetchGoods() {
    this._goods = [
      {id:1, title: 'Notebook', price: 20000},
      {id:2, title: 'Mouse', price: 1500},
      {id:3, title: 'Keyboard', price: 5000},
      {id:4, title: 'Gamepad', price: 4500},
    ]
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
    let total = 0;
    for (let product of this._goods) {
      total += product.price
    }
    totalHead.insertAdjacentHTML("beforeend",total)
  }
}
class ProductItem {
  constructor(product, img="https://picsum.photos/200/300") {
    this.title = product.title;
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
// const goods = [
//   { id: 1, title: 'Shirt', price: 150 },
//   { id: 2, title: 'Socks', price: 50 },
//   { id: 3, title: 'Jacket', price: 350 },
//   { id: 4, title: 'Shoes', price: 250 },
// ];

// const renderGoodsItem = (title, price, img="https://picsum.photos/200/300") => {
//   return `<div class="goods-item">
//             <img src="${img}" alt="goods">
//             <h3>${title}</h3>
//             <p>${price} руб.</p>
//             <button class="btn btn-success" type="button">Добавить в корзину</button>
//           </div>`;
// };

// const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
//   console.log(goodsList)
//   document.querySelector('.goods-list').innerHTML = goodsList.join('');
// }

// renderGoodsList(goods);
