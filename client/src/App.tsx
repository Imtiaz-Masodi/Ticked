import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "./components/Toast";
import { ToastProvider } from "./contexts/ToastContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <DeviceProvider>
      <DarkModeProvider>
        <ToastProvider>
          <BrowserRouter>
            <ToastContainer />
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </DarkModeProvider>
    </DeviceProvider>
  );
}

export default App;

/**
 * ToDos:
 * Frontend:
 * Add entity adapter
 * IMPLEMENT PWA
 * Should show error when api fails to fetch data
 *
 *  Update CategoryCard to use useToast instead of context methods - DONE
 * Dropdown popup getting overlapped in settings page - DONE
 * FAB should appear below the NavDrawer - DONE
 * update the error message UI for categories page - DONE
 * Reduce the toast size for mobile screens (Updated the UI) - DONE
 * Checklist actions buttons should be based on touch point detection not on screen width - DONE
 * Update the task status to inprogress when updating the checklist item - DONE
 * Render the tasks list when loading if tasks are available - DONE
 * In checklist item creation, when clicked enter it should focus on to creating a new task - DONE
 * Reuse the create task form in TaskViewer - DONE
 * Fix the tasks list scroll for wider screens - DONE
 * Prevent task editing for completed tasks - DONE
 * Make due date optional - DONE
 * Update the edit/delete (hover) functionality of checklist item - DONE
 * Show loading spinner when updating the checklist item - DONE
 * Add todo checked items in task creation page - DONE
 * Skeleton loading for userinfoheader and profile - DONE
 * Update no tasks UI when filters are applied - DONE
 * Add functionality to delete tasks - DONE
 * Page for viewing task by category - DONE
 * handle task item swipe by their status - DONE
 * Add filter in home page for tasks filtering - DONE
 * cleanup routes - DONE
 * Add profile page - DONE
 * Should not be able to go back to login page after login - DONE
 * Add update password functionality - DONE
 * Add forgot password functionality - DONE
 * update the bg of autocomplete selected item - DONE
 * Add link to verify the email in login page - DONE
 * Email templates are very fancy, make them simple - DONE
 * Unable to send emails except the owner email - DONE, integrated gmail smtp
 * In slow network when switching page, current page is staying until the navigating page loads - DONE
 * Add loading screen - DONE
 * Render the TaskViewer in same page in wider screens - DONE
 * Change the nodata image in tasks list for dark mode - DONE
 * Form labels should not be selectable - DONE
 * Page for editing category - DONE
 * Functionality to add category - DONE
 * Adjustment of tooltip arrow - DONE
 * Add Navigation Drawer in Home page (All Tasks, Categories, Backlogs, Settings, About Us, Logout) - DONE
 * Integrate api for moving tasks to completed, backlog - DONE
 * Page for viewing all tasks - DONE
 * Page for viewing backlog tasks - DONE
 * Page for viewing completed tasks - DONE
 * Page for viewing categories - DONE
 * Add Loading component for all pages when fetching data - DONE
 * Handling 403 error when user auth token is expired - DONE
 * Add notifications component - DONE
 *
 * Backend:
 * Add health check endpoint
 * When updating the password via forgot password, update the updated at property. 
 *
 * Store jwt secret in environment variable - DONE
 * Sending otp on email while registering user - DONE
 * Create endpoint for moving tasks to backlog and moving back to Progress - DONE
 * Create endpoint for listing all backlog tasks - DONE
 * Create endpoint for listing all completed tasks - DONE
 * Create endpoint for listing all tasks by category - DONE
 * Create endpoint for fetching metadata info for categories (total tasks, completed tasks, backlog tasks) - DONE
 */
