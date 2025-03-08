const AboutComp = () => {

    const steps = [
        {
            title: "Step 1",
            isArray: true,
            data: [
                {
                    title: "Contact Us Directly",
                    description: "Reach out to us via email to share the details of your complaint. Our customer service team is available to listen, understand, and assist you with the resolution. Email: care@storeys.ae"
                },
            ]
        },
        {
            title: "Step 2",
            isArray: true, 
            data: [
                {
                    title: "Provide Details",
                    description: "Please provide as much information as possible to help us understand the issue. This may include your contact details, transaction information, and a clear description of the problem."
                },
            ]
        },
        {
            title: "Step 3",
            isArray: true,
            data: [
                {
                    title: "Investigation and Resolution",
                    description: "Once we receive your complaint, we will review the details, investigate the matter, and take appropriate action. We will strive to resolve the issue in a timely and fair manner."
                },
            ]
        },
        {
            title: "Step 4",
            isArray: true,
            data: [
                {
                    title: "Follow-Up",
                    description: "After the investigation, we will provide you with a response and update you on the steps taken to address the complaint. If necessary, we may offer a solution or take corrective action to ensure this does not happen again."
                },
            ]
        }
    ]

  return (
    <> 
        <div className="section1 w-90">
            <div className="content">
                <h4 className="font-lg  text-left">Leave A Complaint</h4>
                <h6 className="font-lg  fs-18 text-left">How to leave a Complaint?</h6>
                <p className="font-sm text-left">At Storeys Real Estate, we are committed to delivering exceptional service and ensuring a positive experience for all our clients and partners. However, we understand that sometimes things don’t go as planned, and we value your feedback. If you are dissatisfied with any aspect of our service, we encourage you to share your concerns with us so we can resolve the issue promptly and improve our processes.To make a complaint, please follow the</p>
            </div>
            <div className="steps">
            <h4 className="font-lg  text-left">Below Steps:</h4>
                {steps.map((step, index) => (
                    <div className={`step ${index < steps.length - 1 ? 'divide' : ''}`} key={index}>
                        <h4 className="font-sm  text-left">{step.title}</h4>
                        {step.isArray ? (
                            <div className="data" key={index}>
                                {step.data.map((data, dataIndex) => (
                                    <div key={dataIndex}>
                                        <h4 className="font-sm  text-left">{data.title}</h4>
                                        <p className="font-sm fs-16 text-left">{data.description}</p>
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
            <p className="font-sm text-left">We take all complaints seriously and are dedicated to resolving issues to your satisfaction. Your feedback helps us improve our services and continue providing the best experience possible. Thank you for giving us the opportunity to make things right.</p>
        </div>
    </>
  )
}

export default AboutComp