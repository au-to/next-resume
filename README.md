# Hacknical - 现代化的 GitHub 简历生成器

> 基于 Next.js 14 构建的现代化 GitHub 数据分析和简历生成平台

## ✨ 主要特性

- 🔍 **GitHub 数据分析** - 深度分析您的 GitHub 活动和代码统计
- 📊 **可视化图表** - 美观的贡献日历、语言分布图等
- 📝 **智能简历生成** - 基于 GitHub 数据自动生成专业简历
- 🎨 **现代化 UI** - 使用 Tailwind CSS 和 shadcn/ui 组件
- 🔐 **安全认证** - GitHub OAuth 2.0 集成
- ⚡ **高性能** - Next.js 14 App Router + TypeScript
- 📱 **响应式设计** - 完美适配桌面和移动端

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn
- GitHub 账户

### 1. 克隆项目

```bash
git clone https://github.com/your-username/hacknical-next.git
cd hacknical-next
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
# Next.js
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret-key-here

# GitHub OAuth (需要在 GitHub 创建 OAuth App)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Database (SQLite for development)
DATABASE_URL="file:./dev.db"
```

### 4. 配置 GitHub OAuth App

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: `Hacknical`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. 创建应用后，复制 `Client ID` 和 `Client Secret` 到 `.env.local`

### 5. 初始化数据库

```bash
npx prisma db push
npx prisma generate
```

### 6. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 开始使用！

## 🏗️ 技术栈

### 前端
- **Next.js 14** - React 框架，App Router
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架
- **shadcn/ui** - 现代化 UI 组件库
- **Lucide React** - 图标库

### 后端
- **NextAuth.js v5** - 身份认证
- **Prisma** - 数据库 ORM
- **SQLite/PostgreSQL** - 数据库
- **GitHub API** - 数据获取

### 部署
- **Vercel** - 前端部署
- **Supabase/PlanetScale** - 生产数据库

## 📁 项目结构

```
hacknical-next/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API 路由
│   ├── auth/              # 认证页面
│   ├── dashboard/         # 仪表板页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # UI 基础组件
│   ├── github/           # GitHub 相关组件
│   └── nav.tsx           # 导航组件
├── lib/                   # 工具库
│   ├── auth.ts           # NextAuth 配置
│   ├── db.ts             # 数据库配置
│   ├── github.ts         # GitHub API 服务
│   └── utils.ts          # 工具函数
├── prisma/               # 数据库 Schema
└── public/               # 静态文件
```

## 🌟 核心功能

### GitHub 数据分析
- 📈 仓库统计和趋势分析
- 🎯 编程语言使用分布
- ⭐ 最受欢迎的项目展示
- 📅 年度贡献日历
- 👥 关注者和关注统计

### 简历生成器
- 📝 多种专业模板选择
- 🔄 GitHub 项目自动同步
- 📥 PDF 导出功能
- 🌐 在线分享链接
- ⚙️ 自定义主题和布局

### 实时同步
- 🔄 GitHub 数据实时同步
- 📊 数据可视化更新
- 🔔 同步状态通知

## 🛠️ 开发指南

### 添加新组件

```bash
# 创建新的 UI 组件
npx shadcn-ui@latest add [component-name]
```

### 数据库操作

```bash
# 查看数据库
npx prisma studio

# 重置数据库
npx prisma db push --force-reset

# 生成迁移
npx prisma migrate dev
```

### 代码格式化

```bash
# 格式化代码
npm run lint
npm run lint:fix
```

## 📊 API 端点

### GitHub 同步
- `GET /api/github/sync` - 获取同步数据
- `POST /api/github/sync` - 触发数据同步

### 认证
- `GET/POST /api/auth/*` - NextAuth.js 认证端点

## 🎨 自定义主题

项目使用 Tailwind CSS 和 CSS 变量支持深色模式：

```css
:root {
  --primary: 222.2 84% 4.9%;
  --secondary: 210 40% 96%;
  /* 更多主题变量... */
}
```

## 🚀 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 连接 Vercel 到你的 GitHub 仓库
3. 配置环境变量
4. 部署！

### 环境变量配置

生产环境需要配置：
- `AUTH_URL` - 你的域名
- `AUTH_SECRET` - 安全密钥
- `AUTH_GITHUB_ID` - GitHub OAuth Client ID
- `AUTH_GITHUB_SECRET` - GitHub OAuth Client Secret
- `DATABASE_URL` - 生产数据库连接字符串

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Prisma](https://prisma.io/) - 数据库 ORM
- [NextAuth.js](https://next-auth.js.org/) - 认证库

---

**⭐ 如果这个项目对你有帮助，请给一个 Star！**
