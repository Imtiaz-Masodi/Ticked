import { authHelper } from "../helpers/authHelper";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { Icons } from "../components/Icon/IconMap";
import { TasksList } from "../sections/TasksList";
import { TaskStatus } from "../utils/enums";
import { useTabletOrAboveDetect, useStatusTypeFilter } from "../hooks";
import { Suspense, lazy } from "react";
import { PageLoading } from "../components/Loader";

// Lazy load TaskViewer component
const TaskViewer = lazy(() => import("./TaskViewer"));

function Home() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId?: string }>();
  const location = useLocation();
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  // Handle statusType query parameter and update filters
  useStatusTypeFilter();

  // Check if we're on a larger screen (tablet and above)
  const isLargeScreen = useTabletOrAboveDetect();

  // Check if we're currently viewing a task (URL includes /task/:taskId)
  const isViewingTask = location.pathname.startsWith("/task/") && taskId;

  if (!isUserLoggedIn) return null;

  // On mobile, if viewing a task, show only the TaskViewer
  if (!isLargeScreen && isViewingTask) {
    return (
      <Suspense fallback={<PageLoading text="Loading task details..." />}>
        <TaskViewer />
      </Suspense>
    );
  }

  return (
    <div className="mx-0 md:mx-2 mt-2">
      <div className={`${isLargeScreen && isViewingTask ? "flex gap-0 max-w-screen-2xl mx-auto" : ""}`}>
        {/* Tasks List - takes half width on large screens when viewing a task */}
        <div className={`${isLargeScreen && isViewingTask ? "flex-1" : "w-full"}`}>
          <TasksList leftAction={TaskStatus.completed} rightAction={TaskStatus.backlog} />
        </div>

        {/* Task Viewer - only shown on large screens */}
        {isLargeScreen && isViewingTask && (
          <div className="flex-1">
            <Suspense fallback={<PageLoading text="Loading task details..." />}>
              <TaskViewer isInline={true} key={taskId} />
            </Suspense>
          </div>
        )}
      </div>

      {/* Floating Action Button - positioned relative to the tasks list */}
      {(!isViewingTask || !isLargeScreen) && (
        <FloatingActionButton icon={Icons.add} onClick={() => navigate("/task/new")} />
      )}
    </div>
  );
}

export default Home;
