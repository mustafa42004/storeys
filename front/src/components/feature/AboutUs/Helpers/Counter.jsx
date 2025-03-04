import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Counter = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <>
        <div className="counter" ref={ref}>
            <div className="item ">
                <h4 className="font-lg font-sans light  medium fs-70">
                    {inView ? (
                        <CountUp end={20} duration={2.5} suffix="+" />
                    ) : (
                        "0+"
                    )}
                </h4>
                <h6 className="font-lg font-sans  medium light">Years of combined market experience</h6>
            </div>

            <div className="item">
                <h4 className="font-lg font-sans light  medium fs-70">
                    {inView ? (
                        <CountUp end={93} duration={2.5} suffix="%" />
                    ) : (
                        "0%"
                    )}
                </h4>
                <h6 className="font-lg font-sans  medium light">Unmatched expertise in Off-Plan investments</h6>
            </div>

            <div className="item">
                <h4 className="font-lg font-sans light  medium fs-70">
                    {inView ? (
                        <CountUp end={23} duration={2.5} />
                    ) : (
                        "0"
                    )}
                </h4>
                <h6 className="font-lg font-sans  medium light">Comprehensive solutions for investors & property owners</h6>
            </div>
        </div>
    </>
  )
}

export default Counter