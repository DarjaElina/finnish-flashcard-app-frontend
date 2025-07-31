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
import Modal from "react-modal";
Modal.setAppElement("#root");

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const updateWordMutation = useUpdateWord();
  const deleteWordMutation = useDeleteWord();
  const newWordMutation = useCreateWord();

  const handleUpdate = async (data: EditWordForm) => {
    if (isDemo) return;
    await updateWordMutation.mutateAsync({ id: word.id, updatedWord: data });
    setIsOpen(false);
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
    if (!modalIsOpen) setFlipped(!flipped);
  };

  function openModal(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="overlay"
            className={styles.modalForm}
            contentLabel="Edit word form"
          >
            <EditCardForm
              word={word}
              onUpdate={handleUpdate}
              onCancel={closeModal}
              isLoading={updateWordMutation.isPending}
            />
          </Modal>
          {!modalIsOpen && (
            <>
              <h2>{word.english}</h2>
              <em className={styles.example}>{word.example}</em>
            </>
          )}

          {!isSaved && !modalIsOpen && (
            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={isDemo || newWordMutation.isPending}
            >
              {newWordMutation.isPending ? "Saving..." : "Save"}
            </button>
          )}

          {isSaved && !modalIsOpen && (
            <div className={styles.btns}>
              <button
                onClick={openModal}
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
