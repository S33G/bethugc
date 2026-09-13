import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Instagram } from "@/components/instagram-icon";
import { ContactForm } from "@/components/contact-form";
import { email, instagram } from "@/lib/content";
export const metadata: Metadata={title:"Let’s create together",description:"Book Bethany for your next UGC project. Share your brand brief or email beth.ugcontent@gmail.com."};
export default function ContactPage(){return <section className="contact-page container section-pad"><div className="contact-copy"><span className="eyebrow">THE START OF SOMETHING GOOD</span><h1>Your next story<br/>starts with<br/><em>a hello.</em></h1><p>Got a brief? A product you love? The beginning of an idea? Tell me a little about it and let’s see what we can create together.</p><div className="contact-links"><a href={`mailto:${email}`}><Mail size={19}/><span>{email}</span><ArrowUpRight size={17}/></a><a href={instagram} target="_blank" rel="noreferrer"><Instagram size={19}/><span>@bethanyugc</span><ArrowUpRight size={17}/></a><p><MapPin size={19}/> Essex, UK · Creating for brands everywhere</p></div><span className="handwritten">can’t wait to hear your idea ♡</span></div><ContactForm/></section>}
