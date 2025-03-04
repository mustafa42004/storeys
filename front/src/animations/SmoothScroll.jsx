import PropTypes from 'prop-types';
import { ReactLenis } from '@studio-freight/react-lenis';

function SmoothScrolling({ children }) {


  return (
    <>
      <ReactLenis
          root
          options={{
            lerp: 0.1, // Adjusted smoothness for better scrolling experience
            duration: 1.0, // Smoother scroll
            smoothTouch: true, // Enables smooth scrolling on touch devices
            scrollDisabled: false, // Allows scrolling (set to true to disable)
            // syncTouch: true // Uncomment if you want to sync touch events
          }}
        >
          {children || <div>No content available</div>}
        </ReactLenis>
    </>
  );
}

SmoothScrolling.propTypes = {
  children: PropTypes.node.isRequired
};

export default SmoothScrolling;
