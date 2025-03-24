import Link from "next/link";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            <span className="text-primary">简历</span>生成器
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            创建专业、精美的简历，帮助你脱颖而出
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="flex items-center mb-4">
              <MdOutlineEditNote className="text-4xl text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">简单易用</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              直观的编辑界面，轻松填写和编辑简历内容。无需担心排版问题，专注于展示你的专业技能与经验。
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="flex items-center mb-4">
              <FaRegFilePdf className="text-4xl text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">专业导出</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              一键导出PDF格式的高质量简历，适合线上投递和打印使用。精美的排版和设计让你的简历脱颖而出。
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/editor" 
            className="btn btn-primary btn-lg text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
          >
            开始创建简历
          </Link>
        </div>

        <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 简历生成器 | 专注于帮助求职者创建专业简历</p>
        </div>
      </div>
    </div>
  );
}
