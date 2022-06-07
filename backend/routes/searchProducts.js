const e = require("express");
const { response } = require("express");

const router = require("express").Router();

let collection = context.services.get("mongodb-atlas").db("store").collection("products");
router.get("/", async (req, res) => {
    try{
        const result = await collection.aggregate([
            {
                "$search": {
                    "text": {
                        "query": `${request.query.term}`,
                        "path": "*",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
                
            }
            
        ]).toArray();
        response.send(result);
    }
    catch(err){
        res.status(500).send({message: e.message});
    }
});