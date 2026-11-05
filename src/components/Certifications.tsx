import React, { useState } from 'react';
import { LuCalendar, LuCheck, LuExternalLink } from 'react-icons/lu';
import GlitchUnpredictable from './GlitchUnpredictable';
import './Certifications.css';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'core' | 'ai' | 'cloud';
  badgeColor: string;
  link?: string;
  rotation: number;
}

const CERTS_DATA: Certificate[] = [
  {
    id: 'nptel-cpp',
    title: 'Programming in Modern C++',
    issuer: 'NPTEL (IIT Kharagpur)',
    year: '2024',
    category: 'core',
    badgeColor: 'badge-yellow',
    link: '/Programming-in-Modern-Cpp.pdf',
    rotation: -1.5
  },
  {
    id: 'nptel-java',
    title: 'Programming in Java',
    issuer: 'NPTEL (IIT Kharagpur)',
    year: '2024',
    category: 'core',
    badgeColor: 'badge-blue',
    link: '/Programming-In-Java.pdf',
    rotation: 1.2
  },
  {
    id: 'nptel-dl',
    title: 'Deep Learning',
    issuer: 'NPTEL (IIT Madras)',
    year: '2025',
    category: 'ai',
    badgeColor: 'badge-pink',
    link: '/Deep-Learning-NPTEL.pdf',
    rotation: -0.8
  },
  {
    id: 'nptel-nlp',
    title: 'Natural Language Processing',
    issuer: 'NPTEL (IIT Kharagpur)',
    year: '2025',
    category: 'ai',
    badgeColor: 'badge-yellow',
    link: '/NLP-NPTEL-CERTIFICATION.pdf',
    rotation: 1.4
  },
  {
    id: 'aws-cloud-quest',
    title: 'AWS Cloud Quest: Cloud Practitioner',
    issuer: 'AWS Training & Certification',
    year: '2026',
    category: 'cloud',
    badgeColor: 'badge-yellow',
    link: '/AWS_Cloud_Practitioner.pdf',
    rotation: 1.1
  },
  {
    id: 'nptel-iot',
    title: 'Introduction to Internet of Things',
    issuer: 'NPTEL (IIT Kharagpur)',
    year: '2024',
    category: 'cloud',
    badgeColor: 'badge-blue',
    rotation: -1.2
  },
  {
    id: 'udemy-python',
    title: '100 Days of Code: Python Bootcamp',
    issuer: 'Udemy',
    year: '2023',
    category: 'core',
    badgeColor: 'badge-pink',
    link: '/100Day_Python_Udemy.pdf',
    rotation: 0.9
  },
  {
    id: 'hackerrank-python',
    title: '5-Star Python Gold Badge',
    issuer: 'HackerRank (5-Star Gold)',
    year: '2025',
    category: 'core',
    badgeColor: 'badge-yellow',
    link: 'https://www.hackerrank.com/profile/vaahee21',
    rotation: -1.2
  }
];

const Certifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'ai' | 'cloud'>('all');

  const filteredCerts = CERTS_DATA.filter(
    (c) => activeCategory === 'all' || c.category === activeCategory
  );

  return (
    <section id="certs" className="certs-section">
      <div className="chead">
        <div>
          <h2 className="sh">
            my <span className="hl">certificates</span>
          </h2>
          <div className="note-subtitle">collecting them like stickers & credentials</div>
        </div>

        <div className="cert-counter-box sk">
          <b className="cert-num">{CERTS_DATA.length}</b>
          <span className="cert-label">certifications<br />and counting</span>
        </div>
      </div>

      <div className="cert-filter-pills" role="group" aria-label="Certificate categories">
        {(['all', 'core', 'ai', 'cloud'] as const).map((cat) => (
          <button
            key={cat}
            className="btn small"
            type="button"
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'all' : cat === 'core' ? 'systems & c++' : cat === 'ai' ? 'ai & deep learning' : 'iot & cloud'}
          </button>
        ))}
      </div>

      <div className="certs-grid">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className={`cert-sticker-card sk ${cert.badgeColor} ${cert.link ? 'clickable' : ''}`}
            style={{ transform: `rotate(${cert.rotation}deg)` }}
            onClick={() => {
              if (cert.link) {
                window.open(cert.link, '_blank', 'noopener,noreferrer');
              }
            }}
            role={cert.link ? 'button' : undefined}
            tabIndex={cert.link ? 0 : undefined}
            title={cert.link ? 'Click to view certificate credential' : undefined}
          >
            <div className="cert-pin-dot" aria-hidden="true" />
            <span className="cert-category-tag">{cert.category.toUpperCase()}</span>
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <div className="cert-bottom-row">
              <span className="cert-year" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <LuCalendar style={{ fontSize: '0.85rem' }} /> {cert.year}
              </span>
              <span className="verified-stamp" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {cert.link ? (
                  <>
                    <LuExternalLink />
                    <span>CREDENTIAL</span>
                  </>
                ) : (
                  <>
                    <LuCheck />
                    <span>VERIFIED</span>
                  </>
                )}
              </span>
            </div>
          </div>
        ))}

        {/* Coming Soon Unpredictable Glitch Card */}
        <div className="cert-sticker-card cert-coming-soon-card sk">
          <GlitchUnpredictable
            badgeText="NEXT CREDENTIAL"
            arrowText="future is unpredictable"
          />
        </div>
      </div>
    </section>
  );
};

export default Certifications;
