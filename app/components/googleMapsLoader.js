import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: 'AIzaSyCziTRCAS24xZAsN9cjqhI4w_oUE8velIw',
    version: 'weekly',
    libraries: ['places'],
  });
  export default loader;