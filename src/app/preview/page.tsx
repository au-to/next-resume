"use client";

import React, { useRef } from "react";
import Navbar from "@/components/resume/Navbar";
import { useResumeContext } from "@/components/resume/ResumeContext";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function PreviewPage() {
  const { resumeData } = useResumeContext();
  const resumeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            简历预览
          </h1>
          <Link 
            href="/export" 
            className="btn btn-primary text-white"
          >
            导出为PDF
          </Link>
        </div>
        
        {/* 简历预览区域 */}
        <div 
          ref={resumeRef}
          className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-6 sm:p-10 mb-10"
        >
          {/* 个人信息 */}
          <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.basics.name}</h1>
            <p className="text-xl text-primary mb-4">{resumeData.basics.label}</p>
            
            <div className="text-gray-700 dark:text-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <p className="text-gray-700 dark:text-gray-300">{resumeData.basics.summary}</p>
              </div>
            )}
          </header>
          
          {/* 教育经历 */}
          {resumeData.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                教育经历
              </h2>
              
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.institution}</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {edu.studyType} {edu.area && `· ${edu.area}`}
                      </p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="text-gray-700 dark:text-gray-300 mt-1">GPA: {edu.gpa}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
          
          {/* 工作经验 */}
          {resumeData.work.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                工作经验
              </h2>
              
              {resumeData.work.map((work, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{work.company}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{work.position}</p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {work.startDate} - {work.endDate}
                    </div>
                  </div>
                  
                  {work.summary && (
                    <p className="text-gray-700 dark:text-gray-300 my-2">{work.summary}</p>
                  )}
                  
                  {work.highlights.length > 0 && (
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {work.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
          
          {/* 技能 */}
          {resumeData.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                技能
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}</span>
                    </div>
                    {skill.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {skill.keywords.map((keyword, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded"
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
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                项目经验
              </h2>
              
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  
                  {project.description && (
                    <p className="text-gray-700 dark:text-gray-300 my-2">{project.description}</p>
                  )}
                  
                  {project.highlights.length > 0 && (
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{highlight}</li>
                      ))}
                    </ul>
                  )}
                  
                  {project.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.keywords.map((keyword, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded"
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
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                语言能力
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {resumeData.languages.map((lang, index) => (
                  <div key={index} className="mb-2">
                    <span className="font-semibold">{lang.language}:</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">{lang.fluency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 