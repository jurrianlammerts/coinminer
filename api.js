const axios = require('axios');

const API = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain';

const data = () => axios.get(API);

module.exports = { data };
