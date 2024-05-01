const express = require("express");
const fs = require("fs");
const csv = require("csv-parse");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// 读取 CSV 文件
const tokens = new Map();
fs.createReadStream("data.csv")
  .pipe(
    csv.parse({
      columns: true, // 指示第一行数据为字段名
      skip_empty_lines: true,
    })
  )
  .on("data", (row) => {
    tokens.set(row.Address, row.Tokens); // 确保字段名与 CSV 标头匹配
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    // console.log(tokens); // 输出处理完的数据，以便于检查
  });

// 根页面
app.get("/", (req, res) => {
  res.render("index");
});

// 查询处理
app.post("/search", (req, res) => {
  // 通过替换 \r\n 以及 \r，确保在所有操作系统上均能正确分割地址
  const addresses = req.body.addresses.replace(/\r\n|\r/g, "\n").split("\n");
  // console.log(addresses); // 可以在控制台看到处理后的地址列表，以便调试
  const results = addresses.map((address) => {
    const tokenValue = tokens.get(address.trim());
    // 检查 tokenValue 是否存在，并格式化为三位小数
    const formattedToken = tokenValue
      ? parseFloat(tokenValue).toFixed(3)
      : "未找到";
    return {
      address,
      token: formattedToken,
    };
  });
  res.render("index", { results });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
