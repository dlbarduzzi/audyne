import { db } from "@/db/core"

type SocialProviders = {
  github: GitHub
  google: Google
}

type AuthContext = {
  database: typeof db
  socialProviders: SocialProviders
}

export function auth() {
  const ctx = initContext()
  return { ctx }
}

function initContext() {
  const ctx: AuthContext = {
    database: db,
    socialProviders: initProviders(),
  }
  return ctx
}

function initProviders() {
  const github = new GitHub("123")
  const google = new Google("123")
  return { github, google }
}

class GitHub {
  private readonly clientId: string
  constructor(clientId: string) {
    this.clientId = clientId
  }
  public createAuthorizationURL() {
    return "/api/github-provider"
  }
}

class Google {
  private readonly clientId: string
  constructor(clientId: string) {
    this.clientId = clientId
  }
  public createAuthorizationURL() {
    return "/api/google-provider"
  }
}
