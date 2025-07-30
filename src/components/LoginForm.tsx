import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showError } from "../utils";
import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { clearAuthErrors } from "../utils/validation";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginMutation = useMutation({
    mutationFn: () => login(formData),
    onSuccess: () => {
      navigate("/saved");
      clearAuthErrors();
    },
    onError: () => {
      showError("Error signing ip");
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await loginMutation.mutateAsync();
  };

  return (
    <div className="form-wrapper">
      <div className="form-info">
        <img className="moose-img" src="/moose.png" alt="Friendly moose" />
        <p>Welcome back! Log in to keep building your flashcard kingdom ✨</p>
        <p className="form-login-text">
          Don't have an account?{" "}
          <a href="/login" className="form-login-link">
            Sign up
          </a>
        </p>
      </div>

      <div className="form-container">
        <h2 className="form-title">Log In</h2>
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

          <button type="submit" className="form-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
