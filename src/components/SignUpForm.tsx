import { useState } from "react";
import { useNavigate } from "react-router";
import { showError } from "../utils";
import Moose from "./Moose";
import { signup } from "../services/auth";
import { validateAuthForm, clearAuthErrors } from "../utils/validation";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const validationErrors = validateAuthForm(formData);
    if (Object.values(validationErrors).some((val) => val !== "")) {
      setErrors(validationErrors);
      return;
    }

    setErrors(clearAuthErrors());

    try {
      await signup(
        formData.email,
        formData.email,
        formData.password,
        formData.confirmPassword,
      );

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (err) {
      console.error(err);
      showError("Error signing up");
    }
  };

  return (
    <div className="form-wrapper">
      <Moose text="New here? Let’s make learning an adventure! ✨" />
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form className="card-form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="form-error">{errors.password}</p>}

          <label className="form-label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="form-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
