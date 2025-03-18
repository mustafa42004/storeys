import Heading from "../../../shared/Headings/Heading";
import Cards from "./Cards";
import { useQuery } from "@tanstack/react-query";
import TeamsService from "../../../../services/teams.service";

const Layout = () => {
  // const array = [1, 2, 3, 4, 5]
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams"],
    queryFn: TeamsService.getTeams,
    select: (data) => data?.data?.docs,
  });

  return (
    <section className="pt-cs our-team">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* <p className="font-sm mb-4 fs-20 medium">Our Team</p> */}
            <Heading title="You're in safe hands" className="fs-50" />
            <div className="layout">
              {isLoading && <p className="text-center">Loading...</p>}
              {isError && (
                <p className="text-center">
                  Team details not loaded. Something went wrong
                </p>
              )}
              {data?.length &&
                data?.map((value, index) => (
                  <Cards
                    key={index}
                    image={value.image}
                    name={<span className="fs-16 font-bold">{value.name}</span>}
                    designation={
                      <span className="fs-12 text-gray-500">
                        {value.designation}
                      </span>
                    }
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
