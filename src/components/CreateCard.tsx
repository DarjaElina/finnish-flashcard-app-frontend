import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { showSuccess, showError } from "../utils/swal";
import { useCreateWord } from "../hooks/useWordMutation";
import Moose from "./Moose/Moose";

const WordSchema = z.object({
  finnish: z.string().min(1, "Finnish word is required"),
  english: z.string().min(1, "English translation is required"),
  example: z.string().min(1, "Example sentence is required"),
});

type WordFormData = z.infer<typeof WordSchema>;

export default function CreateCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WordFormData>({
    resolver: zodResolver(WordSchema),
  });

  const { mutateAsync: createWord } = useCreateWord();

  const mutation = useMutation({
    mutationFn: (data: WordFormData) => createWord(data),
    onSuccess: () => {
      showSuccess("Word created!");
      reset();
    },
    onError: () => {
      showError("Error saving word");
    },
  });

  const onSubmit = (data: WordFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="form-wrapper">
      <Moose
        hasBg={true}
        text="Create your own flashcard! Add a Finnish word, its translation, and an
          example sentence."
      />
      <h2 className="form-title">Create a New Flashcard</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="finnish">
          Finnish Word
        </label>
        <input
          id="finnish"
          type="text"
          className="form-input"
          {...register("finnish")}
        />
        {errors.finnish && (
          <p className="form-error">{errors.finnish.message}</p>
        )}

        <label className="form-label" htmlFor="english">
          English Translation
        </label>
        <input
          id="english"
          type="text"
          className="form-input"
          {...register("english")}
        />
        {errors.english && (
          <p className="form-error">{errors.english.message}</p>
        )}

        <label className="form-label" htmlFor="example">
          Example Sentence
        </label>
        <textarea
          id="example"
          rows={3}
          className="form-textarea"
          {...register("example")}
        />
        {errors.example && (
          <p className="form-error">{errors.example.message}</p>
        )}

        <button
          disabled={mutation.isPending}
          type="submit"
          className="btn-primary"
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
