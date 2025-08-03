import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootContainer } from "./sections/RootContainer";
import { ToastContainer } from "./components/Toast";
import { ToastProvider } from "./contexts/ToastContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { PageLoading } from "./components/Loader";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Categories = lazy(() => import("./pages/Categories"));
const Backlog = lazy(() => import("./pages/Backlog"));
const Completed = lazy(() => import("./pages/Completed"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<PageLoading text="Loading Login Page..." />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="/register"
              element={
                <Suspense fallback={<PageLoading text="Loading Signup Page..." />}>
                  <Register />
                </Suspense>
              }
            />

            <Route element={<RootContainer />}>
              <Route
                path="/"
                index
                element={
                  <Suspense fallback={<PageLoading text="Loading home page..." />}>
                    <Home />
                  </Suspense>
                }
              />

              {/* Task viewing routes - same Home component for responsive behavior */}
              <Route path="/task/:taskId" element={<Home />} />

              <Route
                path="/task/new"
                element={
                  <Suspense fallback={<PageLoading text="Loading Tasks..." />}>
                    <CreateTask />
                  </Suspense>
                }
              />

              <Route
                path="/categories"
                element={
                  <Suspense fallback={<PageLoading text="Loading Categories..." />}>
                    <Categories />
                  </Suspense>
                }
              />

              <Route
                path="/backlogs"
                element={
                  <Suspense fallback={<PageLoading text="Loading Backlogs..." />}>
                    <Backlog />
                  </Suspense>
                }
              />

              <Route
                path="/completed"
                element={
                  <Suspense fallback={<PageLoading text="Loading Completed Tasks..." />}>
                    <Completed />
                  </Suspense>
                }
              />

              <Route
                path="/settings"
                element={
                  <Suspense fallback={<PageLoading text="Loading Settings..." />}>
                    <Settings />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoading text="Loading..." />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;
