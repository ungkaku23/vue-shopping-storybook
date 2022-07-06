import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { v4 as uuidv4 } from 'uuid';

const app = createApp(App)

app.use(store)

app.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyDUJcZMahLqhK9vPGaiskdp-pfWtwTpySE',
      // language: 'de',
      libraries: "places"
  },
})

app.mixin({
  methods: {
    randKey: () => uuidv4(),
  }
})

app.mount('#app')
