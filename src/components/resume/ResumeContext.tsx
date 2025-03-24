"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ResumeData, defaultResumeData } from "@/lib/types/resume";

interface ResumeContextProps {
  resumeData: ResumeData;
  updateResumeData: (newData: Partial<ResumeData>) => void;
  updateBasics: (data: Partial<ResumeData["basics"]>) => void;
  addEducation: (education: ResumeData["education"][0]) => void;
  updateEducation: (index: number, education: Partial<ResumeData["education"][0]>) => void;
  removeEducation: (index: number) => void;
  addWorkExperience: (work: ResumeData["work"][0]) => void;
  updateWorkExperience: (index: number, work: Partial<ResumeData["work"][0]>) => void;
  removeWorkExperience: (index: number) => void;
  addSkill: (skill: ResumeData["skills"][0]) => void;
  updateSkill: (index: number, skill: Partial<ResumeData["skills"][0]>) => void;
  removeSkill: (index: number) => void;
  addProject: (project: ResumeData["projects"][0]) => void;
  updateProject: (index: number, project: Partial<ResumeData["projects"][0]>) => void;
  removeProject: (index: number) => void;
  addLanguage: (language: ResumeData["languages"][0]) => void;
  updateLanguage: (index: number, language: Partial<ResumeData["languages"][0]>) => void;
  removeLanguage: (index: number) => void;
  resetResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }));
  };

  const updateBasics = (data: Partial<ResumeData["basics"]>) => {
    setResumeData((prev) => ({
      ...prev,
      basics: { ...prev.basics, ...data },
    }));
  };

  // 教育经历
  const addEducation = (education: ResumeData["education"][0]) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  const updateEducation = (
    index: number,
    education: Partial<ResumeData["education"][0]>
  ) => {
    setResumeData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], ...education };
      return { ...prev, education: newEducation };
    });
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => {
      const newEducation = [...prev.education];
      newEducation.splice(index, 1);
      return { ...prev, education: newEducation };
    });
  };

  // 工作经历
  const addWorkExperience = (work: ResumeData["work"][0]) => {
    setResumeData((prev) => ({
      ...prev,
      work: [...prev.work, work],
    }));
  };

  const updateWorkExperience = (
    index: number,
    work: Partial<ResumeData["work"][0]>
  ) => {
    setResumeData((prev) => {
      const newWork = [...prev.work];
      newWork[index] = { ...newWork[index], ...work };
      return { ...prev, work: newWork };
    });
  };

  const removeWorkExperience = (index: number) => {
    setResumeData((prev) => {
      const newWork = [...prev.work];
      newWork.splice(index, 1);
      return { ...prev, work: newWork };
    });
  };

  // 技能
  const addSkill = (skill: ResumeData["skills"][0]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const updateSkill = (
    index: number,
    skill: Partial<ResumeData["skills"][0]>
  ) => {
    setResumeData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], ...skill };
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkill = (index: number) => {
    setResumeData((prev) => {
      const newSkills = [...prev.skills];
      newSkills.splice(index, 1);
      return { ...prev, skills: newSkills };
    });
  };

  // 项目经历
  const addProject = (project: ResumeData["projects"][0]) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (
    index: number,
    project: Partial<ResumeData["projects"][0]>
  ) => {
    setResumeData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], ...project };
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index: number) => {
    setResumeData((prev) => {
      const newProjects = [...prev.projects];
      newProjects.splice(index, 1);
      return { ...prev, projects: newProjects };
    });
  };

  // 语言
  const addLanguage = (language: ResumeData["languages"][0]) => {
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, language],
    }));
  };

  const updateLanguage = (
    index: number,
    language: Partial<ResumeData["languages"][0]>
  ) => {
    setResumeData((prev) => {
      const newLanguages = [...prev.languages];
      newLanguages[index] = { ...newLanguages[index], ...language };
      return { ...prev, languages: newLanguages };
    });
  };

  const removeLanguage = (index: number) => {
    setResumeData((prev) => {
      const newLanguages = [...prev.languages];
      newLanguages.splice(index, 1);
      return { ...prev, languages: newLanguages };
    });
  };

  // 重置数据
  const resetResumeData = () => {
    setResumeData(defaultResumeData);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        updateBasics,
        addEducation,
        updateEducation,
        removeEducation,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addLanguage,
        updateLanguage,
        removeLanguage,
        resetResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}; 