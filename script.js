const goods = [
  { id: 1, title: 'Shirt', price: 150 },
  { id: 2, title: 'Socks', price: 50 },
  { id: 3, title: 'Jacket', price: 350 },
  { id: 4, title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price, img="https://picsum.photos/200/300") => {
  return `<div class="goods-item">
            <img src="${img}" alt="goods">
            <h3>${title}</h3>
            <p>${price} руб.</p>
            <button class="btn btn-success" type="button">Добавить в корзину</button>
          </div>`;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  console.log(goodsList)
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);
