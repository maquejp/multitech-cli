import app from "./app.js";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
