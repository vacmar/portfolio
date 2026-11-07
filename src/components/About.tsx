import React from 'react';
import { LuFileText } from 'react-icons/lu';
import { resumeData } from '../data/resumeData';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="sh">
        <span className="note-label">about</span>
        <h2>I like things that <span className="hl">hold up</span> under real use.</h2>
        <p>A builder's perspective on backend performance, reliability, and full-stack software.</p>
      </div>

      <div className="about-layout">
        <div className="about-bio">
          <p>
            I'm a Computer Science Engineering student at Velammal Engineering College with a strong academic record (CGPA: 8.35) and a habit of learning by building. Most of what I know about shipping software came from making apps with real sign-in, several user roles and relational data.
          </p>
          <p>
            I've interned in backend and web development across four companies: <strong>Hexaware Technologies</strong>, <strong>Infotak Solutions</strong>, <strong>J7 Technology Solutions</strong>, and <strong>GameChanger4u</strong>. At Infotak Solutions I picked up a database optimization on my own, which is my favourite kind of work: find the slow part, understand why, fix it properly.
          </p>
          <p>
            Lately that backend habit meets AI. My recent projects use multi-agent pipelines (LangGraph, FastAPI, pgvector, Redis) with deterministic guards around the model, so its actions stay inside clear limits.
          </p>
          
          <div className="bio-actions">
            <a 
              className="btn primary small" 
              href="/Vaaheesan-Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              download="Vaaheesan_Resume.pdf"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <LuFileText />
              <span>Download Resume</span>
            </a>
            <a className="btn small" href="#journey">
              Follow Blob's Journey ↓
            </a>
          </div>
        </div>

        <div className="pins">
          <div className="pin sk">
            <h3>funded</h3>
            <p>Selected for the MSME 5.0 Government Funding Scheme with MindSync+ (2026).</p>
          </div>
          <div className="pin sk">
            <h3>competitions</h3>
            <p>1st Place in QR Debugging (2026) & 2nd Place in App Development (2025).</p>
          </div>
          <div className="pin sk">
            <h3>brainstorming & crafting</h3>
            <p>Love to brainstorm architectures and engineer practical solutions out of messy problem statements.</p>
          </div>
          <div className="pin sk">
            <h3>off the keyboard & travel</h3>
            <p>Loves to travel to new cities, play badminton, and read deep tech blogs on systems architecture.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
