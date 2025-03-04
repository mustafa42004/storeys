import { NavLink } from "react-router-dom"

const Content = ({ title, paragraphs, highlight, smallTitle, buttons, signature }) => {
  console.log(buttons)
  return (
    <>
        <div className="content">
            {
              smallTitle && <h6 className="font-sm text-left fs-20 light ">{smallTitle}</h6>
            }

            <h4 className="font-lg mb-3 light lh-40 fs-36 text-left">{title}</h4>

            {paragraphs?.map((paragraph, index) => (
                <p key={index} className="font-sm text-left light">{paragraph}</p>
            ))}


            {highlight && <h6 className="font-sm text-left w-100 light lh-20 fw-600">{highlight}</h6>}
            {buttons && (
              <div className="flex-cs">
                {
                  buttons?.map((button, index) => (
                    <NavLink key={index} to={button.link} className="cs-btn cs-bg-dark br-0">{button.title}</NavLink>
                  ))
                }
              </div>
            )}
            {signature && (
              <div className="signature">
                <h6 className="font-lg light font-signatie fs-26">{signature.sign}</h6>
                <h6 className="font-sm text-left w-100 light lh-20 fw-600">{signature.designation}</h6>
              </div>
            )}
        </div>
    </>
  )
}

export default Content