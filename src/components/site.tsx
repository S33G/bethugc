"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Instagram } from "./instagram-icon";
import { email, instagram } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="nav-wrap">
    <Link href="/" className="logo-link" aria-label="Bethany UGC home"><img src="/logo.svg" alt="bethany — UGC & creative" width="165" height="50" /></Link>
    <nav className={open ? "navigation is-open" : "navigation"} aria-label="Main navigation">
      {[["/work", "The work"], ["/about", "Meet Beth"], ["/services", "Work with me"]].map(([href,label])=><Link key={href} href={href} aria-current={pathname===href ? "page" : undefined} onClick={()=>setOpen(false)}>{label}</Link>)}
      <Link href="/contact" className="button button-small" onClick={()=>setOpen(false)}>Let’s chat <ArrowUpRight size={16}/></Link>
    </nav>
    <button className="menu-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </div></header>;
}
export function CTA() {
  return <section className="cta-band"><div className="container cta-inner"><div><span className="eyebrow">YOUR BRAND. MY NEXT CREATIVE CHAPTER.</span><h2>Let’s create a little <em>magic.</em></h2><p>Something natural. Something relatable. Something that feels like your brand.</p></div><Link href="/contact" className="button button-light">Tell me what you’re thinking <ArrowUpRight size={18}/></Link></div></section>;
}
export function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><Link href="/" aria-label="Bethany UGC home"><img src="/logo.svg" width="165" height="50" alt="bethany UGC & creative"/></Link><p>Real life. Thoughtful content.<br/>A little bit of Beth.</p><a href={`mailto:${email}`}>{email} <ArrowUpRight size={15}/></a><a href={instagram} target="_blank" rel="noreferrer" aria-label="Bethany on Instagram"><Instagram size={22}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bethany UGC</span><span>Essex, UK · Creating for brands everywhere</span><Link href="/privacy">Privacy</Link></div></footer>;
}
