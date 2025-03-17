import { NavLink } from "react-router-dom";

const Content = ({
  title,
  paragraphs,
  highlight,
  smallTitle,
  buttons,
  signature,
}) => {
  console.log(buttons);
  return (
    <>
      <div className="content">
        {smallTitle && (
          <h6 className="font-sm text-left fs-20 light  ">{smallTitle}</h6>
        )}

        <h4 className="font-lg mb-3 light lh-40 fs-36 text-left">{title}</h4>

        {paragraphs?.map((paragraph, index) => (
          <p key={index} className="font-sm text-left light">
            {paragraph}
          </p>
        ))}

        {highlight && (
          <h6 className="font-sm text-left w-100 light lh-20 fw-600">
            {highlight}
          </h6>
        )}
        {buttons && (
          <div className="flex-cs">
            {buttons?.map((button, index) => (
              <NavLink
                key={index}
                to={button.link}
                className="cs-btn cs-bg-dark br-0"
                {...(button.link === "#modal"
                  ? {
                      "data-bs-toggle": "modal",
                      "data-bs-target": "#staticBackdrop",
                    }
                  : {})}
              >
                {button.title}
              </NavLink>
            ))}
          </div>
        )}
        {signature && (
          <div className="signature">
            <h6 className="font-lg light font-signatie fs-26">
              {signature.sign}
            </h6>
            <h6 className="font-sm text-left w-100 light lh-20 fw-600">
              {signature.designation}
            </h6>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
