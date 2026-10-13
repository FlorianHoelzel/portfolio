import { ArrowDownRight, ArrowUpRight, House, Lightbulb, Radio, TrainFront, Trophy, Wifi } from 'lucide-react';
import type { ProjectVisual as VisualType } from '../types/project';

// Lightweight, original visual concepts. They are illustrations, not product screenshots.
export function ProjectVisual({ type }: { type: VisualType }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      {type === 'home' && <div className="mock-window home-window">
        <div className="mock-top"><span className="mock-brand"><House size={13} /> MONOLITH</span><span className="mock-status"><i /> Connected</span></div>
        <div className="home-greeting">Your home.<br /><strong>In harmony.</strong></div>
        <div className="home-devices"><div><Lightbulb size={20} /><span>Living room</span><strong>Lights on</strong><i className="device-toggle" /></div><div><Wifi size={20} /><span>Home network</span><strong>Connected</strong><span className="tiny-bars">▂▄▆█</span></div></div>
        <div className="home-bottom"><span><Radio size={11} /> Everything in one place</span><ArrowUpRight size={13} /></div>
      </div>}
      {type === 'transit' && <><div className="map-grid" /><svg className="transit-route" viewBox="0 0 500 300"><path d="M-20 245L130 245Q155 245 155 220V165Q155 145 180 145H300Q330 145 330 115V70Q330 45 355 45H520" /><circle cx="155" cy="208" r="6" /><circle cx="240" cy="145" r="6" /><circle cx="330" cy="91" r="6" /></svg><div className="transit-badge"><TrainFront size={18} /><span>TransitRadar</span><i /></div><div className="departure-card"><span className="eyebrow">ON THE MOVE</span><strong>Your city, in real time.</strong><div><span className="transit-line">U</span><span>Live departures</span><span className="departure-live"><i /> Tracking</span></div></div><span className="map-pin pin-one"><TrainFront size={14} /></span></>}
      {type === 'leaderboard' && <div className="mock-window leaderboard-window"><div className="mock-top"><span className="mock-brand"><Trophy size={14} /> YOSHI LEADERBOARDS</span><span className="mock-dots">•••</span></div><div className="leader-title">Every second counts<span>.</span></div><div className="mock-tabs"><span>Full game</span><span>Individual levels</span></div>{['01', '02', '03'].map((rank, i) => <div className="leader-row" key={rank}><span className="rank">{rank}</span><div className={`runner-avatar avatar-${i}`} /><div className="runner-lines"><i /><i /></div><span className="time-bars">{i === 0 ? <Trophy size={16} /> : <span>—:—</span>}</span></div>)}</div>}
      {type === 'records' && <div className="records-window"><div className="record-brand">sumof<span>.best</span><ArrowUpRight size={15} /></div><span className="eyebrow">THE PURSUIT OF BETTER</span><strong>A little faster.<br />Every time.</strong><svg className="record-chart" viewBox="0 0 400 100"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#dab7ff" stopOpacity=".2" /><stop offset="100%" stopColor="#dab7ff" stopOpacity="0" /></linearGradient></defs><path d="M0 85L40 80L70 85L105 52L140 60L180 35L210 40L240 22L280 29L320 10L355 15L390 3V100H0Z" fill="url(#chart-fill)" /><path d="M0 85L40 80L70 85L105 52L140 60L180 35L210 40L240 22L280 29L320 10L355 15L390 3" fill="none" stroke="#dab7ff" strokeWidth="2.5" /><circle cx="390" cy="3" r="4" fill="#dab7ff" /></svg><div className="record-bottom"><span>Personal best history</span><ArrowDownRight size={15} /></div></div>}
      <span className="visual-label">INTERFACE CONCEPT</span>
    </div>
  );
}
