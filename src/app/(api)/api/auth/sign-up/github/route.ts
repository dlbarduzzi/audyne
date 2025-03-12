export async function GET() {
  return Response.json({ ok: true, provider: "github" }, { status: 200 })
}
