
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import ActiveTasks from "./pages/ActiveTasks";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* All Tasks */}
          <Route path="/tasks" element={<AllTasks />} />

          <Route path="/tasks/active" element={<ActiveTasks />} />

          {/* Completed Tasks */}
          <Route path="/tasks/completed" element={<CompletedTasks />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
