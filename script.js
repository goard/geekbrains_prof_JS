const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog : 'https://picsum.photos/200/300',
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
      console.log(product.id_product)
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created');
    this.getJson(`${API}${this.catalogUrl}`)
      .then(data => {
        for (el of data) {
          this.products.push(el)
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
    console.log('beforeUpdate')
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
})