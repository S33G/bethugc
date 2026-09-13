"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import Link from "next/link";
import { type Work, works } from "@/lib/content";

export function VideoCard({ work, index = 0 }: { work: Work; index?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const close = () => { player.current?.pause(); dialog.current?.close(); };
  useEffect(()=>()=>{ document.body.style.overflow = ""; },[]);
  return <article className="work-card">
    <button className="work-poster" onClick={()=>{ dialog.current?.showModal(); document.body.style.overflow="hidden"; void player.current?.play().catch(()=>{}); }} aria-label={`Play ${work.brand}: ${work.title}`}>
      <img src={work.poster} alt={`${work.brand} — ${work.format} by Bethany`} loading="lazy"/>
      <span className="video-tag">{work.format}</span><span className="play-button"><Play size={20} fill="currentColor"/></span><span className="poster-bottom">{work.brand}<ArrowUpRight size={20}/></span>
    </button>
    <div className="work-caption"><div><p className="eyebrow">{work.category}</p><h3>{work.title}</h3></div><span className="work-index">{String(index+1).padStart(2,"0")}</span></div>
    <dialog ref={dialog} className="video-dialog" aria-label={`${work.brand}: ${work.title}`} onClose={()=>{player.current?.pause();document.body.style.overflow="";}} onClick={e=>{if(e.target===e.currentTarget)close();}}>
      <button className="dialog-close" onClick={close} aria-label="Close video"><X/></button><div className="video-dialog-inner"><video ref={player} src={work.video} poster={work.poster} controls playsInline preload="none" onError={()=>setFailed(true)}/><div className="video-description"><span className="eyebrow">{work.brand} · {work.format}</span><h2>{work.title}</h2><p>{work.description}</p>{failed&&<p role="alert">This video couldn’t load. <a href={work.video} target="_blank" rel="noreferrer">Open the video directly</a>.</p>}<Link href="/contact" className="text-link" onClick={close}>Create something like this <ArrowUpRight size={17}/></Link></div></div>
    </dialog>
  </article>;
}
export function WorkGallery({ featured = false }: { featured?: boolean }) {
  const [filter,setFilter]=useState("All work");
  const list=featured?works.slice(0,4):works.filter(w=>filter==="All work"||w.category===filter);
  return <>{!featured&&<div className="filters" aria-label="Filter work">{["All work","Motherhood","Lifestyle","Beauty & wellness"].map(c=><button key={c} className={filter===c?"active":""} aria-pressed={filter===c} onClick={()=>setFilter(c)}>{c}</button>)}</div>}<div className={`work-grid ${featured?"featured-grid":""}`} aria-live="polite">{list.map((work,index)=><VideoCard key={work.id} work={work} index={index}/>)}</div></>;
}
