import { useState } from "react";
import { useWords } from "../context/WordContext";
import { showError, showSuccess, showWarningConfirm } from "../utils";
import type { Word } from "../types/word.types";

export default function Card({
  word,
  isSaved,
}: {
  word: Word;
  isSaved?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { updateWord, deleteWord, addWord } = useWords();
  const [updatedWord, setUpdatedWord] = useState({
    english: word.english,
    finnish: word.finnish,
    example: word.example,
  });

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
    try {
      if (word.id) {
        await updateWord(word.id, updatedWord);
        setIsEditing(false);
        showSuccess("Saved!");
      }
    } catch (e) {
      setUpdatedWord({
        english: word.english,
        finnish: word.finnish,
        example: word.example,
      });
      console.error(e);
      showError("Error updating");
    }
  };

  const handleDelete = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    const result = await showWarningConfirm(
      "Are you sure?",
      "You won't be able to recover this word!",
    );
    if (result.isConfirmed) {
      try {
        if (word.id) {
          await deleteWord(word.id);
          showSuccess("Deleted!", "The word has been deleted.");
        }
      } catch (e) {
        console.error(e);
        showError("Error updating");
      }
    }
  };

  const handleCancel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleSave = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    try {
      await addWord({
        finnish: word.finnish,
        english: word.english,
        example: word.example,
      });
      showSuccess("Saved!");
    } catch (e) {
      console.error(e);
      showError("Error saving");
    }
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
