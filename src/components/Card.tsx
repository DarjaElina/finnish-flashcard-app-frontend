import { useState } from "react";
import { showWarningConfirm } from "../utils";
import type { Word } from "../types/word.types";
import {
  useUpdateWord,
  useDeleteWord,
  useCreateWord,
} from "../hooks/useWordMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const EditSchema = z.object({
  finnish: z.string().min(1, "Finnish word is required"),
  english: z.string().min(1, "English translation is required"),
  example: z.string().min(1, "Example sentence is required"),
});

type EditWordForm = z.infer<typeof EditSchema>;

export default function Card({
  word,
  isSaved,
  isDemo,
}: {
  word: Word;
  isSaved?: boolean;
  isDemo?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const updateWordMutation = useUpdateWord();
  const deleteWordMutation = useDeleteWord();
  const newWordMutation = useCreateWord();

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

  const openEditMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const onUpdate = async (data: EditWordForm) => {
    if (isDemo) return;
    await updateWordMutation.mutateAsync({ id: word.id, updatedWord: data });
    setIsEditing(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDemo) return;
    const result = await showWarningConfirm(
      "Are you sure?",
      "You won't be able to recover this word!",
    );
    if (result.isConfirmed) {
      await deleteWordMutation.mutateAsync(word.id);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDemo) return;
    await newWordMutation.mutateAsync(word);
  };

  const handleCardClick = () => {
    if (!isEditing) setFlipped(!flipped);
  };

  return (
    <div
      className={`flip-card ${flipped && "flipped"}`}
      onClick={handleCardClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>🇫🇮 ✨</h2>
          <h2>{word.finnish}</h2>
        </div>
        <div className="flip-card-back">
          {isEditing ? (
            <form
              className="edit-form"
              onSubmit={handleSubmit(onUpdate)}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                {...register("finnish")}
                id="finnish"
                type="text"
                className="form-input edit-input"
              />
              {errors.finnish && (
                <p className="form-error">{errors.finnish.message}</p>
              )}

              <input
                {...register("english")}
                id="english"
                type="text"
                className="form-input edit-input"
              />
              {errors.english && (
                <p className="form-error">{errors.english.message}</p>
              )}

              <textarea
                {...register("example")}
                id="example"
                className="form-input edit-input"
                rows={3}
              />
              {errors.example && (
                <p className="form-error">{errors.example.message}</p>
              )}

              <div className="edit-btns">
                <button
                  disabled={!isDirty || updateWordMutation.isPending}
                  type="submit"
                  className="form-button"
                >
                  {updateWordMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                    setIsEditing(false);
                  }}
                  className="form-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2>✍️</h2>
              <h2>{word.english}</h2>
              <p>
                <em>{word.example}</em>
              </p>
            </>
          )}

          {!isSaved && !isEditing && (
            <button
              onClick={handleSave}
              className="form-button"
              disabled={isDemo || newWordMutation.isPending}
            >
              {newWordMutation.isPending ? "Saving..." : "Save"}
            </button>
          )}

          {isSaved && !isEditing && (
            <div className="card-btns">
              <button
                onClick={openEditMode}
                className="form-button secondary-button"
                disabled={isDemo}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="form-button danger-button"
                disabled={deleteWordMutation.isPending || isDemo}
              >
                {deleteWordMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
