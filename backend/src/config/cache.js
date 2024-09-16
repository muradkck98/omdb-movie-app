const NodeCache = require('node-cache');

// stdTTL = standat zaman aşımı ön bellekte ne kadar duracak
// checkperiod = her ne kadar süreyle kontrol edilecek(ön bellek temizlenmesi)
const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

module.exports = cache;
