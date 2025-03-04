import React, { useEffect, useRef, useState, useMemo } from 'react';

const Heading = ({title, className, width, description, descriptionClassName}) => {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const letters = useMemo(() => title?.split('').map(letter => letter === ' ' ? '\u00A0' : letter), [title]); // Preserve spaces

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
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
            <div className="headings" style={{width: `${width}%` || "100%"}}>
              <h4 className={`font-header ${className}`} ref={titleRef}>
                {letters?.map((letter, index) => (
                  <span key={index} className={`letter ${isVisible ? 'animate' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                    {letter}
                  </span>
                ))}
              </h4>
              {description && <p className={`font-sm ${descriptionClassName}`}>{description}</p>}
            </div>
        </div>
    </>
  )
}

export default Heading