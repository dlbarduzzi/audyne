export async function GET() {
  return Response.json({ ok: true, provider: "google" }, { status: 200 })
}
