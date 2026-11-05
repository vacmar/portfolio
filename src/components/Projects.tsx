import React, { useState } from 'react';
import { LuLandmark, LuStar } from 'react-icons/lu';
import { resumeData, Project } from '../data/resumeData';
import GlitchUnpredictable from './GlitchUnpredictable';
import './Projects.css';

const FILTERS = [
  { id: 'all', label: 'all' },
  { id: 'fullstack', label: 'full-stack' },
  { id: 'backend', label: 'backend' },
  { id: 'ai', label: 'ai' }
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProjects = resumeData.projects.filter((p) => {
    if (filter === 'all') return true;
    return p.cat.includes(filter);
  });

  return (
    <section id="projects" className="projects-section">
      <div className="sh">
        <span className="note-label">projects</span>
        <h2>Things I've built</h2>
        <p>Tap or click any card to turn it over and explore system architecture and source links.</p>
      </div>

      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className="btn small"
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredProjects.map((p: Project, idx: number) => {
          const isFlipped = !!flippedCards[p.id];
          const backColorClass = p.isGovFunded
            ? 'back-gov'
            : idx % 3 === 0
            ? 'back-yellow'
            : idx % 3 === 1
            ? 'back-blue'
            : 'back-pink';

          return (
            <div
              key={p.id}
              className={`flip ${isFlipped ? 'flipped' : ''} ${p.isGovFunded ? 'flip-gov' : ''}`}
            >
              <div className="flip-in">
                {/* Front Face */}
                <div
                  className={`face front sk ${p.isGovFunded ? 'face-gov' : ''}`}
                  onClick={() => toggleFlip(p.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(p.id);
                    }
                  }}
                  role="button"
                  aria-label={`${p.name} - tap to flip`}
                >
                  {p.isGovFunded && (
                    <div className="gov-ribbon">
                      <span className="gov-ribbon-badge">
                        <span className="gov-icon" style={{ display: 'inline-flex', verticalAlign: '-2px', marginRight: '4px' }}><LuLandmark /></span> Govt Won & Funded • Under Development
                      </span>
                    </div>
                  )}
                  <span className="kind">{p.kind}</span>
                  <h3>{p.name}</h3>
                  <p>{p.shortDescription || p.description.slice(0, 110) + '...'}</p>
                  
                  <ul className="tags">
                    {p.technologies.slice(0, 5).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <div className="card-actions front-actions">
                    <span className="tap-hint">tap card to flip</span>
                    <button
                      className="btn small flip-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(p.id);
                      }}
                    >
                      turn over ↺
                    </button>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className={`face back sk ${backColorClass}`}
                  onClick={() => toggleFlip(p.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(p.id);
                    }
                  }}
                  role="button"
                  aria-label={`${p.name} details - tap to return`}
                >
                  {p.isGovFunded && (
                    <div className="gov-ribbon back-ribbon">
                      <span className="gov-ribbon-badge">
                        <span className="gov-icon" style={{ display: 'inline-flex', verticalAlign: '-2px', marginRight: '4px' }}><LuStar /></span> MSME 5.0 Govt Scheme • In Active Development
                      </span>
                    </div>
                  )}
                  <h3>{p.name}</h3>
                  <p className="long-desc">{p.description}</p>
                  
                  {p.features && p.features.length > 0 && (
                    <div className="features-list">
                      <strong>Highlights:</strong>
                      <ul>
                        {p.features.map((feat, fIdx) => (
                          <li key={fIdx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="card-actions back-actions" onClick={(e) => e.stopPropagation()}>
                    <div className="card-links">
                      {p.demo && (
                        <a className="btn small link-btn" href={p.demo} target="_blank" rel="noopener noreferrer">
                          {p.demo.includes('drive.google.com') ? 'demo & deck ↗' : 'live demo ↗'}
                        </a>
                      )}
                      {p.github ? (
                        <a className="btn small link-btn" href={p.github} target="_blank" rel="noopener noreferrer">
                          source code ↗
                        </a>
                      ) : (
                        <span className={`private-badge ${p.isGovFunded ? 'gov-badge' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {p.isGovFunded ? (
                            <>
                              <LuLandmark />
                              <span>govt grant / in dev</span>
                            </>
                          ) : (
                            'private codebase'
                          )}
                        </span>
                      )}
                    </div>
                    <button
                      className="btn small flip-btn"
                      type="button"
                      onClick={() => toggleFlip(p.id)}
                    >
                      turn back ↻
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Coming Soon Dashed Card with Unpredictable Glitch Animation */}
        <div className="project-coming-soon-card sk">
          <GlitchUnpredictable
            badgeText="NEXT SYSTEM"
            arrowText="who knows what's next?"
          />
        </div>

        {filteredProjects.length === 0 && (
          <p className="empty sk">Nothing filed under that tag yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
