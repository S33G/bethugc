import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { enquiryEndpoint, enquiryFormName, submitEnquiry } from "../src/lib/netlify-form.ts";

test("enquiries POST every registered field without losing punctuation or newlines", async () => {
  const fields = {
    "form-name": enquiryFormName, "bot-field": "", name: "Beth & Co",
    brand: "A+B", email: "hello+ugc@example.com", service: "Organic UGC",
    budget: "£500–£1,000", timeline: "October", message: "One idea & another\nA second line = yes!",
  };
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  let calls = 0;
  await submitEnquiry(data, async (url, options) => {
    calls++;
    assert.equal(url, enquiryEndpoint);
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.deepEqual(Object.fromEntries(new URLSearchParams(options.body)), fields);
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(null, { status: 200 });
  });
  assert.equal(calls, 1);
  const html = await readFile(new URL("../public/__forms.html", import.meta.url), "utf8");
  const registered = [...html.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(registered.sort(), Object.keys(fields).sort());
  const component = await readFile(new URL("../src/components/contact-form.tsx", import.meta.url), "utf8");
  const submitted = [...component.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(submitted.sort(), registered.sort());
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /netlify-honeypot="bot-field"/);
  assert.ok(html.includes(`name="${enquiryFormName}"`));
});

for (const status of [400, 404, 405, 429, 500]) {
  test(`HTTP ${status} cannot be mistaken for a successful submission`, async () => {
    await assert.rejects(submitEnquiry(new FormData(), async () => new Response(null, { status })), /submission failed/);
  });
}

test("network errors are surfaced and honeypot values are preserved for Netlify", async () => {
  const data = new FormData();
  data.set("bot-field", "spam");
  await assert.rejects(submitEnquiry(data, async (_url, options) => {
    assert.equal(new URLSearchParams(options.body).get("bot-field"), "spam");
    throw new TypeError("Network unavailable");
  }), /Network unavailable/);
});
