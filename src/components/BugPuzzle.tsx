import React, { useState } from 'react';
import { LuCheck, LuX, LuTrophy, LuZap, LuWrench, LuPartyPopper, LuSearch, LuMail, LuTarget } from 'react-icons/lu';
import { resumeData, CodePuzzle } from '../data/resumeData';
import './BugPuzzle.css';

interface PuzzleAttempt {
  selectedLine: number;
  isCorrect: boolean;
}

const BugPuzzle: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [attemptsMap, setAttemptsMap] = useState<Record<number, PuzzleAttempt>>({});
  const [feedback, setFeedback] = useState('');
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const currentPuzzle: CodePuzzle = resumeData.puzzles[idx];
  const userAttempt = attemptsMap[idx];
  const isQuestionAnswered = !!userAttempt;
  const isCurrentCorrect = userAttempt?.isCorrect ?? false;
  const totalPuzzles = resumeData.puzzles.length;
  
  // Count how many questions are answered and how many are correct
  const answeredCount = Object.keys(attemptsMap).length;
  const correctCount = Object.values(attemptsMap).filter((a) => a.isCorrect).length;

  const handleLineClick = (lineIndex: number) => {
    // If user has already chosen an answer for this question, locked - cannot modify
    if (isQuestionAnswered) return;

    const isCorrect = lineIndex === currentPuzzle.bug;
    const newAttempt: PuzzleAttempt = {
      selectedLine: lineIndex,
      isCorrect
    };

    const updatedMap = {
      ...attemptsMap,
      [idx]: newAttempt
    };

    setAttemptsMap(updatedMap);

    if (isCorrect) {
      setFeedback(`✓ Correct! ${currentPuzzle.why}`);
    } else {
      setFeedback(`✗ Incorrect! Line ${lineIndex + 1} is not the root bug. ${currentPuzzle.why}`);
    }

    // When all questions have been answered, trigger completion report
    if (Object.keys(updatedMap).length === totalPuzzles) {
      setTimeout(() => {
        setShowCelebrationModal(true);
      }, 700);
    }
  };

  const handleHint = () => {
    if (!isQuestionAnswered) {
      setFeedback(`Hint: ${currentPuzzle.hint}`);
    }
  };

  const handleNext = () => {
    const nextIdx = (idx + 1) % totalPuzzles;
    setIdx(nextIdx);
    const nextAttempt = attemptsMap[nextIdx];
    if (nextAttempt) {
      if (nextAttempt.isCorrect) {
        setFeedback(`✓ Answered Correctly: ${resumeData.puzzles[nextIdx].why}`);
      } else {
        setFeedback(`✗ Answered Incorrectly: ${resumeData.puzzles[nextIdx].why}`);
      }
    } else {
      setFeedback('');
    }
  };

  const handleJumpTo = (pIdx: number) => {
    setIdx(pIdx);
    const existing = attemptsMap[pIdx];
    if (existing) {
      if (existing.isCorrect) {
        setFeedback(`✓ Answered Correctly: ${resumeData.puzzles[pIdx].why}`);
      } else {
        setFeedback(`✗ Answered Incorrectly: ${resumeData.puzzles[pIdx].why}`);
      }
    } else {
      setFeedback('');
    }
  };

  // Performance ranking based on final score
  const calculateResultRanking = () => {
    const percentage = Math.round((correctCount / totalPuzzles) * 100);
    if (correctCount === totalPuzzles) {
      return {
        icon: <LuTrophy style={{ color: '#eab308' }} />,
        badgeText: '100% Perfect Score · Principal Debugger',
        title: 'Flawless Zero-Day Debugger!',
        message: `Incredible! You answered all ${totalPuzzles} out of ${totalPuzzles} debugging questions correctly with zero wrong choices. You spot edge cases before the compiler does!`,
        quote: '"If debugging is the process of removing bugs, programming must be the process of putting them in." — Edsger Dijkstra'
      };
    } else if (correctCount >= 4) {
      return {
        icon: <LuZap style={{ color: 'var(--accent)' }} />,
        badgeText: `Score: ${correctCount}/${totalPuzzles} · Senior Systems Sleuth`,
        title: 'Sharp Engineering Intuition!',
        message: `Solid performance! You scored ${correctCount}/${totalPuzzles} (${percentage}%). You demonstrated strong instincts across concurrency, SQL aggregates, and caching traps!`,
        quote: '"Experience is the name everyone gives to their mistakes." — Oscar Wilde'
      };
    } else {
      return {
        icon: <LuWrench style={{ color: 'var(--muted)' }} />,
        badgeText: `Score: ${correctCount}/${totalPuzzles} · Tenacious Bug Hunter`,
        title: 'Valuable Learning Run!',
        message: `You completed all ${totalPuzzles} questions! Software engineering is all about testing assumptions, understanding failures, and building resilient backends that hold up under real use.`,
        quote: '"It\'s not a bug, it\'s an undocumented feature." — Tech Lore'
      };
    }
  };

  const ranking = calculateResultRanking();

  return (
    <section id="puzzle" className="puzzle-section">
      <div className="sh">
        <span className="note-label">puzzle</span>
        <h2>Spot the bug</h2>
        <p>Each code snippet below has exactly one broken line. Choose carefully — once you pick, the answer is locked!</p>
      </div>

      <div className="puz sk">
        {/* Navigation & Progress Tabs */}
        <div className="puz-header-row">
          <div className="puz-tabs" role="tablist" aria-label="Puzzle selection">
            {resumeData.puzzles.map((_, pIdx) => {
              const attempt = attemptsMap[pIdx];
              let statusClass = '';
              let badgeIcon: React.ReactNode = null;
              if (attempt) {
                if (attempt.isCorrect) {
                  statusClass = 'tab-correct';
                  badgeIcon = <LuCheck style={{ verticalAlign: '-1px' }} />;
                } else {
                  statusClass = 'tab-wrong';
                  badgeIcon = <LuX style={{ verticalAlign: '-1px' }} />;
                }
              }

              return (
                <button
                  key={pIdx}
                  type="button"
                  className={`puz-tab ${idx === pIdx ? 'active' : ''} ${statusClass}`}
                  onClick={() => handleJumpTo(pIdx)}
                  title={`Puzzle #${pIdx + 1} (${attempt ? (attempt.isCorrect ? 'Correct' : 'Wrong') : 'Unanswered'})`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                >
                  <span>#{pIdx + 1}</span>
                  {badgeIcon}
                </button>
              );
            })}
          </div>

          <div className="puz-counter-badge">
            <span className="puz-counter-icon" style={{ display: 'inline-flex', verticalAlign: '-1px' }}><LuTarget /></span>
            <span className="puz-counter-text">
              Score: <strong>{correctCount}</strong> / {totalPuzzles} correct
            </span>
            <span className="puz-attempts-text">({answeredCount}/{totalPuzzles} answered)</span>
          </div>
        </div>

        {/* Question Heading - marked pastel green when answered correctly */}
        <div className={`q ${isCurrentCorrect ? 'q-correct' : isQuestionAnswered ? 'q-wrong' : ''}`}>
          {isCurrentCorrect && (
            <span className="q-badge-correct" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <LuCheck />
              <span>Solved</span>
            </span>
          )}
          {isQuestionAnswered && !isCurrentCorrect && (
            <span className="q-badge-wrong" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <LuX />
              <span>Locked (Incorrect)</span>
            </span>
          )}
          {currentPuzzle.q}
        </div>

        <div className="code">
          {currentPuzzle.lines.map((line, lIdx) => {
            const isUserChosen = userAttempt?.selectedLine === lIdx;
            const isTheBugLine = currentPuzzle.bug === lIdx;

            let lineClass = '';
            if (isQuestionAnswered) {
              if (isUserChosen) {
                lineClass = userAttempt.isCorrect ? 'ln-pastel-green' : 'ln-pastel-red';
              } else if (!userAttempt.isCorrect && isTheBugLine) {
                // Also subtly show where the bug actually was in pastel green after locked wrong
                lineClass = 'ln-revealed-correct';
              }
            }

            return (
              <button
                key={lIdx}
                className={`ln ${lineClass} ${isQuestionAnswered ? 'locked' : ''}`}
                type="button"
                disabled={isQuestionAnswered}
                onClick={() => handleLineClick(lIdx)}
              >
                <i>{lIdx + 1}</i>
                <span>{line}</span>
              </button>
            );
          })}
        </div>

        <p className={`feedback ${isCurrentCorrect ? 'fb-correct' : isQuestionAnswered ? 'fb-wrong' : ''}`} aria-live="polite">
          {feedback}
        </p>

        <div className="pbar">
          <button className="btn small" type="button" onClick={handleHint} disabled={isQuestionAnswered}>
            hint
          </button>
          <button className="btn small primary" type="button" onClick={handleNext}>
            {idx === totalPuzzles - 1 ? 'loop to first ↺' : 'next puzzle →'}
          </button>
          {answeredCount === totalPuzzles && (
            <button
              className="btn small"
              type="button"
              style={{ background: 'var(--hl)', borderColor: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={() => setShowCelebrationModal(true)}
            >
              <LuPartyPopper />
              <span>view final result & mark</span>
            </button>
          )}
          <span className="sub">
            {answeredCount} of {totalPuzzles} answered
          </span>
        </div>
      </div>

      {/* Completion Celebration Modal based on Score & Accuracy */}
      {showCelebrationModal && (
        <div className="puz-modal-overlay" onClick={() => setShowCelebrationModal(false)}>
          <div className="puz-modal-card sk" onClick={(e) => e.stopPropagation()}>
            <i className="washi-tape-strip" aria-hidden="true" />
            <button
              type="button"
              className="puz-modal-close"
              onClick={() => setShowCelebrationModal(false)}
              aria-label="Close report"
            >
              <LuX />
            </button>

            <span className="puz-rank-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {ranking.icon}
              <span>{ranking.badgeText}</span>
            </span>
            <h3 className="puz-rank-title">{ranking.title}</h3>
            
            <div className="puz-score-stat-box">
              <div className="score-stat">
                <span className="score-num">{correctCount} / {totalPuzzles}</span>
                <span className="score-label">Final Score</span>
              </div>
              <div className="score-stat">
                <span className="score-num">{Math.round((correctCount / totalPuzzles) * 100)}%</span>
                <span className="score-label">Accuracy Mark</span>
              </div>
            </div>

            <p className="puz-rank-message">{ranking.message}</p>
            <p className="puz-rank-quote">{ranking.quote}</p>

            <div className="puz-modal-actions">
              <button
                type="button"
                className="btn small primary"
                onClick={() => setShowCelebrationModal(false)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Review Puzzles</span>
                <LuSearch />
              </button>
              <a
                href="#contact"
                className="btn small"
                onClick={() => setShowCelebrationModal(false)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Discuss Architecture with Vaaheesan</span>
                <LuMail />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BugPuzzle;
