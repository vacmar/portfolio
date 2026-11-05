import React from 'react';
import { LuStar } from 'react-icons/lu';
import { resumeData, Experience as ExperienceType } from '../data/resumeData';
import GlitchUnpredictable from './GlitchUnpredictable';
import './Experience.css';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="sh">
        <span className="note-label">experiences</span>
        <h2>Where I've built & broken things</h2>
        <p>Production engineering across fintech payment gateways, high-concurrency microservices, and multi-tenant architectures.</p>
      </div>

      <ul className="jobs">
        {resumeData.experience.map((j: ExperienceType, idx: number) => {
          const pastelColors = ['pastel-blue', 'pastel-pink', 'pastel-yellow', 'pastel-mint'];
          const colorClass = pastelColors[idx % pastelColors.length];

          return (
            <li key={j.id} className={`job sk ${colorClass}`}>
              <i className="washi-tape-strip" aria-hidden="true" />
              
              <div className="job-badge-row">
                <span className="note-label">internship</span>
                <span className="job-date">{j.startDate} – {j.endDate}</span>
              </div>
              
              <h3>{j.company}</h3>
              <p className="job-role">{j.position} • {j.location}</p>
              
              {j.note && (
                <p className="job-note" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <LuStar style={{ fontSize: '0.85rem', color: 'var(--accent)' }} />
                  <span>{j.note}</span>
                </p>
              )}

              <p className="job-desc">{j.description}</p>

              {j.achievements && j.achievements.length > 0 && (
                <ul className="job-achievements">
                  {j.achievements.map((ach, aIdx) => (
                    <li key={aIdx}>{ach}</li>
                  ))}
                </ul>
              )}

              <div className="job-tech">
                {j.technologies.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </li>
          );
        })}

        {/* Coming Soon Dashed Experience Box with Scrambled Future Text */}
        <li className="job exp-coming-soon-card sk">
          <i className="washi-tape-strip" aria-hidden="true" />
          <GlitchUnpredictable
            badgeText="NEXT CHAPTER"
            arrowText="something big is brewing..."
          />
        </li>
      </ul>

      {/* Studying / Education Notebook Card */}
      <div className="edu sk">
        <i className="washi-tape-strip" aria-hidden="true" />
        <span className="note-label">school days</span>
        <h3>{resumeData.education[0].degree}</h3>
        <p>
          <strong>{resumeData.education[0].school}</strong> ({resumeData.education[0].graduationDate})
        </p>
        <p className="edu-gpa">Academic Record: <strong>{resumeData.education[0].gpa}</strong></p>
        <p className="edu-scores">{resumeData.education[0].scores}</p>
        
        <div className="edu-courses">
          <span className="course-label">Key Highlights & Certifications:</span>
          <div className="courses-list">
            {resumeData.education[0].relevantCourses.map((c) => (
              <span key={c} className="course-chip">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
