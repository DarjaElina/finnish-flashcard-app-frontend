import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { z } from "zod";
import { signup } from "../services/auth";
import { showError } from "../utils/swal";
import Moose from "./Moose/Moose";
import FormInfo from "./FormInfo/FormInfo";

const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpFormData) => signup(data),
    onSuccess: () => {
      reset();
      queryClient.refetchQueries({
        queryKey: [["currentUser"]],
        type: "active",
        exact: true,
      });
      navigate("/saved");
    },
    onError: (e) => {
      showError(e.message ?? "Error signing up");
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Sign Up</h2>
      <Moose hasBg={true} text="New here? Let's make learning an adventure!" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          placeholder="Moose"
          id="name"
          type="text"
          className="form-input"
          {...register("name")}
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}

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

        <label className="form-label" htmlFor="password_confirmation">
          Confirm Password
        </label>
        <input
          placeholder="••••••••"
          id="password_confirmation"
          type="password"
          className="form-input"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && (
          <p className="form-error">{errors.password_confirmation.message}</p>
        )}

        <button
          type="submit"
          disabled={signUpMutation.isPending}
          className="btn-primary"
        >
          {signUpMutation.isPending ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <FormInfo
        question="Already have an account?"
        action="Log In"
        url="/login"
      />
    </div>
  );
}
