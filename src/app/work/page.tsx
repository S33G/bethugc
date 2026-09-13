import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
import { CTA } from "@/components/site";
import { brands } from "@/lib/content";
export const metadata: Metadata={title:"The work",description:"Explore Bethany’s UGC portfolio: real video examples for ELEMIS, HiPP Organic, Milk & More, The Baby Show and more."};
export default function WorkPage(){return <><section className="page-intro container"><span className="eyebrow">THE PORTFOLIO</span><h1>Small moments.<br/><em>Stories worth sharing.</em></h1><p>A collection of real work, from product discoveries and everyday routines to family days out. Press play and get a feel for my world.</p></section><section className="container gallery-section" id="elemis"><WorkGallery/></section><section className="all-brands container"><span className="eyebrow">IN GOOD COMPANY</span><h2>A few familiar <em>names.</em></h2><p>Previous clients featured in my portfolio.</p><div>{brands.map(b=><span key={b}>{b}</span>)}</div></section><CTA/></>}
