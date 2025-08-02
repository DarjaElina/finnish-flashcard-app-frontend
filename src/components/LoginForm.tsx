import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { login } from "../services/auth";
import { showError } from "../utils/swal";
import Moose from "./Moose/Moose";
import FormInfo from "./FormInfo/FormInfo";
import { AxiosError } from "axios";

const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      queryClient.refetchQueries({
        queryKey: [["currentUser"]],
        type: "active",
        exact: true,
      });
      navigate("/");
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        showError(e?.response?.data.message);
      } else showError(e.message ?? "Error signing in");
      console.log(e);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="form-wrapper">
      <h2>Log In</h2>
      <Moose
        hasBg={true}
        text="Welcome back! Log in to keep building your flashcard kingdom"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          placeholder="nice.moose@example.com"
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          placeholder="••••••••"
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="btn-primary"
        >
          {loginMutation.isPending ? "Signing in..." : "Log in"}
        </button>
      </form>
      <FormInfo
        question="Don't have an account?"
        action="Sign Up"
        url="/sign-up"
      />
    </div>
  );
}
