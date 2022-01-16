const migrate = require("./lib/db.js");

migrate().then(console.log).catch(console.error);
