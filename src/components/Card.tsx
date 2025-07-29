import { useState } from "react";
import { showWarningConfirm } from "../utils";
import type { Word } from "../types/word.types";
import { useUpdateWord, useDeleteWord } from "../hooks/useWordMutation";

export default function Card({
  word,
  isSaved,
}: {
  word: Word;
  isSaved?: boolean;
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

  const openEditMode = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUpdatedWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    await updateWordMutation.mutateAsync({ id: word.id, updatedWord });
  };

  const handleDelete = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    const result = await showWarningConfirm(
      "Are you sure?",
      "You won't be able to recover this word!",
    );
    if (result.isConfirmed) {
      await deleteWordMutation.mutateAsync(word.id);
    }
  };

  const handleCancel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("saved");
  };

  return (
    <div
      className={`flip-card ${flipped && "flipped"}`}
      onClick={() => !isEditing && setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
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
                <button onClick={handleUpdate} className="form-button">
                  Save
                </button>
                <button onClick={handleCancel} className="form-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>{word.english}</h2>
              <p>
                <em>{word.example}</em>
              </p>
            </>
          )}

          {!isSaved && !isEditing && (
            <button onClick={handleSave} className="form-button">
              Save
            </button>
          )}

          {isSaved && !isEditing && (
            <div className="card-btns">
              <button
                onClick={openEditMode}
                className="form-button secondary-button"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="form-button danger-button"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
