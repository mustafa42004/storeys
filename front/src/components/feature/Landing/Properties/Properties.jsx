import { useEffect, useState } from "react";
import Heading from "../../../shared/Headings/Heading";
import Gallery from "./Gallery";
import { useQuery } from "@tanstack/react-query";
import PropertiesService from "./../../../../services/properties.service";

const Properties = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-properties", { isFeatured: true }],
    queryFn: PropertiesService.getProperties,
  });

  return (
    <>
      <section className="properties pt-cs">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Heading
                title="Featured Properties"
                className={`${isMobile ? "fs-42 w-80" : "w-60"}`}
                description=" Explore our handpicked selection of exceptional properties, each designed to inspire and elevate your lifestyle"
                descriptionClassName="medium fs-22"
              />

              {isLoading ? (
                <p className="text-center mt-5">Loading...</p>
              ) : (
                <div className="mt-5">
                  <Gallery data={data?.data?.docs} />
                </div>
              )}

              {isError ? (
                <p className="text-center mt-5">
                  Properties are not loaded. Something went wrong
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;
