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
    // Split into words first, then split each word into letters
    return title
      ?.split(" ")
      .map((word) => ({
        letters: word.split(""),
        isSpace: false,
      }))
      .reduce((acc, word, i, arr) => {
        // Add space between words, except for the last word
        return i === arr.length - 1
          ? [...acc, word]
          : [...acc, word, { letters: ["\u00A0"], isSpace: true }];
      }, []);
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after it becomes visible
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
                        (wordIndex * word.letters.length + letterIndex) * 0.1
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
