var util = require('util');
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

/*
 Executes a MySQL Query
 @param param.query : the query to execute
 */
exports.mysql = function(params, cb){
  console.log('in the cloud running the mysql module');
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD
  });
  
  console.log('params are :- ' + params);

  connection.connect();
  console.log('connected');

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
