Vue.component('error', {
  data() {
    return {
      text: '',

    }
  },
  methods: {
    setError(error) {
      this.text = error
    }
  },
  computed: {
    isVisible(){
      return this.text !== ''
    }
  },
  template: `
  <div class="modal-show" id="myModal" tabindex="-1" role="dialog" v-if="isVisible">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <p>
            <button @click="setError('')">x</button>
            {{text}}
          </p>
        </div>
      </div>
    </div>
  </div>
  `
})