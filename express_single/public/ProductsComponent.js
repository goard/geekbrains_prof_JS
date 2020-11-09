Vue.component('products', {
  data() {
    return {
      products: [],
      filtered: [],
      imgCatalog: 'https://picsum.photos/200/300',
    }
  },
  methods: {
    searchGoods(value) {
      let regexp = new RegExp(value, 'i')
      this.filtered = this.products.filter(el => regexp.test(el.product_name))
    },
  },
  mounted() {
    this.$parent.getJson(`/api/products`)
      .then(data => {
        for (let el of data) {
          this.products.push(el)
          this.filtered.push(el)
        }
      })
  },
  template: `<div class="goods-list">
              <product
                v-for="item of filtered"
                :key="item.id_product"
                :product="item"
                :img="imgCatalog">
              </product>
            </div>`
})
Vue.component('product', {
  props: ['product', 'img'],
  data() {
    return {
      cartAPI: this.$root.$refs.cart,
    }
  },
  template: `<div class="good-item">
              <img :src="img" alt="Some img">
              <div>
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}} &#8381;</p>
                <button class="btn btn-success" @click="cartAPI.addProduct(product)">Купить</button>
              </div>
            </div>`
})