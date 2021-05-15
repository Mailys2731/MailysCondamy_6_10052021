const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Auth } = require('../models/authsModel');

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const auth = new Auth({
        email: req.body.email,
        password: hash
      });
      auth.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  Auth.findOne({ email: req.body.email })
    .then(Auth => {
      if (!Auth) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, Auth.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: Auth._id,
            token: jwt.sign(
              { userId: Auth._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
/*const express = require("express");
const router = express.Router();

const { Auth } = require("../models/authsModel");


router.post("/signup", (req, res) => {
  const newRecord = new Auth({
    email: req.body.email,
    password: req.body.password,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error creating new data : " + err);
  })
});



module.exports = router;*/
