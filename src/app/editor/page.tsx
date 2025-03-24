"use client";

import React, { useState } from "react";
import { useResumeContext } from "@/components/resume/ResumeContext";
import Navbar from "@/components/resume/Navbar";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

export default function EditorPage() {
  const { resumeData, updateBasics, updateEducation, addEducation, removeEducation, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeContext();
  
  const [activeTab, setActiveTab] = useState("basics");
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      basics: resumeData.basics,
    },
  });

  const onBasicsSubmit = (data: any) => {
    updateBasics(data);
    alert("个人信息已更新");
  };

  const tabs = [
    { id: "basics", label: "个人信息" },
    { id: "education", label: "教育经历" },
    { id: "work", label: "工作经验" },
    { id: "skills", label: "技能" },
    { id: "projects", label: "项目经验" },
    { id: "languages", label: "语言能力" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          编辑您的简历
        </h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap mb-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {activeTab === "basics" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onBasicsSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      姓名
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      defaultValue={resumeData.basics.name}
                      className="input input-bordered w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      职位头衔
                    </label>
                    <input
                      type="text"
                      {...register("label")}
                      defaultValue={resumeData.basics.label}
                      className="input input-bordered w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      邮箱
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      defaultValue={resumeData.basics.email}
                      className="input input-bordered w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      电话
                    </label>
                    <input
                      type="text"
                      {...register("phone")}
                      defaultValue={resumeData.basics.phone}
                      className="input input-bordered w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      网站
                    </label>
                    <input
                      type="text"
                      {...register("website")}
                      defaultValue={resumeData.basics.website}
                      className="input input-bordered w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      所在地
                    </label>
                    <input
                      type="text"
                      {...register("location")}
                      defaultValue={resumeData.basics.location}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    个人简介
                  </label>
                  <textarea
                    {...register("summary")}
                    defaultValue={resumeData.basics.summary}
                    rows={4}
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary text-white"
                  >
                    保存个人信息
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{edu.institution || "教育经历"}</h3>
                    <button 
                      onClick={() => removeEducation(index)}
                      className="btn btn-sm btn-circle btn-error"
                    >
                      <MdDelete />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        学校名称
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, { institution: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        专业
                      </label>
                      <input
                        type="text"
                        value={edu.area}
                        onChange={(e) => updateEducation(index, { area: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        学位
                      </label>
                      <input
                        type="text"
                        value={edu.studyType}
                        onChange={(e) => updateEducation(index, { studyType: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        GPA
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(index, { gpa: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        开始日期
                      </label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, { startDate: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="YYYY-MM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        结束日期
                      </label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, { endDate: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="YYYY-MM"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        描述
                      </label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(index, { description: e.target.value })}
                        rows={2}
                        className="textarea textarea-bordered w-full"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center">
                <button
                  onClick={() => addEducation({
                    institution: "",
                    area: "",
                    studyType: "",
                    startDate: "",
                    endDate: "",
                    gpa: "",
                    description: ""
                  })}
                  className="btn btn-outline btn-primary gap-2"
                >
                  <MdAdd />
                  添加教育经历
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "work" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {resumeData.work.map((work, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{work.company || "工作经验"}</h3>
                    <button 
                      onClick={() => removeWorkExperience(index)}
                      className="btn btn-sm btn-circle btn-error"
                    >
                      <MdDelete />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        公司名称
                      </label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        职位
                      </label>
                      <input
                        type="text"
                        value={work.position}
                        onChange={(e) => updateWorkExperience(index, { position: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        网站
                      </label>
                      <input
                        type="text"
                        value={work.website}
                        onChange={(e) => updateWorkExperience(index, { website: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        开始日期
                      </label>
                      <input
                        type="text"
                        value={work.startDate}
                        onChange={(e) => updateWorkExperience(index, { startDate: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="YYYY-MM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        结束日期
                      </label>
                      <input
                        type="text"
                        value={work.endDate}
                        onChange={(e) => updateWorkExperience(index, { endDate: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="YYYY-MM or 至今"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        工作概述
                      </label>
                      <textarea
                        value={work.summary}
                        onChange={(e) => updateWorkExperience(index, { summary: e.target.value })}
                        rows={2}
                        className="textarea textarea-bordered w-full"
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        工作亮点（每行一个）
                      </label>
                      <textarea
                        value={work.highlights.join("\n")}
                        onChange={(e) => updateWorkExperience(index, { 
                          highlights: e.target.value.split("\n").filter(item => item.trim() !== "") 
                        })}
                        rows={4}
                        className="textarea textarea-bordered w-full"
                        placeholder="输入工作亮点，每行一个"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center">
                <button
                  onClick={() => addWorkExperience({
                    company: "",
                    position: "",
                    website: "",
                    startDate: "",
                    endDate: "",
                    summary: "",
                    highlights: []
                  })}
                  className="btn btn-outline btn-primary gap-2"
                >
                  <MdAdd />
                  添加工作经验
                </button>
              </div>
            </motion.div>
          )}

          {/* 其他选项卡内容类似，此处省略 */}
          {activeTab === "skills" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                技能编辑功能即将推出
              </p>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                项目经验编辑功能即将推出
              </p>
            </motion.div>
          )}

          {activeTab === "languages" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                语言能力编辑功能即将推出
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}