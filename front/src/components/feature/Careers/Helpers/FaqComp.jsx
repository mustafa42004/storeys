import { useState } from 'react';

const FaqComp = () => {
  const questions = [
    "What training do I get?",
    "How does the commission structure work?",
    "Who is my support network?",
    "What are the incentives?"
  ];

  return (
    <div className="accordion" id="faqAccordion">
        {questions.map((question, index) => (
            <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                    className="accordion-button font-lg fs-20"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                    >
                    {question}
                    </button>
                </h2>
                <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqAccordion"
                >
                    <div className="accordion-body">
                    {/* You can add the answer here */}
                    Answer to {question}
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default FaqComp;