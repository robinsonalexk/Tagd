const db = require("../db");
const { ObjectId } = require("mongodb");


const getAll = (req, res) => {
    let conn = db.getDb();
    let params = req.query;

    let filter = {};
    for(let val in params){
        filter[`${val}`] = {$all: params[val]}
    }

    conn.collection("items")
        .find(filter)
        .toArray((err, result) => {
            res.json(result)
    });
    //TODO: ADD PAGINATION
}

const getTags = (req, res) => {
    let conn = db.getDb();
    conn.collection("items")
        .aggregate([{ $unwind: "$tags" }, {$group: {_id: "$tags", count: { $sum: 1 }}}])
        .toArray((err, result) => {
            res.json(result);
        });
}  

const create = (req, res) => {
    let body = req.body;
    
    body.postTime = new Date(Date.now());
    let conn = db.getDb();
    conn.collection("items").insertOne(req.body);
    res.send({message: "recieved"})
}

const update = (req, res) => {
    let body = req.body;
    let conn = db.getDb();
    conn.collection("items").updateOne({_id: ObjectId(body._id)}, {$push: {comments: {_cid: ObjectId(Math.floor(new Date().getTime()/1000)), content: [...body.comments]}}})
    res.send({message: "recieved"});   
}

module.exports = { getAll, getTags, create, update }