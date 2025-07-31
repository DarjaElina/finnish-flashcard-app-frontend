import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { Word } from "../../types/word.types";
import styles from "./EditCardForm.module.css";

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
      onSubmit={handleSubmit(onUpdate)}
      onClick={(e) => e.stopPropagation()}
    >
      <label htmlFor="finnish">Finnish</label>
      <input {...register("finnish")} type="text" />
      {errors.finnish && <p className="form-error">{errors.finnish.message}</p>}

      <label htmlFor="english">English</label>
      <input {...register("english")} type="text" />
      {errors.english && <p className="form-error">{errors.english.message}</p>}

      <label htmlFor="example">Example</label>
      <textarea {...register("example")} rows={3} />
      {errors.example && <p className="form-error">{errors.example.message}</p>}

      <div className={styles.btns}>
        <button
          disabled={!isDirty || isLoading}
          type="submit"
          className="btn-primary"
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
