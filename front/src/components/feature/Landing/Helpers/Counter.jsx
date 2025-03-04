import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Counter = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true // This ensures the counter runs only once
  });

  return (
    <div className="counter" ref={ref}>
        <div className="item">
            <h2 className="font-lg font-sans text-left medium fs-70">
                {inView ? (
                    <CountUp end={80} duration={2.5} suffix="+" />
                ) : (
                    "0+"
                )}
            </h2>
            <h4 className="font-lg font-sans text-left medium">years of combined experience</h4>
        </div>
        <div className="item">
            <h2 className="font-lg font-sans text-left medium fs-70">
                {inView ? (
                    <CountUp end={93} duration={2.5} suffix="%" />
                ) : (
                    "0%"
                )}
            </h2>
            <h4 className="font-lg font-sans text-left medium">Unmatched expertise in Off-Plan investments</h4>
        </div>
        <div className="item">
            <h2 className="font-lg font-sans text-left medium fs-70">
                {inView ? (
                    <CountUp end={474} duration={2.5} />
                ) : (
                    "0"
                )}
            </h2>
            <h4 className="font-lg font-sans text-left medium">Comprehensive solutions for investors & property owners</h4>
        </div>
    </div>
  )
}

export default Counter