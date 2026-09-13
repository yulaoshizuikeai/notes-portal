# 高考全科知识库总门户 (note.yunet.cfd)

高考理科知识体系中枢导航，现已部署上线至顶级域名 **[note.yunet.cfd](https://note.yunet.cfd)**。

---

## 📁 目录结构

- `index.html`：门户纯前端源码（单文件现代 UI、自适应玻璃态设计、全科知识库卡片导航）。
- `portal_icon.svg`：三科交汇向量图标徽章。
- `favicon.svg`：高分辨率网站 Favicon。
- `build.js`：将 `index.html` 及附属矢量资源自动打包嵌入 `worker.js` 的构建脚本。
- `worker.js`：用于直接部署至 Cloudflare Workers 的边缘服务脚本（支持 SEO 元标签、多格式站点地图、301 永久重定向与安全响应头）。
- `wrangler.toml`：Cloudflare Workers 路由与部署配置文件。

---

## 🛠️ 本地预览与构建

### 1. 本地预览
直接在浏览器中双击打开 `index.html`，即可离线预览门户完整排版、卡片动效与主题配色。

### 2. 更新后重新打包
修改 `index.html` 或相关资源后，在当前目录下运行：
```bash
npm run build
# 或者
node build.js
```

### 3. 校验语法
```bash
npm test
```

---

## 🌐 域名与各学科分流规则

| 域名 / 路径 | 目标 / 行为 |
| :--- | :--- |
| **`https://note.yunet.cfd`** | 高考全科知识库总门户（默认首屏） |
| **`https://note.yunet.cfd/physics`** | 301 永久重定向至高考物理知识库 **`https://physics.yunet.cfd`** |
| **`https://note.yunet.cfd/biology`** | 301 永久重定向至高考生物知识库 **`https://biology.yunet.cfd`** |
| **`https://note.yunet.cfd/chemistry`** | 301 永久重定向至高考化学知识库 **`https://chemistry-note.seeridia.top`** |
| **`https://note.yunet.cfd/sitemap.xml`** | 搜索引擎 Sitemap 站点地图 |
| **`https://note.yunet.cfd/robots.txt`** | 爬虫抓取协议 |

---

## 👨‍💻 维护者

- Author: **Yulaoshizuikeai**
- Brand: **Yulaoshizuikeai's Physics Note & Highschool Notes Network**
