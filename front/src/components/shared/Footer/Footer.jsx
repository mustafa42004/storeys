import Layout from "./Layout"
import Nav from "./Nav"
const Footer = () => {


  return (
    <>
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Layout />
                        <Nav />
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer