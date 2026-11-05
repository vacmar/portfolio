import React from 'react';
import { LuZap, LuPlane } from 'react-icons/lu';
import { resumeData } from '../data/resumeData';
import './Stack.css';

const Stack: React.FC = () => {
  return (
    <section id="stack" className="stack-section">
      <div className="sh">
        <span className="note-label">toolbox</span>
        <h2>What I build with</h2>
        <p>Production tools, databases, and frameworks I use to engineer robust backend systems and interfaces.</p>
      </div>

      <div className="stack-grid">
        {resumeData.stackGroups.map((group, gIdx) => (
          <div key={group.title} className="group sk">
            <h3>{group.title}</h3>
            <ul className="chips">
              {group.items.map((item, iIdx) => {
                const rotClass = (gIdx + iIdx) % 3 === 0 ? 'rot-1' : (gIdx + iIdx) % 3 === 1 ? 'rot-2' : 'rot-3';
                return (
                  <li key={item} className={`chip ${rotClass}`}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Floating Personal Fun Fact Sticky */}
      <div className="stack-fun-fact sk">
        <i className="washi-tape-strip" aria-hidden="true" />
        <span className="fact-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <LuZap /> CREATOR MENTALITY
        </span>
        <p className="fact-text">
          "Love to brainstorm and create solutions — whether it’s designing zero-latency cache invalidation or architecting multi-agent LangGraph guardrails from scratch."
        </p>
        <span className="fact-sub" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <LuPlane /> Loves to travel, explore new engineering hubs & test ideas in production.
        </span>
      </div>
    </section>
  );
};

export default Stack;
