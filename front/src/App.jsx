import AllRoutes from "./config/AllRoutes";
import SmoothScrolling from "./animations/SmoothScroll";  

const App = () => {
  return (
    <SmoothScrolling>
      <AllRoutes />
    </SmoothScrolling>
  )
}

export default App