import { Axios } from 'axios';
import runtime, {
  defineEffect,
  createContext,
  Future,
  log,
} from 'effect-runtime';

// Context allows different parts of the "app" to override a value for
// everything beneath it. React developers will find this idea familiar.
//
// This example uses context to set default Axios parameters, such as headers
// or the default hostname.
const provider = createContext(
  new Axios({ baseURL: 'http://api.open-notify.org' })
);

// For the sake of the example, here's a tiny HTTP effect "library".
const http = {
  get: defineEffect((getContext, ...args) => {
    return Future((future) => {
      // `getContext(...)` is magic. It searches up the execution stack until
      // it finds an override for the given provider, or it uses the default
      // value.
      getContext(provider)
        .get(...args)
        .then(future.resolve, future.reject);
    });
  }),
};

runtime(function* () {
  const response = yield http.get('/iss-now.json');
  yield log.print('Space Station Coordinates:', JSON.parse(response.data));

  const SpaceX = new Axios({ baseURL: 'https://api.spacexdata.com/v4' });

  // `provider.override(...)` replaces the axios context. Every function call
  // made within this override will automatically use the SpaceX axios
  // instance instead of the default ISS API.
  yield provider.override(SpaceX, function* () {
    const response = yield http.get('/roadster');
    yield log.print(`Roadster Orbit Details:`, JSON.parse(response.data));
  });
});
