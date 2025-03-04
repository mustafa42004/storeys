const AboutComp = () => {

    const steps = [
        {
            title: "Step 1",
            isArray: true,
            data: [
                {
                    title: "Leasing",
                    description: "Contact our Leasing Directors, Danny & Poppy, for any leasing disputes by filling out the form."
                },
                {
                    title: "Sales",
                    description: "Contact our Sales Director, Rob, for any sales disputes by filling out the form."
                }
            ]
        },
        {
            title: "Step 2",
            isArray: false,
            description: "Our Department Director will try to resolve the issue as quickly as possible and will provide you with a detailed written response within five working days."
        },
        {
            title: "Step 3",
            isArray: false,
            description: "If you remain dissatisfied with the outcome of the investigation, you can refer your complaint to the relevant Government Department for further steps."
        }
    ]

  return (
    <> 
        <div className="section1 w-90">
            <div className="content">
                <h4 className="font-lg  text-left">Leave A Complaint</h4>
                <h6 className="font-lg  fs-18 text-left">How to leave a Complaint?</h6>
                <p className="font-sm text-left">White & Co aim to ensure that you receive the best customer service. However, if you are dissatisfied with the level of service you have received, we encourage you to speak to your representative agent, to resolve the matter.If you still wish to take the matter further, please follow the steps below:</p>
            </div>
            <div className="steps">
                {steps.map((step, index) => (
                    <div className={`step ${index < steps.length - 1 ? 'divide' : ''}`} key={index}>
                        <h4 className="font-sm  text-left">{step.title}</h4>
                        {step.isArray ? (
                            <div className="data" key={index}>
                                {step.data.map((data, dataIndex) => (
                                    <div key={dataIndex}>
                                        <h4 className="font-sm  text-left">{data.title}</h4>
                                        <p className="font-sm text-left">{data.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="data">
                                <p className="font-sm text-left">{step.description}</p>
                            </div>
                        )
                    }
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default AboutComp