import { CancelToken, isCancel, create as createClient } from 'axios';
import qs from 'qs';

const client = createClient({
  withCredentials: true,
  timeout: 15000,
  baseURL: '/',
  headers: {
    common: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    },
  },
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});

const originalRequest = client.request;
const createRequest = (method, containsData, ...requestArgs) => {
  let config = {};

  const source = CancelToken.source();
  const isRequestMethod = method === 'request';
  if (isRequestMethod) {
    config = requestArgs[0];
    config.cancelToken = source.token;
  } else {
    // parse arguments in case if called not api.request()
    const url = requestArgs[0];
    const passedConfig = (containsData ? requestArgs[2] : requestArgs[1]) || {};
    const data = containsData ? requestArgs[1] : {};
    // apply cancelToken
    config.cancelToken = source.token;
    config = { ...passedConfig, url, data, method, cancelToken: source.token };
  }
  // prepare request
  let isCancelled = false;
  let isResolved = false;
  // create request
  const promise = originalRequest.call(client, config);
  promise.then((resp) => {
    isResolved = true;
    return resp;
  });
  promise.isCancelled = () => isCancelled;
  promise.cancel = () => {
    if (!isCancelled && !isResolved) {
      source.cancel();
      isCancelled = true;
    }
  };
  return promise;
};
// proxied methods list to extend with cancelable feature
['request', 'delete', 'get', 'head', 'post', 'put', 'patch'].forEach((method) => {
  const containsData = ['post', 'put', 'patch'].includes(method);
  client[method] = (...args) => createRequest(method, containsData, ...args);
});

export default client;
export { CancelToken, isCancel };

export function registerReqResInterceptors(errorAction) {
  client.interceptors.request.use(
    response => response,
    (error) => {
      if (!isCancel(error)) {
        errorAction(error);
        throw error;
      }
    },
  );

  client.interceptors.response.use(
    response => response,
    (error) => {
      if (!isCancel(error)) {
        errorAction(error);
        throw error;
      }
    },
  );
}

/**
 * Wraps promise to provide ability to cancel it.
 * Wrapper should be used for promises, which are resolved via => ...fetch(get('dataPath'))
 * But not via Promise.resolve() way.
 * @param  {Object|Promise} promise
 * @param  {Function} dataPathGetter
 * @return {Object|Promise}
 */
export function makeCancelable(promise, dataPathGetter) {
  const cancelablePromise = new Promise((resolve, reject) => {
    promise
      .then(dataPathGetter)
      .catch(reject)
      .then(resolve);
  });
  cancelablePromise.cancel = promise.cancel;
  cancelablePromise.isCancelled = promise.isCancelled;
  return cancelablePromise;
}
