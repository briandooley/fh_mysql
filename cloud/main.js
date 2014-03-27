var util = require('util');
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

/* 'getConfig' server side REST API method.
 * Trivial example of pulling in a shared config file.
 */
exports.getConfig = function(params, callback) {
  console.log("In getConfig() call");
  var cfg = require("config.js");
  return callback(null, {config: cfg.config});
};

  
/*
 Executes a MySQL Query
 @param param.query : the query to execute
 */
exports.mysql = function(params, cb){
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD
  });
  
  console.log('params are :- ' + params);

  console.log('about to connect');
  connection.connect();
  console.log('after connect');

  connection.query(params.query, function(err, rows, fields) {
    if (err){
        console.log('err:- ' + err);
      return cb(err);
    }

    console.log('rows:- ' + rows);
    console.log('fields :- ' + fields);

    return cb(err, {rows : rows, fields : fields });
  });

  connection.end();
};
