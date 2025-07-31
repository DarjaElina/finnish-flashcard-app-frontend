import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { Word } from "../../types/word.types";

const EditSchema = z.object({
  finnish: z.string().min(1, "Finnish word is required"),
  english: z.string().min(1, "English translation is required"),
  example: z.string().min(1, "Example sentence is required"),
});

export type EditWordForm = z.infer<typeof EditSchema>;
type EditCardFormProps = {
  word: Word;
  onUpdate: (data: EditWordForm) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function EditCardForm({
  word,
  onUpdate,
  onCancel,
  isLoading,
}: EditCardFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditWordForm>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      finnish: word.finnish,
      english: word.english,
      example: word.example,
    },
  });

  return (
    <form
      className="edit-form"
      onSubmit={handleSubmit(onUpdate)}
      onClick={(e) => e.stopPropagation()}
    >
      <input {...register("finnish")} type="text" className="form-input" />
      {errors.finnish && <p className="form-error">{errors.finnish.message}</p>}

      <input {...register("english")} type="text" className="form-input" />
      {errors.english && <p className="form-error">{errors.english.message}</p>}

      <textarea {...register("example")} className="form-input" rows={3} />
      {errors.example && <p className="form-error">{errors.example.message}</p>}

      <div className="flex-btns">
        <button
          disabled={!isDirty || isLoading}
          type="submit"
          className="form-button"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            reset();
            onCancel();
          }}
          className="btn-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
