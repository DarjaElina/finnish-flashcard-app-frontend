import { useState } from "react";
import { useNavigate } from "react-router";
import { useWords } from "../context/WordContext";
import { showSuccess, showError } from "../utils";
import Moose from "./Moose";
import type { Word } from "../types/word.types";

export default function CreateCard() {
  const [formData, setFormData] = useState<Word>({
    finnish: "",
    english: "",
    example: "",
  });
  const [errors, setErrors] = useState<Word>({
    finnish: "",
    english: "",
    example: "",
  });
  const { addWord } = useWords();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Word = {
      finnish: "",
      english: "",
      example: "",
    };
    if (!formData.finnish.trim())
      newErrors.finnish = "Finnish word is required.";
    if (!formData.english.trim())
      newErrors.english = "Translation is required.";
    if (!formData.example.trim()) newErrors.example = "Example is required.";
    return newErrors;
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({
      finnish: "",
      english: "",
      example: "",
    });
    try {
      await addWord(formData);
      setFormData({
        finnish: "",
        english: "",
        example: "",
      });
      showSuccess("Saved!");
      setTimeout(() => {
        navigate("/saved");
      }, 3000);
    } catch (err) {
      console.error(err);
      showError("Error saving word");
    }
  };

  return (
    <div className="form-container">
      <Moose text="Create your own flashcard! Add a Finnish word, its translation, and an example sentence." />
      <div style={{ flex: 1 }}>
        <h2 className="form-title">Create a New Flashcard</h2>
        <form className="card-form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="finnish">
            Finnish Word
          </label>
          <input
            id="finnish"
            name="finnish"
            type="text"
            className="form-input"
            value={formData.finnish}
            onChange={handleChange}
          />
          {errors.finnish && <p className="form-error">{errors.finnish}</p>}

          <label className="form-label" htmlFor="english">
            English Translation
          </label>
          <input
            id="english"
            name="english"
            type="text"
            className="form-input"
            value={formData.english}
            onChange={handleChange}
          />
          {errors.english && <p className="form-error">{errors.english}</p>}

          <label className="form-label" htmlFor="example">
            Example Sentence
          </label>
          <textarea
            id="example"
            name="example"
            rows={3}
            className="form-textarea"
            value={formData.example}
            onChange={handleChange}
          ></textarea>
          {errors.example && <p className="form-error">{errors.example}</p>}

          <button type="submit" className="form-button">
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
}
