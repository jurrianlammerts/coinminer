const axios = require('axios');

const API_NEXT = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next';
const API = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain/';

const lastBlock = () => axios.get(API_NEXT);

const postBlock = nonce => {
  return axios.post(API, {
    nonce: nonce,
    user: 'Jurrian 0914922'
  });
};

module.exports = { lastBlock };
