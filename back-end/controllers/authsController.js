const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Auth } = require('../models/authsModel');

// Création d'un compte utilisateur
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

// Connexion à un compte utilisateur existant
exports.login = (req, res) => {
  Auth.findOne({ email: req.body.email })
    .then(Auth => {
      if (!Auth) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, Auth.password)
        .then(async valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // Création d'un token d'identification
          const response = {
            userId: Auth._id,
            token: jwt.sign(
              { userId: Auth._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          }
          Auth.token = await response.token;
          await Auth.save();
          res.status(200).json(response);
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


