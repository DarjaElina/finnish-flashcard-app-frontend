export function validateAuthForm(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const errors = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!data.email.trim()) errors.email = "Email is required.";
  if (!data.password.trim()) errors.password = "Password is required.";
  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Password confirmation is required.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function clearAuthErrors() {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
}

export function validateWordForm(data: {
  finnish: string;
  english: string;
  example: string;
}) {
  const errors = {
    finnish: "",
    english: "",
    example: "",
  };

  if (!data.finnish.trim()) errors.finnish = "Finnish word is required.";
  if (!data.english.trim()) errors.english = "Translation is required.";
  if (!data.example.trim()) errors.example = "Example is required.";

  return errors;
}

export function clearWordErrors() {
  return {
    finnish: "",
    english: "",
    example: "",
  };
}
