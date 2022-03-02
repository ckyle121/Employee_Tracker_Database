const db = require('./db/connection');

// start server after db connection 
db.connect(err => {
    if (err) throw err;

    console.log('Database connected. Connect as id' + db.threadId);
});