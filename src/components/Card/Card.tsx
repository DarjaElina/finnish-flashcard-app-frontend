import { useState } from "react";
import { showWarningConfirm } from "../../utils/swal";
import type { Word } from "../../types/word.types";
import {
  useUpdateWord,
  useDeleteWord,
  useCreateWord,
} from "../../hooks/useWordMutation";
import styles from "./Card.module.css";
import clsx from "clsx";
import EditCardForm, { type EditWordForm } from "../EditCardForm/EditCardForm";

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
      className={clsx(styles.flipCard, flipped && styles.flipped)}
      onClick={handleCardClick}
    >
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <h2>{word.finnish}</h2>
        </div>
        <div className={styles.flipCardBack}>
          {isEditing ? (
            <EditCardForm
              word={word}
              onUpdate={onUpdate}
              onCancel={() => setIsEditing(false)}
              isLoading={updateWordMutation.isPending}
            />
          ) : (
            <>
              <h2>{word.english}</h2>
              <p>
                <em>{word.example}</em>
              </p>
            </>
          )}

          {!isSaved && !isEditing && (
            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={isDemo || newWordMutation.isPending}
            >
              {newWordMutation.isPending ? "Saving..." : "Save"}
            </button>
          )}

          {isSaved && !isEditing && (
            <div>
              <button
                onClick={openEditMode}
                className="btn-primary"
                disabled={isDemo}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn-primary"
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
