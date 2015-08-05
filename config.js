/**
 *
 * You can pass variables before calling `node index.js`, for example:
 * `ENV=hahahaha node index.js`
 *
 * @param {ENV} 'defaults to development'
 */

var config = {
  environment: process.env.ENV || 'development',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/nomnomnom',
  paths: {
    json: process.env.JSON_DIR || '../spark-container/data/30_5mill.json'
  }
};

module.exports = config;
