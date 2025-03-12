export async function GET() {
  return Response.json({ ok: true, provider: "credential" }, { status: 200 })
}
