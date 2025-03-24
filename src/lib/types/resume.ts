export interface ResumeData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    summary: string;
    profiles: {
      network: string;
      username: string;
      url: string;
    }[];
  };
  education: {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    gpa: string;
    description: string;
  }[];
  work: {
    company: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }[];
  skills: {
    name: string;
    level: string;
    keywords: string[];
  }[];
  projects: {
    name: string;
    description: string;
    highlights: string[];
    keywords: string[];
    startDate: string;
    endDate: string;
    url: string;
  }[];
  languages: {
    language: string;
    fluency: string;
  }[];
}

export const defaultResumeData: ResumeData = {
  basics: {
    name: "张三",
    label: "软件工程师",
    email: "example@example.com",
    phone: "123-456-7890",
    website: "https://example.com",
    location: "上海市",
    summary: "富有经验的软件工程师，专注于web开发和用户体验设计。",
    profiles: [
      {
        network: "GitHub",
        username: "username",
        url: "https://github.com/username"
      }
    ]
  },
  education: [
    {
      institution: "上海大学",
      area: "计算机科学",
      studyType: "学士",
      startDate: "2015-09",
      endDate: "2019-06",
      gpa: "3.8",
      description: "主修计算机科学与技术，辅修数学。"
    }
  ],
  work: [
    {
      company: "科技有限公司",
      position: "前端开发工程师",
      website: "https://example.com",
      startDate: "2019-07",
      endDate: "至今",
      summary: "负责公司核心产品的前端开发与维护。",
      highlights: [
        "设计并实现了新的用户界面，提升用户体验",
        "优化前端性能，使页面加载速度提升50%",
        "参与产品迭代，提出并实现了多项改进建议"
      ]
    }
  ],
  skills: [
    {
      name: "Web开发",
      level: "高级",
      keywords: ["JavaScript", "TypeScript", "React", "Vue", "HTML", "CSS"]
    },
    {
      name: "后端技术",
      level: "中级",
      keywords: ["Node.js", "Express", "MongoDB", "SQL"]
    }
  ],
  projects: [
    {
      name: "个人网站",
      description: "使用React和Next.js构建的个人作品集网站。",
      highlights: [
        "实现响应式设计，适配各种设备",
        "集成博客功能，支持Markdown编写"
      ],
      keywords: ["React", "Next.js", "Tailwind CSS"],
      startDate: "2022-01",
      endDate: "2022-03",
      url: "https://myportfolio.com"
    }
  ],
  languages: [
    {
      language: "中文",
      fluency: "母语"
    },
    {
      language: "英语",
      fluency: "流利"
    }
  ]
} 