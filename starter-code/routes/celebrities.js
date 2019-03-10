const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/index", { celebrities });
    })
    .catch(err => {
      next();
      return err;
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => res.render("celebrities/show", celebrity))
    .catch(err => {
      next();
      return err;
    });
});

router.get('/new', (req, res, next) => {
  res.render("celebrities/new");
});

router.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  new Celebrity({ name, occupation, catchPhrase })
    .save()
    .then(() => {
      res.redirect('/celebrities/');
    })
    .catch(err => {
      console.log("An error occured while saving :", err);
      res.redirect("/celebrities/new");
    });
});

router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities/');
    })
    .catch(err => {
      next();
      return err;
    });
});

module.exports = router;