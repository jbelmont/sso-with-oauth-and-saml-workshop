const {join} = require('path');

module.exports = (app) => {
  const db = require(join(__dirname, '../db/db'));
  db.dbActions().then(values => {
    const data = {
      users: JSON.stringify(values)
    };

    app.get('/', (req, res) => {
      return res.send(data);
    });
  });
};
