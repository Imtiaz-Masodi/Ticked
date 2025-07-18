import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import { RootContainer } from "./sections/RootContainer";
import NotFound from "./pages/NotFound";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Categories = lazy(() => import("./pages/Categories"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
          }
        />

        <Route element={<RootContainer />}>
          <Route path="/" index element={<Home />} />

          <Route
            path="/task/new"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CreateTask />
              </Suspense>
            }
          />

          <Route
            path="/categories"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Categories />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
