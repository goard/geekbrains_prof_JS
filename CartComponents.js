Vue.component('cart', {
  data() {
    return {
      imgCart: 'https://picsum.photos/50/100',
      cartUrl: '/getBasket.json',
      cartItems: [],
      switchShow: false,
    }
  },
  methods: {
    addProduct(product) {
      this.$parent.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product)
            if (find) {
              find.quantity++
            } else {
              let prod = Object.assign({ quantity: 1 }, product)
              this.cartItems.push(prod)
            }
          }
          else {
            alert('Error')
          }
        })
      console.log(product.id_product)
    },
    remove(item) {
      this.$parent.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--
            } else {
              this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
          }
        })
    },
  },
  mounted() {
    this.$parent.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el)
        }
      })
  },
  template: `<div>
              <button class="btn btn-primary btn-card" type="button" @click="switchShow=!switchShow">Корзина</button>
              <div class="card-visible" v-show="switchShow">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="item-card"
                  v-for="item of cartItems"
                  :key="item.id_product"
                  :cart-item="item"
                  :img="imgCart"
                  @remove="remove">
                </cart-item>
              </div>
            </div>`
});

Vue.component('cart-item', {
  props: ['cartItem', 'img'],
  template: `<div>
              <div>
                <img :src="img" alt="Some image" >
              </div>
              <div>
                <div>
                  <p class="text-card">{{cartItem.product_name}}</p>
                  <p class="text-card">Количество: {{cartItem.quantity}}</p>
                  <p class="text-card">{{cartItem.price}}&#8381; за единицу</p>
                  <p class="text-card">{{cartItem.quantity*cartItem.price}}&#8381;</p>
                </div>
              </div>
              <button class="btn btn-danger" @click="$emit('remove',cartItem)">x</button>
            </div>`
})