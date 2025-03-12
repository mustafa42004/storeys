import React, { useEffect, useRef, useState, useMemo } from "react";

const Heading = ({
  title,
  className,
  width,
  description,
  descriptionClassName,
}) => {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const letters = useMemo(() => {
    let totalDelay = 0; // Track total delay for sequential animation
    return title
      ?.split(" ")
      .map((word) => ({
        letters: word.split(""),
        isSpace: false,
        startDelay: totalDelay, // Store starting delay for this word
        get endDelay() {
          // Calculate end delay after this word
          totalDelay += this.letters.length;
          return totalDelay;
        },
      }))
      .reduce((acc, word, i, arr) => {
        // Add space between words, except for the last word
        return i === arr.length - 1
          ? [...acc, word]
          : [
              ...acc,
              word,
              {
                letters: ["\u00A0"],
                isSpace: true,
                startDelay: word.endDelay,
                endDelay: word.endDelay + 1,
              },
            ];
      }, []);
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="headings">
        <div className="headings" style={{ width: `${width}%` || "100%" }}>
          <h4 className={`font-header ${className}`} ref={titleRef}>
            {letters?.map((word, wordIndex) => (
              <span key={wordIndex} style={{ display: "inline-block" }}>
                {word.letters.map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className={`letter ${isVisible ? "animate" : ""}`}
                    style={{
                      animationDelay: `${
                        (word.startDelay + letterIndex) * 0.1
                      }s`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h4>
          {description && (
            <p className={`font-sm ${descriptionClassName}`}>{description}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Heading;
