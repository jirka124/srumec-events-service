import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Events service is running");
});

app.listen(PORT, () => {
  console.log(`Events service listening on port ${PORT}`);
});
