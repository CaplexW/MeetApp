import React from 'react';

export default function ProgressBar({ trackedValue }) {
  function renderProgress() {
    const percent = computeProgressPercent();
    let background;
    if (percent < 30) {
      background = 'red';
    } else if (percent > 30 && percent < 70) {
      background = 'orange';
    } else {
      background = 'var(--green)';
    }
    return {
      background,
      width: `${percent}%`,
      text: percent ? `${percent}%` : '',
    };
  }
  function computeProgressPercent() {
    let doneCount = 0;

    if (trackedValue.length === 0) {
      return 0;
    }

    for (let i = 0; i < trackedValue.length; i += 1) {
      if (trackedValue[i].done) {
        doneCount += 1;
      }
    }
    return Math.round(100 * (doneCount / trackedValue.length));
  }

  return (
    <div className={`progress bg-${renderProgress().background}`} style={{ width: renderProgress().width }}>
      {renderProgress().text}
      <div className="progress-bar">
        <div className="progress-value" id="progress" />
      </div>
    </div>
  );
}

// CSS
// .progress {
//   margin: 0 auto 1rem;
// }

// .progress-bar {
//   position: relative;
//   left: 0;
//   right: 0;
//   height: 30px;
//   border: var(--border);
//   border-radius: var(--radius);
//   background: #f5f5f4;
// }

// .progress-value {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   background: #000;
//   color: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: var(--radius);
//   transition: 0.5s width;
// }
