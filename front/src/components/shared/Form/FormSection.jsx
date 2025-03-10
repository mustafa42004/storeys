import Content from "./Content"
const FormSection = ({ heading }) => {
  return (
    <>
        <section className="form-section w-100 pt-cs">
            <img src="/assets/img/form-bg.svg" alt="form-bg"  />
            <Content heading={heading} />
        </section>
    </>
  )
}

export default FormSection