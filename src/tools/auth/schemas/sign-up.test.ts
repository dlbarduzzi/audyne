import { describe, it, expect } from "vitest"
import { signUpSchema } from "./sign-up"

function getSignUpErrors(data: unknown): {
  email: string | undefined
  password: string | undefined
} {
  const result = signUpSchema.safeParse(data)
  expect(result.success).toBeFalsy()
  if (result.success) {
    throw new Error("expected signUpSchema to fail")
  }
  const errors = result.error.flatten().fieldErrors
  expect(errors).toHaveProperty("email")
  expect(errors).toHaveProperty("password")
  if (
    !errors.email ||
    !errors.password ||
    errors.email.length < 1 ||
    errors.password.length < 1
  ) {
    throw new Error("expected email and password errors to exist")
  }
  return { email: errors.email[0], password: errors.password[0] }
}

describe("auth.schemas.sign-up", () => {
  describe("signUpSchema", () => {
    it("should get simple required errors", async () => {
      const test = {}
      const errors = getSignUpErrors(test)
      expect(errors.email).toBe("Required")
      expect(errors.password).toBe("Required")
    })
    it("should get field specific required errors", async () => {
      const test = { email: "", password: "" }
      const errors = getSignUpErrors(test)
      expect(errors.email).toBe("Email is required")
      expect(errors.password).toBe("Password is required")
    })
    it("should get invalid email", async () => {
      const test = { email: "test", password: "" }
      const errors = getSignUpErrors(test)
      expect(errors.email).toBe("Not a valid email")
    })
    it("should get invalid password min length", async () => {
      const test = { email: "", password: "abcd" }
      const errors = getSignUpErrors(test)
      expect(errors.password).toBe("Password must be at least 8 characters long")
    })
    it("should get invalid password max length", async () => {
      const test = { email: "", password: "a".repeat(80) }
      const errors = getSignUpErrors(test)
      expect(errors.password).toBe("Password must be at most 72 characters long")
    })
    it("should get invalid password without a number", async () => {
      const test = { email: "", password: "P@ssword" }
      const errors = getSignUpErrors(test)
      expect(errors.password).toBe("Password must contain at least 1 number")
    })
    it("should get invalid password without a special character", async () => {
      const test = { email: "", password: "Password1" }
      const errors = getSignUpErrors(test)
      expect(errors.password).toBe("Password must contain at least 1 special character")
    })
    it("should get invalid password without a lowercase character", async () => {
      const test = { email: "", password: "P@SSWORD1" }
      const errors = getSignUpErrors(test)
      expect(errors.password).toBe(
        "Password must contain at least 1 lowercase character"
      )
    })
    it("should get invalid password without an uppercasecase character", async () => {
      const test = { email: "", password: "p@ssword1" }
      const errors = getSignUpErrors(test)
      expect(errors.password).toBe(
        "Password must contain at least 1 uppercase character"
      )
    })
    it("should get success data", async () => {
      const test = { email: "test@email.com", password: "P@ssword1" }
      const result = signUpSchema.safeParse(test)
      expect(result.success).toBeTruthy()
    })
  })
})
