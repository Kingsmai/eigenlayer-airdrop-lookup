const express = require("express");
const fs = require("fs");
const csv = require("csv-parse");
const os = require("os"); // 引入 os 模块
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
    tokens.set(row.Address, row.Tokens);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", (req, res) => {
  const addresses = req.body.addresses.replace(/\r\n|\r/g, "\n").split("\n");
  const results = addresses.map((address) => {
    const tokenValue = tokens.get(address.trim());
    const formattedToken = tokenValue ? parseFloat(tokenValue).toFixed(3) : "未找到";
    return {
      address,
      token: formattedToken,
    };
  });
  res.render("index", { results });
});

// 获取本机 IP 地址
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // 默认返回本地地址
}

app.listen(PORT, () => {
  const localIp = getLocalIpAddress();
  console.log(`Server is running on http://${localIp}:${PORT}`);
});
