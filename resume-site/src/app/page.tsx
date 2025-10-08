import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import SkillMatrix from '@/components/SkillMatrix';
import { ResumeData } from '@/types/resume';
import resumeData from '@/data/resume.json';

export default function Home() {
  const data: ResumeData = resumeData;

  return (
    <div className="page min-h-screen bg-white max-w-6xl mx-auto print:max-w-none print:mx-0 print:shadow-none relative z-10">
      {/* Desktop Layout */}
      <div className="hidden lg:flex print:flex">
        <Sidebar 
          personalInfo={data.personalInfo}
          skills={data.skills}
          languages={data.languages}
          hobbies={data.hobbies}
        />
        <MainContent 
          personalInfo={data.personalInfo}
          profile={data.profile}
          experience={data.experience}
          additionalExperience={data.additionalExperience}
          education={data.education}
        />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden print:hidden">
        <div className="p-4">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name}</h1>
            <div className="text-lg text-gray-600 mt-2">{data.personalInfo.title}</div>
            <div className="border-b-2 border-gray-300 w-full mt-4"></div>
          </header>

          {/* Contact Info */}
          <section className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Contact</h2>
            <div className="space-y-1 text-sm text-gray-700">
              <div>{data.personalInfo.contact.email}</div>
              <div>{data.personalInfo.contact.phone}</div>
              <div>{data.personalInfo.contact.location}</div>
              {data.personalInfo.contact.nationality && (
                <div>Nationality: {data.personalInfo.contact.nationality}</div>
              )}
              {data.personalInfo.contact['residence visa'] && (
                <div>Residence: {data.personalInfo.contact['residence visa']}</div>
              )}
              <a href={data.personalInfo.contact.linkedin} className="text-blue-600">
                linkedin.com/in/markobradley
              </a>
              {data.personalInfo.contact.website && (
                <a href={data.personalInfo.contact.website} className="text-blue-600 block">
                  mb-hilo.github.io
                </a>
              )}
              {data.personalInfo.contact.consulting && (
                <a href={data.personalInfo.contact.consulting} className="text-blue-600 block">
                  hilo.ca (consulting)
                </a>
              )}
            </div>
          </section>

          {/* Profile */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Profile</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{data.profile}</p>
          </section>

          {/* Skills Matrix */}
          <section className="mb-6">
            <SkillMatrix skills={data.skills.detailedTechnical} />
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Experience</h2>
            {data.experience.map((job, index) => (
              <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <div className="text-sm text-gray-600">{job.company} • {job.period}</div>
                  {job.location && <div className="text-xs text-gray-500">{job.location}</div>}
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {job.achievements.slice(0, 2).map((achievement, i) => (
                    <li key={i}>• {achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language) => (
                <span key={language} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {language}
                </span>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Interests</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.hobbies.map((hobby) => (
                <span key={hobby} className="text-sm text-gray-700">
                  {hobby}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Education</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {data.education.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
