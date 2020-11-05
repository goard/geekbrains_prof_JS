const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    products: [],
    cartItems: [],
    filtered: [],
    imgCatalog: 'https://picsum.photos/200/300',
    imgCart: 'https://picsum.photos/50/100',
    searchLine: '',
    switchShow: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error)
        })
    },

    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product)
            if (find) {
              find.quantity++
            } else {
              let prod = Object.assign({quantity: 1}, product)
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
      this.getJson(`${API}/deleteFromBasket.json`)
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

    searchGoods() {
      let regexp = new RegExp(this.searchLine, 'i')
      this.filtered = this.products.filter(el => regexp.test(el.product_name))
    },

  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    this.getJson(`${API}${this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el)
        }
      })
    this.getJson(`${API}${this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el)
          this.filtered.push(el)
        }
      })
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    // console.log('beforeUpdate')

  },
  updated() {
    // console.log('updated')
    const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`)
    block.setAttribute("v-show", false)
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
})