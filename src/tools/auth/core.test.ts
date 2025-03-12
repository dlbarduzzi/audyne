import { describe, it, expect } from "vitest"
import { github, google } from "./core"

describe("auth.core", () => {
  describe("github", () => {
    it("should return github authorization url", async () => {
      const url = github.createAuthorizationURL()
      expect(url).toBe("Under construction: GitHub authorization url.")
    })
  })
  describe("google", () => {
    it("should return google authorization url", async () => {
      const url = google.createAuthorizationURL()
      expect(url).toBe("Under construction: Google authorization url.")
    })
  })
})
