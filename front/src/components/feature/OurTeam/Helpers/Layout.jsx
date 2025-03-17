
import Heading from "../../../shared/Headings/Heading";
import Cards from "./Cards";

const Layout = () => {
  // const array = [1, 2, 3, 4, 5]

  return (
    <section className="pt-cs our-team">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* <p className="font-sm mb-4 fs-20 medium">Our Team</p> */}
            <Heading title="You're in safe hands" className="fs-50" />
            <div className="layout">
              {[
                {
                  image: "/assets/img/our-team-1.svg",
                  name: "Mohamed Ibrahim",
                  designation: "Founder & CEO",
                },
                {
                  image: "/assets/img/our-team-2.svg",
                  name: "Vinayak K",
                  designation: "Co-Founder",
                },
                {
                  image: "/assets/img/our-team-3.svg",
                  name: "Mohamed Sheleek",
                  designation: "Co-Founder",
                },
                {
                  image: "/assets/img/our-team-4.svg",
                  name: "Arun K",
                  designation: "Co-Founder",
                },
                {
                  image: "/assets/img/our-team-5.svg",
                  name: "Sreelakshmi",
                  designation: "Senior Sales Manager",
                },
                {
                  image: "/assets/img/our-team-6.svg",
                  name: "Amal Mohammed",
                  designation: "Senior Sales Manager",
                },
                {
                  image: "/assets/img/our-team-7.svg",
                  name: "Chandrakanth K A",
                  designation: "Senior Sales Manager",
                },
                {
                  image: "/assets/img/our-team-9.svg",
                  name: "Aswin Venu",
                  designation: "Senior Sales Manager",
                },
                {
                  image: "/assets/img/our-team-8.svg",
                  name: "Shahbaaz Ahamed",
                  designation: "Senior Sales Manager",
                },
                
              ].map((value, index) => (
                <Cards 
                  key={index}
                  image={value.image}
                  name={<span className="fs-16 font-bold">{value.name}</span>}
                  designation={<span className="fs-12 text-gray-500">{value.designation}</span>}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
