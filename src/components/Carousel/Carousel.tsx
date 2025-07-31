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
import { authSlides, guestSlides } from "../../utils/slides";

interface CarouselProps {
  username?: string;
  isAuthenticated?: boolean;
}

export default function Carousel({ username, isAuthenticated }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const slides = isAuthenticated ? authSlides : guestSlides;

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
          {isAuthenticated ? (
            <div className={styles.emblaSlide}>
              <div className={styles.emblaSlideInner}>
                <Moose
                  hasBg={true}
                  text={`Hello, ${username}! Great to have you back!`}
                />
              </div>
            </div>
          ) : (
            <div className={styles.emblaSlide}>
              <div className={styles.emblaSlideInner}>
                <Moose
                  hasBg={true}
                  text="Welcome! This app helps you learn Finnish words in a fun and interactive way"
                />
              </div>
            </div>
          )}
          {slides.map((slide, index) => (
            <div className={styles.emblaSlide} key={index}>
              <div className={styles.emblaSlideInner}>
                <Moose hasBg={true} text={slide.text} />
                {slide.buttons && (
                  <div className={styles.actionBtns}>
                    {slide.buttons.map((btn, idx) => (
                      <Link key={idx} to={btn.to} className="btn-primary">
                        {btn.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
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
