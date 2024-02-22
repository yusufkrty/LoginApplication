const express = require("express");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const config = require("../config/config");
const User = require("../models/user");

// Create a cache to store user emails
const userCache = new NodeCache({ stdTTL: 0 });

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user email is already in the cache
    const cachedUser = userCache.get(email);

    if (cachedUser) {
      const { email } = cachedUser;
      const accessToken = jwt.sign({ email }, config.secretKey, {
        expiresIn: "5000",
      });
      const refreshToken = jwt.sign({ email }, config.secretKey, {
        expiresIn: "7d",
      });

      return res.json({
        accessToken,
        refreshToken,

      });
    }

    // If not in cache, check the database
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Geçersiz Kullanıcı Bilgileri" });
    }

    // Add the user email to the cache
    userCache.set(email, user);

    const accessToken = jwt.sign({ email }, config.secretKey, {
      expiresIn: "5000",
    });
    const refreshToken = jwt.sign({ email }, config.secretKey, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Hatası:", error);
    res.status(500).json({ message: "Sunucu Hatası" });
  }
}

module.exports = { login };

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;


  try {
    const email = verifyRefreshToken(refreshToken);

    if (!email) {

      return res.status(401).json({ message: "Geçersiz refresh token" });
    }

    const newAccessToken = jwt.sign({ email }, config.secretKey, {
      expiresIn: "5000",
    });

    res.status(201).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Sunucu Hatası" });
  }
}

function verifyRefreshToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, config.secretKey);
    return decoded.email;
  } catch (error) {
    return null;
  }
}

module.exports = { login, refreshAccessToken, verifyRefreshToken };
