import { app } from '@storybook/vue3';

import store from '../src/store'

import VueGoogleMaps from '@fawmi/vue-google-maps'

app.use(store);

app.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyDUJcZMahLqhK9vPGaiskdp-pfWtwTpySE',
      // language: 'de',
      libraries: "places"
  },
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
