import "./setup";
import app from "./app";

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
