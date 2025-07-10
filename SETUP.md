# 🚀 Hacknical 项目设置指南

## 快速开始

### 1. 自动设置（推荐）

```bash
npm run setup
```

这个命令会自动：
- 创建 `.env.local` 配置文件
- 设置 SQLite 数据库
- 生成 Prisma 客户端

### 2. 手动设置

如果自动设置失败，请按照以下步骤手动设置：

#### 步骤 1: 创建环境变量文件

复制 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

#### 步骤 2: 配置 GitHub OAuth

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: `Hacknical`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. 创建应用后，复制 `Client ID` 和 `Client Secret`
5. 更新 `.env.local` 文件：

```env
GITHUB_CLIENT_ID=your_actual_client_id
GITHUB_CLIENT_SECRET=your_actual_client_secret
```

#### 步骤 3: 设置数据库

```bash
npx prisma db push
npx prisma generate
```

#### 步骤 4: 启动开发服务器

```bash
npm run dev
```

## 📁 项目结构

```
hacknical-next/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API 路由
│   │   ├── auth/          # NextAuth 认证
│   │   └── github/        # GitHub API
│   ├── auth/              # 认证页面
│   ├── dashboard/         # 仪表板页面
│   │   └── github/        # GitHub 分析页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── error.tsx          # 错误页面
│   └── not-found.tsx      # 404 页面
├── components/            # React 组件
│   ├── ui/               # UI 基础组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── alert.tsx
│   │   ├── loading.tsx
│   │   └── ...
│   ├── github/           # GitHub 相关组件
│   │   ├── github-stats.tsx
│   │   └── contribution-calendar.tsx
│   ├── nav.tsx           # 导航组件
│   ├── theme-toggle.tsx  # 主题切换
│   └── error-boundary.tsx # 错误边界
├── lib/                   # 工具库
│   ├── auth.ts           # NextAuth 配置
│   ├── db.ts             # 数据库配置
│   ├── github.ts         # GitHub API 服务
│   ├── types.ts          # TypeScript 类型
│   ├── env.ts            # 环境变量验证
│   └── utils.ts          # 工具函数
├── prisma/               # 数据库
│   └── schema.prisma     # 数据库 Schema
├── scripts/              # 脚本
│   └── setup.js          # 项目设置脚本
└── public/               # 静态文件
```

## 🛠️ 可用命令

### 开发命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run lint:fix     # 自动修复代码问题
npm run type-check   # TypeScript 类型检查
```

### 数据库命令
```bash
npm run db:push      # 推送 schema 到数据库
npm run db:generate  # 生成 Prisma 客户端
npm run db:migrate   # 创建数据库迁移
npm run db:studio    # 打开 Prisma Studio
npm run db:reset     # 重置数据库
```

### 项目命令
```bash
npm run setup        # 项目初始化设置
```

## 🔧 功能特性

### ✅ 已实现功能

1. **现代化架构**
   - Next.js 14 App Router
   - TypeScript 全栈类型安全
   - Tailwind CSS + shadcn/ui 组件

2. **身份认证**
   - NextAuth.js v5 集成
   - GitHub OAuth 登录
   - 会话管理

3. **GitHub 数据分析**
   - 仓库统计分析
   - 编程语言分布
   - 贡献日历可视化
   - 热门项目展示
   - 实时数据同步

4. **用户界面**
   - 响应式设计
   - 深色模式支持
   - 加载状态和错误处理
   - 现代化 UI 组件

5. **数据库**
   - Prisma ORM
   - SQLite（开发）
   - PostgreSQL（生产准备）

### 🚧 规划中功能

1. **简历生成器**
   - 多种专业模板
   - GitHub 项目自动同步
   - PDF 导出功能
   - 在线分享

2. **高级分析**
   - 代码质量分析
   - 技能趋势图表
   - 项目影响力评估

3. **社交功能**
   - 开发者排行榜
   - 项目推荐
   - 技能标签

## 🔍 故障排除

### 常见问题

**1. 数据库连接失败**
```bash
# 重新生成数据库
npm run db:reset
npm run db:generate
```

**2. GitHub OAuth 错误**
- 检查 `.env.local` 中的客户端 ID 和密钥
- 确认回调 URL 设置正确：`http://localhost:3000/api/auth/callback/github`

**3. 依赖安装问题**
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm install
```

**4. TypeScript 类型错误**
```bash
# 重新生成类型
npm run db:generate
npm run type-check
```

### 开发提示

1. **添加新的 UI 组件**
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. **修改数据库 Schema**
   ```bash
   # 修改 prisma/schema.prisma 后
   npm run db:push
   ```

3. **查看数据库内容**
   ```bash
   npm run db:studio
   ```

## 📊 性能监控

项目包含以下性能优化：

- **Next.js 14** - 最新的 React 服务器组件
- **Turbo** - 快速开发服务器
- **TypeScript** - 编译时类型检查
- **Tailwind CSS** - JIT 编译
- **数据缓存** - GitHub API 数据本地缓存

## 🚀 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 连接 Vercel 到仓库
3. 配置环境变量
4. 部署！

### 环境变量（生产）

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
DATABASE_URL=your-production-database-url
```

## 🤝 贡献

欢迎贡献代码！请查看 [README.md](./README.md) 了解详细的贡献指南。

---

如有任何问题，请创建 GitHub Issue 或查看项目文档。 