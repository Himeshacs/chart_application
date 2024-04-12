import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import "./styles/styles.css";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <AppRoutes />
        </StyledEngineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
