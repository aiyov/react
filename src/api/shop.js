import data from './data.json';

const _products = data.seller;
const TIMEOUT = 100;

export default {
    // getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    getProducts: _products,
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}