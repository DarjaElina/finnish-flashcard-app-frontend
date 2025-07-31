import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../CarouselButtons/CarouselButtons";
import styles from "./Carousel.module.css";
import { DotButton, useDotButton } from "../CarouselDots/CarouselDots";
import clsx from "clsx";
import Moose from "../Moose/Moose";
import { Link } from "react-router-dom";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          <div className={styles.emblaSlide}>
            <div className={styles.emblaSlideInner}>
              <Moose
                hasBg={true}
                text="Welcome! This app helps you learn Finnish words in a fun and interactive
                way"
              />
            </div>
          </div>
          <div className={styles.emblaSlide}>
            <div className={styles.emblaSlideInner}>
              <Moose
                hasBg={true}
                text="Did you know? In Finnish, moose is hirvi. What a beautiful word, right? ✨"
              />
            </div>
          </div>

          <div className={styles.emblaSlide}>
            <div className={styles.emblaSlideInner}>
              <Moose
                hasBg={true}
                text="But enough talking! Let's get you started! What would you like to do next?"
              />
              <div className={styles.actionBtns}>
                <Link to="/sign-up" className="btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn-primary">
                  Log In
                </Link>
                <Link to="/demo" className="btn-primary">
                  Demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.emblaControls}>
          <div className={styles.emblaButtons}>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
          <div className={styles.emblaDots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={clsx(
                  styles.emblaDot,
                  index === selectedIndex && styles.emblaDotSelected,
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
