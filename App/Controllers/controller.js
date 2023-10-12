const biertje = require("../../models/Model");

//create
exports.create = (req, res) => {
    if (req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a bier
      const biertje = new biertje({
        title: req.body.title,
        brouwer: req.body.brouwer,
        procent: req.body.procent,
        published: req.body.published || false
      });
    
      Tutorial.create(tutorial, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "er is iets fout gegaan terwijl het biertje werd gebrouwd."
          });
        else res.send(data);
      });
};

// get all
exports.findAll = (req, res) => {
    const bier = req.query.biertje;

    biertje.getAll(bier, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "kon de biertjes niet tappen."
          });
        else res.send(data);
      });
};


//get one
exports.findOne = (req, res) => {
    biertje.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `kon het biertje: ${req.params.id} niet vinden.`
            });
          } else {
            res.status(500).send({
              message: "een error kwam boven met het zoeken naar het biertje: " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// get all published
exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "kon de biertjes niet tappen."
        });
      else res.send(data);
    });
};

//update
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "geen legen glazen hier"
        });
      }
    
      console.log(req.body);
    
      biertje.updateById(
        req.params.id,
        new bier(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `kon het biertje: ${req.params.id} niet vinden.`
              });
            } else {
              res.status(500).send({
                message: "kon het nieuwe biertje: " + req.params.id + " niet brouwen"
              });
            }
          } else res.send(data);
        }
      );
};

// delete
exports.delete = (req, res) => {
    biertje.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `kon het biertje: ${req.params.id} niet vinden.`
            });
          } else {
            res.status(500).send({
              message: "kon de fles: " + req.params.id + "niet leeg gieten."
            });
          }
        } else res.send({ message: `De fles is leeg gegoten!` });
      });
};

// delete all
exports.deleteAll = (req, res) => {
    biertje.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "we konden niet alles weggooien."
          });
        else res.send({ message: `we hebben alles opgedronken!` });
      });
};