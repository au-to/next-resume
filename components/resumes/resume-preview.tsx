'use client'

import { ResumeData } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Calendar,
  Building
} from 'lucide-react'

interface ResumePreviewProps {
  resume: ResumeData
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 space-y-6 min-h-[297mm]">
      {/* 个人信息部分 */}
      <div className="text-center space-y-4">
        {resume.personalInfo?.name && (
          <h1 className="text-3xl font-bold text-gray-900">
            {resume.personalInfo.name}
          </h1>
        )}
        
        {/* 联系信息 */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resume.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* 社交链接 */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">
          {resume.personalInfo?.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{resume.personalInfo.website}</span>
            </div>
          )}
          {resume.personalInfo?.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{resume.personalInfo.github}</span>
            </div>
          )}
          {resume.personalInfo?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{resume.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* 个人简介 */}
      {resume.summary && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-2">
            个人简介
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resume.summary}
          </p>
        </div>
      )}

      {/* 工作经历 */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-2">
            工作经历
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 教育背景 */}
      {resume.education && resume.education.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-2">
            教育背景
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {edu.school}
                  </h3>
                  <p className="text-gray-600">
                    {edu.degree} • {edu.field}
                  </p>
                  {edu.location && (
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  )}
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  )}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 技能特长 */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-2">
            技能特长
          </h2>
          <div className="space-y-4">
            {resume.skills.map((skillGroup, index) => (
              <div key={skillGroup.id || index}>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {skillGroup.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700">
                      {skill.name} • {skill.level}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 项目经验 */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-2">
            项目经验
          </h2>
          <div className="space-y-6">
            {resume.projects.map((project, index) => (
              <div key={project.id || index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {project.name}
                    </h3>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {project.startDate} - {project.endDate || '持续中'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 