import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../CarouselButtons/CarouselButtons";
import { DotButton, useDotButton } from "../CarouselDots/CarouselDots";
import clsx from "clsx";
import Moose from "../Moose/Moose";
import { Link } from "react-router-dom";
import { authSlides, guestSlides } from "../../utils/slides";
import { useAuth } from "../../hooks/useAuth";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {data: user, isLoading} = useAuth();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

    const slides = user && user.name ? authSlides : guestSlides;

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla-viewport" ref={emblaRef}>
        <div className="embla-container">
          {user && !isLoading && 
            <div className="embla-slide">
              <div className="embla-slide-inner">
                <Moose
                  hasBg={true}
                  text={`Hello, ${user.name}! Good to see you again! 💛`}
                />
              </div>
            </div> } 
          
            {!user && !isLoading && <div className="embla-slide">
              <div className="embla-slide-inner">
                <Moose
                  hasBg={true}
                  text="Welcome! This app helps you learn Finnish words in a fun and interactive way"
                />
              </div>
            </div>}

             
            {isLoading && <div className="embla-slide">
              <div className="embla-slide-inner">
                <Moose
                  hasBg={true}
                  text="Loading..."
                />
              </div>
            </div>}
        
          {slides.map((slide, index) => (
            <div className="embla-slide" key={index}>
              <div className="embla-slide-inner">
                <Moose hasBg={true} text={slide.text} />
                {slide.buttons && (
                  <div className="action-btns">
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

        <div className="embla-controls">
          <div className="embla-buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
          <div className="embla-dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={clsx(
                  "embla-dot",
                  index === selectedIndex &&  "embla-dot-selected",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
