# EigenLayer 空投查询工具

## 项目介绍

这个项目是一个基于 Node.js 和 Express 的 Web 应用，它允许用户输入 Ethereum 地址列表，并查询与之对应的令牌（Tokens）数量。数据来源是一个预先准备好的 CSV 文件，其中包含地址和空投数。

## 功能特性

- 用户可以通过多行文本框输入多个地址。
- 提交地址后，页面会显示一个表格，表格中列出了每个地址及其对应的空投数。
- 如果某个地址在 CSV 文件中不存在，则显示“未找到”。

## 技术栈

- Node.js
- Express.js
- Pug (模板引擎)
- CSV-Parse (用于解析 CSV 文件)

## 安装指南

要在本地安装并运行这个项目，请按照以下步骤操作：

1. 克隆仓库：

```bash
git clone https://github.com/kingsmai/eigenlayer-airdrop-lookup.git
cd eigenlayer-airdrop-lookup
```

2. 安装依赖：

```bash
npm install
```

3. 启动服务器：

```bash
node run start
```

4. 访问应用：

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 来访问应用。

## 如何贡献

欢迎通过 GitHub 提交问题和拉取请求来贡献此项目。我们非常欢迎任何形式的贡献。

## 许可证

此项目采用 MIT 许可证。更多详情请查看 [LICENSE](LICENSE) 文件。
