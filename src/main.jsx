// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { workshopSlides as slides } from './deck.jsx';

function hashIndex() {
  const id = decodeURIComponent(location.hash.slice(1));
  const index = slides.findIndex(slide => slide.id === id);
  return index < 0 ? 0 : index;
}

export function Slide({ slide, number, style }) {
  const isTitle = ['cover', 'section', 'subsection'].includes(slide.kind);
  const sources = slide.sources ?? [];
  return <article className={`slide ${slide.kind ?? 'content'}${isTitle ? ' title-slide' : ''}${slide.optional ? ' optional' : ''}`} style={style} aria-label={`Slide ${number}: ${slide.title}`}>
    <header><p className="section-label">{slide.sectionLabel ?? 'Codex CLI'}{slide.optional ? ' / Optional reference' : ''}</p>{!isTitle && <h1>{slide.title}</h1>}</header>
    <div className="slide-content">{isTitle ? <div className="title-block">
      <h1>{slide.displayTitle ?? slide.title}</h1>
      {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
      {slide.author && <p className="slide-author">{slide.author}</p>}
      {slide.credit && <p className="slide-credit">{slide.credit}</p>}
      {slide.license && <p className="slide-license">© {slide.license.year} {slide.author}. Teaching content: <a href={slide.license.href} rel="license noopener noreferrer" target="_blank">{slide.license.label}</a>, except where otherwise noted.</p>}
    </div> : slide.content}</div>
    <footer className="slide-footer"><div>{isTitle ? <a href={slide.backLink?.href ?? '#workshop-outline'}>{slide.backLink?.label ?? 'Workshop outline'}</a> : sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}</a>)}</div><span>{String(number).padStart(2, '0')}</span></footer>
  </article>;
}

function App() {
  const [index, setIndex] = useState(hashIndex);
  const [scale, setScale] = useState(1);
  const [panel, setPanel] = useState(null);
  const [fullscreenError, setFullscreenError] = useState('');
  const stage = useRef(null);
  const dialog = useRef(null);
  const previousFocus = useRef(null);
  const slide = slides[index];

  function go(next) {
    const value = Math.max(0, Math.min(slides.length - 1, next));
    location.hash = slides[value].id;
    setIndex(value);
  }

  function openPanel(next) {
    previousFocus.current = document.activeElement;
    setPanel(next);
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
      setFullscreenError('');
    } catch {
      setFullscreenError('Use your browser’s full-screen command.');
    }
  }

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440));
    observer.observe(stage.current);
    const onHash = () => setIndex(hashIndex());
    window.addEventListener('hashchange', onHash);
    return () => { observer.disconnect(); window.removeEventListener('hashchange', onHash); };
  }, []);

  useEffect(() => {
    document.title = `${slide.title} · Methods Camp 2026`;
  }, [slide]);

  useEffect(() => {
    if (!panel) return;
    dialog.current?.querySelector('button')?.focus();
    return () => previousFocus.current?.focus();
  }, [panel]);

  useEffect(() => {
    function keyboard(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (panel) {
        if (event.key === 'Escape') { event.preventDefault(); setPanel(null); }
        if (event.key === 'Tab') {
          const controls = [...dialog.current.querySelectorAll('a[href],button:not([disabled])')];
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
        return;
      }
      if (event.target.closest('button,a') && (event.key === ' ' || event.key === 'Enter')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); go(index + 1); }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); go(index - 1); }
      if (event.key === 'Home') { event.preventDefault(); go(0); }
      if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
      if (event.key.toLowerCase() === 'o') openPanel('outline');
      if (event.key.toLowerCase() === 'f') fullscreen();
    }
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [index, panel]);

  return <>
    <main className="presentation">
      <div className="deck-meta"><span>Methods Camp 2026</span><span>AI agents for social science</span></div>
      <div className="slide-stage" ref={stage}><Slide slide={slide} number={index + 1} style={{ transform: `scale(${scale})` }} /></div>
      <nav className="toolbar" aria-label="Presentation controls">
        <div className="navigation"><button aria-label="Previous slide" disabled={index === 0} onClick={() => go(index - 1)}>Previous</button><span aria-live="polite">{index + 1} / {slides.length}</span><button aria-label="Next slide" disabled={index === slides.length - 1} onClick={() => go(index + 1)}>Next</button></div>
        <div className="tools"><button onClick={() => openPanel('outline')}>Outline</button><button onClick={fullscreen}>Full screen</button><button onClick={() => window.print()}>Print</button><a href="https://github.com/m-laprise/ai-agents-slides#licence" target="_blank" rel="noreferrer">Source &amp; licences</a></div>
      </nav>
      <p className="keyboard-hint">Arrow keys to navigate · O outline · F full screen</p>
      {fullscreenError && <p role="status">{fullscreenError}</p>}
    </main>
    {panel && <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) setPanel(null); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="panel-title" ref={dialog}>
        <div className="modal-heading"><h2 id="panel-title">Deck outline</h2><button onClick={() => setPanel(null)} aria-label="Close panel">Close</button></div>
        <ol className="outline">{slides.map((item, i) => <li className={item.kind === 'section' ? 'outline-section' : item.kind === 'subsection' ? 'outline-subsection' : undefined} key={item.id}><button aria-current={index === i ? 'step' : undefined} onClick={() => { go(i); setPanel(null); }}><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{item.title}</strong><small>{item.summary}</small></div></button></li>)}</ol>
      </section>
    </div>}
    <div className="print-deck">{slides.map((item, i) => <Slide key={item.id} slide={item} number={i + 1} />)}</div>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
