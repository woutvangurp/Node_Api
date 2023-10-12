module.exports = app => {
    const biertje = require("../../Controllers/Controller")

    var router = require("express").Router();

    //create
    router.post("/", biertje.create);

    //alles ophalen
    router.get("/", biertje.findAll);

    //alle publisched ophalen
    router.get("/published", biertje.findAllPublished);

    //eentje ophalen met id
    router.get("/:id", biertje.findOne);

    //updaten
    router.put("/:id", biertje.update);

    //delete
    router.delete("/:id", biertje.delete);

    //delete alles
    router.delete("/", biertje.deleteAll);

    app.use('/api/biertje', router);
}