export const enquiryFormName = "brand-enquiry";
export const enquiryEndpoint = "/__forms.html";

export async function submitEnquiry(data: FormData, send: typeof fetch = fetch) {
  const body = new URLSearchParams();
  for (const [name, value] of data.entries()) {
    if (typeof value === "string") body.append(name, value);
  }
  body.set("form-name", enquiryFormName);

  // POST to a static file so Netlify handles it before the Next.js server.
  const response = await send(enquiryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Enquiry submission failed (${response.status})`);
}
