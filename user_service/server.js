const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`User Server is running on port ${PORT}`);
});
