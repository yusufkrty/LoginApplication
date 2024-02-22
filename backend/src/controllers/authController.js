const express = require("express");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const config = require("../config/config");
const User = require("../models/user");

// Kullanıcı bilgilerini geçici olarak saklamak için cache oluştur
const userCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
// stdTTL -> veri kaç saniye kalacak
//checkperiod -> süresi biten veriler kaç saniye periyod ile kontrol edilip silinecek

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email);
  try {
    // Cache'te kullanıcı var mı kontrol et
    const cachedUser = userCache.get(email);
    
    if (cachedUser) {
      const {email} = cachedUser;
      console.log("CACHED MAİL"+email);
      const accessToken = jwt.sign({email}, config.secretKey, {
        expiresIn: "5000",
      });
      console.log(email);
      const refreshToken = jwt.sign({email}, config.secretKey, {
        expiresIn: "7d",
      });
      console.log(email);
      return res.json({
        accessToken,
        refreshToken,
        userInfo: { email },
      });
    }
    

    // Cache'te yoksa veritabanından kontrol et
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Geçersiz Kullanıcı Bilgileri" });
    }

    //Kullanıcıyı cache'e ekle
    userCache.set("email",user);
    console.log("CACHELENMİS USERLAR"+userCache.get("email"));
   
   
    const accessToken = jwt.sign({email}, config.secretKey, {
      expiresIn: "5000",
    });
    console.log(accessToken);
    const refreshToken = jwt.sign({email}, config.secretKey, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
      
    });
  } catch (error) {
    console.error("Login Hatası:", error);
    res.status(500).json({ message:"Sunucu Hatası"});
  }
}

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  console.log("REFRESH TOKEN ALINDI");

  try {
    const email = verifyRefreshToken(refreshToken);
    console.log("REFRESH TOKEN ALINDI TRY");
    if (!email) {
      console.log("TOKEN ALINDI E MAİL GEÇERSİZ");
      return res.status(401).json({ message: "Geçersiz refresh token" });
    }

    // Cache'te kullanıcı var mı kontrol et
    //const cachedUser = userCache.get(email);
    /*if (!cachedUser) {
      return res.status(401).json({ message: "Kullanıcı Bulunamadı" });
    }*/

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
