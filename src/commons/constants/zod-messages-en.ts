/**
 * Global Zod error messages
 * This file centralizes all validation error messages for consistency
 */

export const ZodMessages = {
  // Generic errors
  required: "This field is required",
  invalid: "Invalid input",
  
  // String validations
  string: {
    min: (min: number) => `Must be at least ${min} characters`,
    max: (max: number) => `Must not exceed ${max} characters`,
    email: "Invalid email address",
  },
  
  // Number validations
  number: {
    min: (min: number) => `Must be at least ${min}`,
    max: (max: number) => `Must not exceed ${max}`,
    integer: "Must be a whole number",
    positive: "Must be a positive number",
  },
  
  // Password validations
  password: {
    required: "Password is required",
    min: "Password must be at least 8 characters",
    uppercase: "Password must contain at least one uppercase letter",
    lowercase: "Password must contain at least one lowercase letter",
    number: "Password must contain at least one number",
    mismatch: "Passwords do not match",
  },
  
  // Phone validations
  phone: {
    required: "Phone number is required",
    format: "Phone number must only contain digits",
    length: "Phone number must be between 10-15 digits",
  },
  
  // Form validations
  form: {
    terms: "You must agree to the terms and conditions",
  },
  
  // Student specific
  student: {
    type: "Student type is required",
  },
  
  // Test specific
  test: {
    weight: "Test weight cannot exceed 100%",
    dateOverlap: "Test date ranges cannot overlap",
    points: "Points are required for this category",
  }
};