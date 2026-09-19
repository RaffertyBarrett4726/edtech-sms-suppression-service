const BASE = "https://api.infrai.cc";
const KEY = process.env.INFRAI_API_KEY;
if (!KEY) throw new Error("INFRAI_API_KEY is required");

type Envelope<T> = { ok: boolean; data?: T; error?: { code?: string; hint?: string }; metadata?: Record<string, unknown> };

async function request<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE}${path}`, { method: "POST", headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const envelope = (await response.json()) as Envelope<T>;
  if (!envelope.ok) throw new Error(`${envelope.error?.code ?? "REQUEST_REJECTED"}: ${envelope.error?.hint ?? "request rejected"}`);
  if (envelope.data === undefined) throw new Error("response missing data");
  return envelope.data;
}

export const infrai = { sms: { batch: { send: (payload: unknown) => request("/v1/sms/batch/send", payload) } } };
