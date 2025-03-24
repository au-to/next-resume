"use client";

import React, { useRef } from "react";
import Navbar from "@/components/resume/Navbar";
import { useResumeContext } from "@/components/resume/ResumeContext";
import { useReactToPrint } from "react-to-print";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaDownload, FaPrint } from "react-icons/fa";

export default function ExportPage() {
  const { resumeData } = useResumeContext();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${resumeData.basics.name}-简历`,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            导出简历
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            您可以打印简历或保存为PDF文件。请确保您的简历内容完整且准确。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePrint}
              className="btn btn-primary gap-2"
            >
              <FaPrint />
              打印简历
            </button>
            <button
              onClick={handlePrint}
              className="btn btn-outline btn-primary gap-2"
            >
              <FaDownload />
              下载为PDF
            </button>
          </div>
        </div>
        
        {/* 简历打印区域 */}
        <div className="hidden">
          <div 
            ref={resumeRef}
            className="bg-white p-10 max-w-[210mm] mx-auto my-0"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm",
            }}
          >
            {/* 个人信息 */}
            <header className="mb-8 pb-4 border-b border-gray-300">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.basics.name}</h1>
              <p className="text-xl text-primary mb-4">{resumeData.basics.label}</p>
              
              <div className="text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resumeData.basics.email && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    <span>{resumeData.basics.email}</span>
                  </div>
                )}
                
                {resumeData.basics.phone && (
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-500" />
                    <span>{resumeData.basics.phone}</span>
                  </div>
                )}
                
                {resumeData.basics.website && (
                  <div className="flex items-center">
                    <FaGlobe className="mr-2 text-gray-500" />
                    <span>{resumeData.basics.website}</span>
                  </div>
                )}
                
                {resumeData.basics.location && (
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    <span>{resumeData.basics.location}</span>
                  </div>
                )}
              </div>
              
              {resumeData.basics.summary && (
                <div className="mt-4">
                  <p className="text-gray-700">{resumeData.basics.summary}</p>
                </div>
              )}
            </header>
            
            {/* 教育经历 */}
            {resumeData.education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  教育经历
                </h2>
                
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{edu.institution}</h3>
                        <p className="text-gray-700">
                          {edu.studyType} {edu.area && `· ${edu.area}`}
                        </p>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    {edu.gpa && (
                      <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}
            
            {/* 工作经验 */}
            {resumeData.work.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  工作经验
                </h2>
                
                {resumeData.work.map((work, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{work.company}</h3>
                        <p className="text-gray-700">{work.position}</p>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {work.startDate} - {work.endDate}
                      </div>
                    </div>
                    
                    {work.summary && (
                      <p className="text-gray-700 my-1">{work.summary}</p>
                    )}
                    
                    {work.highlights.length > 0 && (
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {work.highlights.map((highlight, i) => (
                          <li key={i} className="text-gray-700">{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}
            
            {/* 技能 */}
            {resumeData.skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  技能
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <span className="text-sm text-gray-600">{skill.level}</span>
                      </div>
                      {skill.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skill.keywords.map((keyword, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* 项目经验 */}
            {resumeData.projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  项目经验
                </h2>
                
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                    
                    {project.description && (
                      <p className="text-gray-700 my-1">{project.description}</p>
                    )}
                    
                    {project.highlights.length > 0 && (
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="text-gray-700">{highlight}</li>
                        ))}
                      </ul>
                    )}
                    
                    {project.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.keywords.map((keyword, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
            
            {/* 语言能力 */}
            {resumeData.languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  语言能力
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {resumeData.languages.map((lang, index) => (
                    <div key={index} className="mb-1">
                      <span className="font-semibold">{lang.language}:</span>{" "}
                      <span className="text-gray-700">{lang.fluency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 