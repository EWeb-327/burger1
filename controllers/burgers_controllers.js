var express = require("express")
var router = express.Router()
var burger = require("../models/burger")

router.get("/", function(req,res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);

        res.render("index", hbsObject)
    });
});

router.post("/api/burgers", function(req,res){
    burger.create([
        "burger_name", "devoured"
    ],[
        req.body.burger_name, req.body.devoured
    ], function(data){
        res.json({id: data.insertId});
    });
});

router.put("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id;
    console.log(req.body)

    console.log("condition", condition);
    burger.update({
        devoured: req.body.devoured
    }, condition, function(data){
        if(data.changedRows === 0){
            return res.json(404).end();
        } else {
            res.status(200).end();
        };
    });
});

router.delete("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id;
    burger.delete(condition, function(data){
        if(data.affectedRows === 0){
            return res.json(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router;