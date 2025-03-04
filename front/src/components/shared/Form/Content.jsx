
const Content = () => {
  return (
    <>
        <div className="form-content">
            <h4 className="font-lg light text-left lh-36 fs-36">List Your Property with Storeys Real Estate</h4>
            <h6 className="font-sm light text-left lh-24 fs-16 medium">At Storeys, we believe in adding as much value as possible when you agree to list your property for sale exclusively!</h6>
            <div className="grid-cs gap-30 w-80">
                <div>
                    <label htmlFor="First Name" className="font-sm mb-2 light">First Name</label>
                    <input type="text" className="w-100" placeholder="First Name" />
                </div>
                <div>
                    <label htmlFor="Last Name" className="font-sm mb-2 light">Last Name</label>
                    <input type="text" className="w-100" placeholder="Last Name" />
                </div>
            </div>
            <div className="grid-cs gap-30 w-80">
                <div>
                    <label htmlFor="Email Address" className="font-sm mb-2 light">Email Address</label>
                    <input type="text" className="w-100" placeholder="Email Address" />
                </div>
                <div>
                    <label htmlFor="Mobile Number" className="font-sm mb-2 light">Mobile Number</label>
                    <input type="text" className="w-100" placeholder="Mobile Number" />
                </div>
            </div>
            <div className="w-100">
                <label htmlFor="Description" className="font-sm mb-2 light">Description</label>
                <textarea name="Message" rows={5} id="Message" className="w-80" placeholder="Enter a Brief Description"></textarea>
            </div>
            <button className="cs-btn light">Submit</button>
        </div>
    </>
  )
}

export default Content