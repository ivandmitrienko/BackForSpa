const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const {
  getProduct, 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  updateProduct
} = require("./controllers/controllers")

const productScheme = new Schema(
  {
    nameOfProduct: String,
    nameOfPrice: Number,
    image: String,
    count: Number,
  },
  { versionKey: false }
);
const Product = mongoose.model("Product", productScheme);

// app.use(express.static(__dirname + "/public"));

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productsdb");
    app.listen(3000);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
}
// получаем все продукты
app.get("/", getProducts);
// получаем один продукт по id
app.get("/ProductDescription/:id", getProduct);
// сохраняем в бд
app.post("/", jsonParser, saveProduct);
// удаляем по id
app.delete("/ProductDescription/:id", deleteProduct);
// обновляем данные пользователя по id
app.put("/", jsonParser, updateProduct);

main();
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Приложение завершило работу");
  process.exit();
});
