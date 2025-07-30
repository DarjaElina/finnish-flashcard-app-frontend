import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { login } from "../services/auth";
import { showError } from "../utils/swal";

const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: () => {
      navigate("/saved");
    },
    onError: (e) => {
      showError(e.message ?? "Error signing in");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
        <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            placeholder="nice.moose@example.com"
            id="email"
            type="email"
            className="form-input"
            {...register("email")}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            placeholder="••••••••"
            id="password"
            type="password"
            className="form-input"
            {...register("password")}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="form-button"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
