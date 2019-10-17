var connection = require("../config/connection")

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];//"false"
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {//hasOwnProperty.call 
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
    selectAll: function (table, cb){
        connection.query(`SELECT * FROM ${table}`, function(err, data){
            if (err) throw err;
            cb(data);
        })
    },
    insertOne: function (table, cols, vals, cb){
        var questionMarks = printQuestionMarks(vals.length)
        connection.query(`INSERT INTO ${table} (${cols.toString()}) VALUES (${questionMarks})`, vals, function(err, data){
            if (err) throw err;
            cb(data);
        })
    },
    updateOne: function (table, objColVals, condition, cb){
        var formatObj = objToSql(objColVals)
        connection.query(`UPDATE ${table} SET ${formatObj} WHERE ${condition}`, function(err, data){
            if (err) throw err;
            cb(data);
        })
    },
    deleteOne: function(table, condition, cb){
      connection.query(`DELETE FROM ${table} WHERE ${condition}`, function(err, data){
        if (err) throw err;
        cb(data);
      })
    }
}

module.exports = orm