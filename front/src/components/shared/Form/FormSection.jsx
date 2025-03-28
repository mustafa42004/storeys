import Content from "./Content"
const FormSection = ({ heading }) => {
  return (
    <>
        <section className="form-section w-100">
            <img src="../assets/img/form-bg.png" alt="form-bg" className="form-bg" />
            <div className="container">
              <div className="row gap-60">
                <div className="col-lg-6">
                  <img className="w-100 form-img" src="../assets/img/form-bg.png" alt="form-img" />
                </div>
                <div className="col-lg-6">
                  <Content heading={heading} />
                </div>
              </div>
            </div>
        </section>
    </>
  )
}

export default FormSection