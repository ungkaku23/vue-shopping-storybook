import { app } from '@storybook/vue3';
import store from '../src/store'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { v4 as uuidv4 } from 'uuid';

app.use(store);

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

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
