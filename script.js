const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
  el: '#app',
  data: {
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error)
          this.$refs.error.setError(error)
        })
    },
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
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
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
})