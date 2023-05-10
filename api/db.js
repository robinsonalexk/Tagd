const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let _db;

module.exports = {
    connect: async () => {
        client.connect().then(() => {
            console.log("Connected to Mongo Database");
            _db = client.db(process.env.MONGO_DB);
        }).catch((e) => {
            console.log(e);
        })
    },
    getDb: () => {
        return _db;
    }
}