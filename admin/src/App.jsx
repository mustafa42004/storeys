import AllRoutes from "./config/AllRoutes";
import "../public/assets/css/responsive.css";
import Notification from "./component/shared/Notification";

const App = () => {
  return (
    <>
      <Notification />
      <AllRoutes />
    </>
  );
};

export default App;
