import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RootContainer } from "./sections/RootContainer";
import { PageLoading } from "./components/Loader";
import { AUTH_ROUTES, APP_ROUTES, TASK_ROUTES } from "./utils/routes";

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

function AppRoutes() {
  return (
    <Routes>
      {/* /login */}
      <Route
        path={AUTH_ROUTES.LOGIN}
        element={
          <Suspense fallback={<PageLoading text="Loading Login Page..." />}>
            <Login />
          </Suspense>
        }
      />

      {/* /register */}
      <Route
        path={AUTH_ROUTES.REGISTER}
        element={
          <Suspense fallback={<PageLoading text="Loading Signup Page..." />}>
            <Register />
          </Suspense>
        }
      />

      {/* /verify-email */}
      <Route
        path={AUTH_ROUTES.VERIFY_EMAIL}
        element={
          <Suspense fallback={<PageLoading text="Loading Verification Page..." />}>
            <VerifyEmail />
          </Suspense>
        }
      />

      {/* /forgot-password */}
      <Route
        path={AUTH_ROUTES.FORGOT_PASSWORD}
        element={
          <Suspense fallback={<PageLoading text="Loading Forgot Password Page..." />}>
            <ForgotPassword />
          </Suspense>
        }
      />

      <Route element={<RootContainer />}>
        {/* / */}
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
        {/* /tasks/:statusType */}
        <Route
          path={TASK_ROUTES.TASKS_BY_STATUS}
          element={
            <Suspense fallback={<PageLoading text="Loading tasks..." />}>
              <TasksListing />
            </Suspense>
          }
        />

        {/* Task viewing routes - same Home component for responsive behavior */}
        {/* /task/:taskId */}
        <Route path={TASK_ROUTES.TASK_VIEW} element={<TasksListing />} />

        {/* /task/new */}
        <Route
          path={TASK_ROUTES.TASK_NEW}
          element={
            <Suspense fallback={<PageLoading text="Loading Tasks..." />}>
              <CreateTask />
            </Suspense>
          }
        />

        {/* /categories */}
        <Route
          path={APP_ROUTES.CATEGORIES}
          element={
            <Suspense fallback={<PageLoading text="Loading Categories..." />}>
              <Categories />
            </Suspense>
          }
        />

        {/* /settings */}
        <Route
          path={APP_ROUTES.SETTINGS}
          element={
            <Suspense fallback={<PageLoading text="Loading Settings..." />}>
              <Settings />
            </Suspense>
          }
        />

        {/* /profile */}
        <Route
          path={APP_ROUTES.PROFILE}
          element={
            <Suspense fallback={<PageLoading text="Loading Profile..." />}>
              <Profile />
            </Suspense>
          }
        />
      </Route>

      {/* * (catch-all for 404) */}
      <Route
        path={APP_ROUTES.NOT_FOUND}
        element={
          <Suspense fallback={<PageLoading text="Loading..." />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
