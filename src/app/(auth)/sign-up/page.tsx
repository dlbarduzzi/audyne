import { SignUp } from "@/components/sign-up"

export default function Page() {
  return (
    <div className="flex flex-col">
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <div className="h-full p-4">
        <SignUp />
      </div>
    </div>
  )
}
