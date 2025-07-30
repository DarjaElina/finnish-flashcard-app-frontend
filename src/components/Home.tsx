import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);


  console.log(selectedIndex)
  // const scrollTo = useCallback(
  //   (index: number) => {
  //     emblaApi?.scrollTo(index);
  //   },
  //   [emblaApi],
  // );

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollNext(emblaApi.canScrollNext());
    setCanScrollPrev(emblaApi.canScrollPrev());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="welcome-wrapper">
      <img src="/moose.png" alt="moose" className="moose-slide-img" />

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <h3>Welcome! </h3>
            <p>
              This app helps you learn Finnish words in a fun and interactive
              way{" "}
            </p>
          </div>
          <div className="embla__slide">
            <p>
              Did you know? In Finnish, <strong>“moose”</strong> is
              <strong>
                <em> hirvi</em>
              </strong>{" "}
            </p>
            <p>And it’s a great word to start your vocabulary deck with!</p>
            <p>
              {" "}
              Singular: <em>hirvi</em> — Plural: <em>hirvet</em>
            </p>
          </div>
          <div className="embla__slide">
            <h3>Let's get you started!</h3>
            <p>What do you want to do next?</p>
            <button className="form-button">Register</button>{" "}
            <button className="form-button">Log In</button>{" "}
            <button className="form-button">Try Demo</button>
          </div>
        </div>
      </div>

      <div className="embla-nav">
        <button onClick={scrollPrev} disabled={!canScrollPrev}>
          ⬅️
        </button>
        <button onClick={scrollNext} disabled={!canScrollNext}>
          ➡️
        </button>
      </div>
    </div>
  );
}
