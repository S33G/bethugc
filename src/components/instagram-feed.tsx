"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Instagram } from "./instagram-icon";
import { instagram, reels } from "@/lib/content";
import { VideoCard } from "./work-gallery";

export function InstagramFeed() {
  const [showFeed,setShowFeed]=useState(false);
  const [feedState,setFeedState]=useState<"loading"|"loaded"|"unavailable">("loading");
  useEffect(()=>{
    if(!showFeed)return;
    const timeout=window.setTimeout(()=>setFeedState(s=>s==="loading"?"unavailable":s),10000);
    return ()=>window.clearTimeout(timeout);
  },[showFeed]);
  return <section className="instagram-section section-pad"><div className="container">
    <div className="section-heading"><div><span className="eyebrow">THE EVERYDAY, UNFILTERED</span><h2>A little more <em>behind the scenes.</em></h2></div><a href={instagram} target="_blank" rel="noreferrer" className="text-link"><Instagram size={17}/> @bethanyugc <ArrowUpRight size={16}/></a></div>
    <div className="instagram-grid"><div className="instagram-note"><span className="handwritten">come say hello!</span><Instagram size={33} strokeWidth={1.2}/><h3>Mum life.<br/>Creator life.<br/><em>All the in-between.</em></h3><p>Family days, coffee breaks and the real life behind the content.</p><button className="text-link" aria-expanded={showFeed} onClick={()=>{setFeedState("loading");setShowFeed(!showFeed);}}>{showFeed?"Hide Instagram feed":"Load Instagram feed"} <ArrowUpRight size={16}/></button></div>{reels.map((reel,index)=><VideoCard key={reel.id} work={reel} index={index}/>)}</div>
    {showFeed&&<div className="embed-panel"><div className="embed-stage" data-state={feedState}>
      {feedState!=="loaded"&&<div className="embed-status" role="status"><Instagram size={32}/><h3>{feedState==="loading"?"A little window into my world…":"Let’s catch up on Instagram."}</h3><p>{feedState==="loading"?"Loading Beth’s Instagram feed.":"Instagram isn’t loading in this browser. You can still play my reels above, or see the full feed on Instagram."}</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Open @bethanyugc <ArrowUpRight size={16}/></a></div>}
      <iframe onLoad={()=>setFeedState("loaded")} onError={()=>setFeedState("unavailable")} src="https://www.instagram.com/bethanyugc/embed/" title="Bethany’s Instagram profile feed" loading="eager" allow="encrypted-media" referrerPolicy="strict-origin-when-cross-origin"/>
    </div><p>Instagram may ask you to log in. <a href={instagram} target="_blank" rel="noreferrer">See all posts on Instagram <ArrowUpRight size={14}/></a></p></div>}
  </div></section>;
}
