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
            <div className="item">
                <h4 className="font-lg font-sans light  medium fs-70">
                    {inView ? (
                        <CountUp end={100} duration={2.5} suffix="+" />
                    ) : (
                        "0+"
                    )}
                </h4>
                <h6 className="font-lg font-sans  medium light">Property experts here to help</h6>
            </div>
            <div className="item">
                <h4 className="font-lg font-sans light  medium fs-70">
                    {inView ? (
                        <CountUp 
                            start={1.0} 
                            end={4.9} 
                            duration={2.5} 
                            suffix="/5" 
                            decimals={1} 
                            onEnd={() => {}} 
                        />
                    ) : (
                        "0"
                    )}
                </h4>
                <h6 className="font-lg font-sans  medium light">Google rating from 60 Reviews</h6>
            </div>
            <div className="item">
                <h4 className="font-lg font-sans light  medium fs-70">
                    {inView ? (
                        <CountUp end={350} duration={2.5} suffix="+" />
                    ) : (
                        "0"
                    )}
                </h4>
                <h6 className="font-lg font-sans  medium light">property transactions in 2024</h6>
            </div>
        </div>
    </>
  )
}

export default Counter