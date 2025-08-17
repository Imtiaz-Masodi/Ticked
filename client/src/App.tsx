import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootContainer } from "./sections/RootContainer";
import { ToastContainer } from "./components/Toast";
import { ToastProvider } from "./contexts/ToastContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { PageLoading } from "./components/Loader";
import { AUTH_ROUTES, APP_ROUTES, TASK_ROUTES } from "./utils/routes";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const TasksListing = lazy(() => import("./pages/TasksListing"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Categories = lazy(() => import("./pages/Categories"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route
              path={AUTH_ROUTES.LOGIN}
              element={
                <Suspense fallback={<PageLoading text="Loading Login Page..." />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path={AUTH_ROUTES.REGISTER}
              element={
                <Suspense fallback={<PageLoading text="Loading Signup Page..." />}>
                  <Register />
                </Suspense>
              }
            />

            <Route
              path={AUTH_ROUTES.VERIFY_EMAIL}
              element={
                <Suspense fallback={<PageLoading text="Loading Verification Page..." />}>
                  <VerifyEmail />
                </Suspense>
              }
            />

            <Route
              path={AUTH_ROUTES.FORGOT_PASSWORD}
              element={
                <Suspense fallback={<PageLoading text="Loading Forgot Password Page..." />}>
                  <ForgotPassword />
                </Suspense>
              }
            />

            <Route element={<RootContainer />}>
              <Route
                path={APP_ROUTES.HOME}
                index
                element={
                  <Suspense fallback={<PageLoading text="Loading home page..." />}>
                    <Home />
                  </Suspense>
                }
              />

              {/* Tasks route with status filtering */}
              <Route
                path={TASK_ROUTES.TASKS_BY_STATUS}
                element={
                  <Suspense fallback={<PageLoading text="Loading tasks..." />}>
                    <TasksListing />
                  </Suspense>
                }
              />

              {/* Task viewing routes - same Home component for responsive behavior */}
              <Route path={TASK_ROUTES.TASK_VIEW} element={<TasksListing />} />

              <Route
                path={TASK_ROUTES.TASK_NEW}
                element={
                  <Suspense fallback={<PageLoading text="Loading Tasks..." />}>
                    <CreateTask />
                  </Suspense>
                }
              />

              <Route
                path={APP_ROUTES.CATEGORIES}
                element={
                  <Suspense fallback={<PageLoading text="Loading Categories..." />}>
                    <Categories />
                  </Suspense>
                }
              />

              <Route
                path={APP_ROUTES.SETTINGS}
                element={
                  <Suspense fallback={<PageLoading text="Loading Settings..." />}>
                    <Settings />
                  </Suspense>
                }
              />

              <Route
                path={APP_ROUTES.PROFILE}
                element={
                  <Suspense fallback={<PageLoading text="Loading Profile..." />}>
                    <Profile />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path={APP_ROUTES.NOT_FOUND}
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
