var orm = require("../config/orm")

var burger = {
    all: function(cb){
        orm.selectAll("burgers", function(data){
            cb(data);
        });
    },
    create: function(cols, vals, cb){
        orm.insertOne("burgers", cols, vals, function(data){
            cb(data);
        });
    },
    update: function(objColVals, condition, cb){
        orm.updateOne("burgers", objColVals, condition, function(data){
            cb(data);
        });
    },
    delete: function(condition, cb){
        orm.deleteOne("burgers", condition, function(data){
            cb(data);
        });
    }
}
 module.exports = burger