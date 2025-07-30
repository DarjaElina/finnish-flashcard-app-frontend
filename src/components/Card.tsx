import { useState } from "react";
import { showWarningConfirm } from "../utils";
import type { Word } from "../types/word.types";
import {
  useUpdateWord,
  useDeleteWord,
  useCreateWord,
} from "../hooks/useWordMutation";

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
  const [updatedWord, setUpdatedWord] = useState({
    english: word.english,
    finnish: word.finnish,
    example: word.example,
  });

  const updateWordMutation = useUpdateWord();
  const deleteWordMutation = useDeleteWord();
  const newWordMutation = useCreateWord();

  const openEditMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatedWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDemo) return;
    await updateWordMutation.mutateAsync({ id: word.id, updatedWord });
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

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleSave = async (e: React.MouseEvent) => {
    console.log("clicked");
    e.stopPropagation();
    if (isDemo) return;
    await newWordMutation.mutateAsync(word);
  };

  const handleCardClick = () => {
    if (!isEditing) setFlipped(!flipped);
  };

  console.log(isDemo);

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
            <div className="edit-form">
              <input
                onChange={handleChange}
                value={updatedWord.finnish}
                name="finnish"
                id="finnish"
                type="text"
                className="form-input edit-input"
              />
              <input
                onChange={handleChange}
                value={updatedWord.english}
                name="english"
                id="english"
                type="text"
                className="form-input edit-input"
              />
              <textarea
                onChange={handleChange}
                value={updatedWord.example}
                name="example"
                id="example"
                className="form-input edit-input"
              />
              <div className="edit-btns">
                <button
                  onClick={handleUpdate}
                  className="form-button"
                  disabled={updateWordMutation.isPending || isDemo}
                >
                  {updateWordMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancel} className="form-button">
                  Cancel
                </button>
              </div>
            </div>
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
              disabled={isDemo}
            >
              Save
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
