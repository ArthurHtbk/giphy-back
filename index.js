require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { BASE_URL, PUBLIC_API_KEY, PORT } = process.env;

app.get("/gifs", async (req, res) => {
  const { value, limit, offset } = req.query;
  try {
    const response = await axios.get(
      `${BASE_URL}?api_key=${PUBLIC_API_KEY}&q=${value}&limit=${limit}&offset=${offset}&rating=g`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log("Server started!");
});
