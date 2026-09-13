import { email } from "@/lib/content";
export const metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return <article className="container privacy-page section-pad">
    <span className="eyebrow">THE SMALL PRINT</span><h1>Your <em>privacy.</em></h1>
    <h2>Enquiries</h2><p>When you submit an enquiry, your name, brand, email address and project details are sent to and stored by Netlify Forms so Bethany can review and respond to your request. Please only include information relevant to your project. If you email Bethany directly, the information you include is handled through email instead.</p>
    <h2>Instagram</h2><p>The videos on this website are hosted locally. Choosing “Load Instagram feed” connects to Instagram, which may use cookies and process information according to its own privacy policy. You can watch the local videos without loading Instagram.</p>
    <h2>Hosting</h2><p>This website is prepared for hosting on Netlify. Your connection may generate standard hosting logs, such as your IP address and requested pages. This website does not include advertising trackers or analytics scripts.</p>
    <h2>Questions</h2><p>For questions about your enquiry or personal information, or to request deletion of your enquiry, contact <a href={`mailto:${email}`}>{email}</a>.</p>
  </article>;
}
