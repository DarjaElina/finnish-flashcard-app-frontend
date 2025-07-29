import { useState } from "react";
import { showSuccess, showError } from "../utils";
import Moose from "./Moose";
import type { Word } from "../types/word.types";
import { clearWordErrors, validateWordForm } from "../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { useCreateWord } from "../hooks/useWordMutation";

export default function CreateCard() {
  const [formData, setFormData] = useState<Omit<Word, "id">>({
    finnish: "",
    english: "",
    example: "",
  });
  const [errors, setErrors] = useState<Omit<Word, "id">>({
    finnish: "",
    english: "",
    example: "",
  });

  const { mutateAsync: createWord } = useCreateWord();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const newWordMutation = useMutation({
    mutationFn: () => createWord(formData),
    onSuccess: () => {
      showSuccess("Word created!");
    },
    onError: () => {
      showError("Error saving word");
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validateWordForm(formData);
    if (Object.values(validationErrors).some((val) => val !== "")) {
      setErrors(validationErrors);
      return;
    }
    setErrors(clearWordErrors());
    await createWord(formData);
  };

  return (
    <div className="form-wrapper">
      <Moose text="Create your own flashcard! Add a Finnish word, its translation, and an example sentence." />
      <div className="form-container">
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

          <button
            disabled={newWordMutation.isPending}
            type="submit"
            className="form-button"
          >
            {newWordMutation.isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
