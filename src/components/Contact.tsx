import React, { useState } from 'react';
import { LuSend, LuMail, LuCheck, LuCopy } from 'react-icons/lu';
import { resumeData } from '../data/resumeData';
import './Contact.css';

const TOPICS = ['job or internship', 'project together', 'a question', 'just saying hi'];

const Contact: React.FC = () => {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [readyNote, setReadyNote] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Write a line or two first.');
      return;
    }
    setError('');

    const formattedNote = `Topic: ${topic}
From: ${name || '(no name)'} ${email ? `<${email}>` : ''}

${message}`;

    setReadyNote(formattedNote);
    setIsFlying(true);

    const subject = encodeURIComponent(`[${topic}] Note from ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hi Vaaheesan,\n\n${message}\n\n---\nTopic: ${topic}\nFrom: ${name || 'Anonymous'}\nEmail: ${email || 'Not provided'}`
    );
    const mailtoUrl = `mailto:${resumeData.personalInfo.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsFlying(false);
      window.location.href = mailtoUrl;
    }, 600);
  };

  const handleOpenEmailApp = () => {
    const subject = encodeURIComponent(`[${topic}] Note from ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hi Vaaheesan,\n\n${message}\n\n---\nTopic: ${topic}\nFrom: ${name || 'Anonymous'}\nEmail: ${email || 'Not provided'}`
    );
    window.location.href = `mailto:${resumeData.personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(readyNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="sh">
        <span className="note-label">contact</span>
        <h2>Write me a note</h2>
        <p>Drop a line about a role, collaborative project, or an engineering inquiry.</p>
      </div>

      <div className="contact-grid-layout">
        <div>
          <form className="letter sk" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <span className="lab">What's it about?</span>
              <div className="topics" role="group" aria-label="Topics">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="btn small"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="two-cols">
              <div className="field">
                <label htmlFor="fromName">Your name</label>
                <input
                  id="fromName"
                  type="text"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="fromMail">Your email</label>
                <input
                  id="fromMail"
                  type="email"
                  placeholder="ada@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                placeholder="Hi Vaaheesan, let's talk about..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {error && <p className="err" aria-live="polite">{error}</p>}

            <button className="btn primary" type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>fold it into a paper plane</span>
              <LuSend />
            </button>

            <svg className={`plane ${isFlying ? 'fly' : ''}`} viewBox="0 0 80 50" aria-hidden="true">
              <path d="M4 22 L76 4 L50 46 L38 30 Z" />
              <path d="M38 30 L76 4" />
            </svg>
          </form>

          {readyNote && (
            <div className="ready sk">
              <h3>Your note is folded and ready</h3>
              <p>
                Copy this formatted note and email it straight to{' '}
                <span className="email">{resumeData.personalInfo.email}</span>:
              </p>
              <textarea readOnly value={readyNote} aria-label="Formatted note" />
              <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn small primary" type="button" onClick={handleOpenEmailApp} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>open in email app</span>
                  <LuMail />
                </button>
                <button className="btn small" type="button" onClick={handleCopyNote} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {copiedNote ? (
                    <>
                      <LuCheck />
                      <span>copied!</span>
                    </>
                  ) : (
                    <>
                      <LuCopy />
                      <span>copy note</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="postcard sk">
            <h3>Or write straight to</h3>
            <p className="email">{resumeData.personalInfo.email}</p>
            <p className="phone">Phone: {resumeData.personalInfo.phone}</p>
            <p className="loc">Location: {resumeData.personalInfo.location}</p>
            <button className="btn small" type="button" onClick={handleCopyEmail} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {copiedEmail ? (
                <>
                  <LuCheck />
                  <span>address copied!</span>
                </>
              ) : (
                <>
                  <LuCopy />
                  <span>copy address</span>
                </>
              )}
            </button>
          </div>

          <ul className="elsewhere">
            <li>
              <a className="sk" href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
                <span>github.com/vacmar</span>
              </a>
            </li>
            <li>
              <a className="sk" href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span>
                <span>linkedin.com/in/vaaheesan-s</span>
              </a>
            </li>
            <li>
              <a className="sk" href={resumeData.personalInfo.hackerrank} target="_blank" rel="noopener noreferrer">
                <span>HackerRank</span>
                <span>hackerrank.com/profile/vaahee21</span>
              </a>
            </li>
            <li>
              <a className="sk" href={resumeData.personalInfo.leetcode} target="_blank" rel="noopener noreferrer">
                <span>LeetCode</span>
                <span>leetcode.com/u/VAAHEESAN</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
