# 简历生成器 (Resume Builder)

一款简洁优雅的在线简历生成工具，帮助求职者快速创建专业简历。

## 技术栈

- **前端框架**: [Next.js](https://nextjs.org/) - React框架，提供服务器端渲染和静态生成
- **类型系统**: [TypeScript](https://www.typescriptlang.org/) - 提供类型安全和开发体验
- **样式解决方案**: 
  - [Tailwind CSS](https://tailwindcss.com/) - 实用工具优先的CSS框架
  - [DaisyUI](https://daisyui.com/) - 基于Tailwind的组件库
- **表单处理**: [React Hook Form](https://react-hook-form.com/) - 高效的表单验证和处理
- **UI组件**:
  - [React Icons](https://react-icons.github.io/react-icons/) - 图标库
  - [Framer Motion](https://www.framer.com/motion/) - 动画效果
- **PDF生成**: [React-to-Print](https://github.com/gregnb/react-to-print) - 简历打印和导出功能
- **部署平台**: [Vercel](https://vercel.com/) - 推荐的部署平台

## 主要功能

### 1. 简历数据管理
- 完整的个人信息编辑
- 教育经历管理（添加、编辑、删除）
- 工作经验管理（添加、编辑、删除）
- 技能管理
- 项目经验管理
- 语言能力管理
- 数据自动保存

### 2. 用户界面
- 响应式设计，适配移动和桌面设备
- 简洁直观的编辑界面
- 实时预览功能
- 深色/浅色模式支持

### 3. 导出功能
- 导出为PDF文件
- 打印功能
- 专业排版

### 4. 页面结构
- **首页**: 应用介绍和引导
- **编辑器页面**: 多选项卡式的简历内容编辑
- **预览页面**: 实时查看简历效果
- **导出页面**: 打印和导出功能

## 应用特点

- **简单易用**: 直观的界面设计，易于上手
- **专业排版**: 精心设计的布局，确保简历美观专业
- **响应式设计**: 在各种设备上提供良好的使用体验
- **无需注册**: 无需账户即可使用所有功能
- **隐私保护**: 所有数据存储在本地，保护用户隐私

## 未来计划

- 添加多种简历模板选择
- 实现简历数据的本地存储
- 添加云同步功能
- 支持简历分享
- 添加AI辅助生成简历内容功能
- 提供ATS优化建议

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/next-resume.git

# 进入项目目录
cd next-resume

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后在浏览器中访问 `http://localhost:3000`

## 许可证

MIT License
