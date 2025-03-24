"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResumeContext } from "./ResumeContext";
import { FaRegFilePdf } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePreview, MdOutlineEdit } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  const { resetResumeData } = useResumeContext();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-xl font-bold">简历生成器</span>
            </Link>
          </div>

          <div className="hidden md:flex">
            <div className="flex space-x-4">
              <Link
                href="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/")
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <IoMdHome className="mr-1" />
                首页
              </Link>
              <Link
                href="/editor"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/editor")
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <MdOutlineEdit className="mr-1" />
                编辑器
              </Link>
              <Link
                href="/preview"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/preview")
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <MdOutlinePreview className="mr-1" />
                预览
              </Link>
              <Link
                href="/export"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/export")
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaRegFilePdf className="mr-1" />
                导出
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={resetResumeData}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary ml-4"
            >
              重置数据
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/">
                    <IoMdHome className="mr-1" />
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/editor">
                    <MdOutlineEdit className="mr-1" />
                    编辑器
                  </Link>
                </li>
                <li>
                  <Link href="/preview">
                    <MdOutlinePreview className="mr-1" />
                    预览
                  </Link>
                </li>
                <li>
                  <Link href="/export">
                    <FaRegFilePdf className="mr-1" />
                    导出
                  </Link>
                </li>
                <li>
                  <button onClick={resetResumeData}>
                    重置数据
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 