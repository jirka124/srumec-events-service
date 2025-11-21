import express from "express";
import eventRoutes from "#routes/eventRoutes.js";
import commentRoutes from "#routes/commentRoutes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Events service is running");
});

// REST API
app.use("/v1/events", eventRoutes);
app.use("/v1/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Events service listening on port ${PORT}`);
});
