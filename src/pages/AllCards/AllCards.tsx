import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Moose from "../../components/Moose/Moose";
import MooseLoader from "../../components/MooseLoader/MooseLoader";
import { getSharedWords } from "../../services/words";
import Cards from "../../components/Cards/Cards";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import styles from "./AllCards.module.css";

export default function AllCards({ isDemo }: { isDemo?: boolean }) {
  const [page, setPage] = useState(1);

  const {
    data: paginatedData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sharedWords", page],
    queryFn: () => getSharedWords(page),
  });

  if (isLoading) {
    return <MooseLoader />;
  }

  if (isError || !paginatedData?.data?.length) {
    return (
      <Moose text="Oops! I tried fetching words from the cloud, but something went wrong. Maybe the internet moose got tangled?" />
    );
  }

  return (
    <div>
      <div className="cards-container">
        <Moose
          text={
            isDemo
              ? "These are demo words! Tap a card to flip it. Want to save or edit words? Log in to unlock those powers!"
              : "These are words from the outside world! Tap a card to flip it. Save the ones you like!"
          }
        />
        <Cards isDemo={isDemo} words={paginatedData.data} />
        <div className={styles.actionBtns}>
          <button
            className="pagination-btn"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            <CircleArrowLeft />
          </button>

          <p>
            Page {page} of {paginatedData.last_page}
          </p>

          <button
            className="pagination-btn"
            onClick={() =>
              setPage((old) => (old < paginatedData.last_page ? old + 1 : old))
            }
            disabled={page === paginatedData.last_page}
          >
            <CircleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
