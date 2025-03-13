import { describe, it, expect } from "vitest"
import { hasNumber, hasSpecialChar, hasLowercaseChar, hasUppercaseChar } from "./utils"

describe("auth.schemas.utils", () => {
  describe("hasNumber", () => {
    it("should include number", async () => {
      const result = hasNumber("test123")
      expect(result).toBeTruthy()
    })
    it("should not include number", async () => {
      const result = hasNumber("test")
      expect(result).toBeFalsy()
    })
  })
  describe("hasSpecialChar", () => {
    it("should include special character", async () => {
      const result = hasSpecialChar("test123!")
      expect(result).toBeTruthy()
    })
    it("should not include special character", async () => {
      const result = hasSpecialChar("test123")
      expect(result).toBeFalsy()
    })
  })
  describe("hasLowercaseChar", () => {
    it("should include lowercase character", async () => {
      const result = hasLowercaseChar("TESt123")
      expect(result).toBeTruthy()
    })
    it("should not include lowercase character", async () => {
      const result = hasLowercaseChar("TEST123")
      expect(result).toBeFalsy()
    })
  })
  describe("hasUppercaseChar", () => {
    it("should include lowercase character", async () => {
      const result = hasUppercaseChar("tesT123")
      expect(result).toBeTruthy()
    })
    it("should not include lowercase character", async () => {
      const result = hasUppercaseChar("test123")
      expect(result).toBeFalsy()
    })
  })
})
