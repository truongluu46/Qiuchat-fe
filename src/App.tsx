import { BrowserRouter, Route, Routes } from "react-router";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*  public routes */}
          <Route path="/signin" element={<SignInPage />} />

          <Route path="/signup" element={<SignUpPage />} />
          {/* protected routes */}
          <Route path="/" element={<ChatAppPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
