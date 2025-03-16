import AllRoutes from "./config/AllRoutes";
import SmoothScrolling from "./animations/SmoothScroll";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Notification from "./components/static_components/Notification";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Notification />
      <SmoothScrolling>
        <AllRoutes />
      </SmoothScrolling>
    </QueryClientProvider>
  );
};

export default App;
