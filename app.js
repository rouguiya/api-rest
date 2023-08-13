const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/models/User"); // Importation du User

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour le traitement du corps des requêtes JSON
app.use(express.json());

mongoose
  .connect("mongodb://120.0.0.1:27017/Apirest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Route POST pour ajouter un nouvel utilisateur
app.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Route GET pour récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route GET pour récupérer un seul utlisateur par ID
  app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: error.message });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  // Route PUT pour modifier un utilisateur par ID
  app.put("/users/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Route PATCH pour mettre à jour un utilisateur par ID
  app.patch("/users/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json("User not found");
      res.send(user);
    } catch (error) {
      res.status(500).json("Error updating the post");
    }
  });
  
  // Route DELETE pour supprimer un utilisateur par ID
  app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndRemove(id);
      res.json(deletedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


app.listen(port, () => {
    console.log('le serveur est lancé sur le port: http://120.0.0.1:${port}');
} );