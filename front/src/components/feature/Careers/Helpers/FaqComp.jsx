import { useState } from 'react';

const FaqComp = () => {
  const faqs = [
    {
      question: "What training do I get?",
      answer: "We provide full training for new brokers. This starts with a 3 day intensive online interactive course in our training room, conducted by one of our sales and leasing directors, which includes an induction and full CRM system training. You'll get taught all the processes, procedures and laws of Real Estate in Dubai. This is followed by training on prospects, listing properties, receiving leads, performing viewings, negotiating, filling in contracts, time management, marketing and working structure. Once the training is complete, you'll be allocated your specialist area where you will be working. Then moving forward, you'll receive continuous support from our 3 sales and leasing directors & our head of training on how to close deals and maximise your commission."
    },
    {
      question: "Who is my support network?",
      answer: "Storeys have 6 of the best sales and leasing directors in Dubai. They are here to support our brokers fully and are available 24/7. They help maximise our brokers' earning potential by transferring their skills and knowledge into every deal you close. Furthermore, we have a dedicated head of training manager to help you once you are on the floor, as well as a marketing manager for marketing training and an HR Manager for any support with your move to Dubai."
    }
  ];

  return (
    <div className="accordion" id="faqAccordion">
      {faqs.map((faq, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className={`accordion-button font-lg fs-20 ${index !== 0 ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`collapse${index}`}
            >
              {faq.question}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
            aria-labelledby={`heading${index}`}
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqComp;
