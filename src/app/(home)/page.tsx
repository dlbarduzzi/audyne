import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function Page() {
  // Example calling social providers.
  console.log(auth.ctx.socialProviders.github.createAuthorizationURL())
  // Example making database queries.
  const users = await auth.ctx.database.query.users.findMany()
  console.log({ users })
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="p-4">
        <Button type="button">Button</Button>
      </div>
    </div>
  )
}
