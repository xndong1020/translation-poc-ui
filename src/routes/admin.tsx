// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import CalendarToday from "@material-ui/icons/CalendarToday";

import ProjectsList from "../views/ProjectsList";
import DashboardMain from "../views/Dashboard/Dashboard";
import ProjectItem from "../views/ProjectItem";
import TasksList from "../views/TasksList/TasksList";
import CreateTaskWizard from "../views/CreateTaskWizard/CreateTaskWizard";
import SearchResults from "../views/SearchResults/SearchResults";
import { Search } from "@material-ui/icons";

// routes for the sidebar
const adminRoutes = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardMain,
    layout: "/admin",
    showOnSidebar: false,
  },
  {
    path: "/projects",
    name: "Projects",
    rtlName: "لوحة القيادة",
    icon: Person,
    component: ProjectsList,
    layout: "/admin",
    showOnSidebar: false,
  },
  {
    exact: true,
    path: "/tasks",
    name: "Tasks",
    rtlName: "لوحة القيادة",
    icon: CalendarToday,
    component: TasksList,
    layout: "/admin",
    showOnSidebar: true,
  },
  {
    path: "/project/:id",
    name: "Project",
    rtlName: "لوحة القيادة",
    icon: Person,
    component: ProjectItem,
    layout: "/admin",
    showOnSidebar: false,
  },
  {
    path: "/tasks/create",
    name: "Create Task",
    rtlName: "لوحة القيادة",
    icon: CalendarToday,
    component: CreateTaskWizard,
    layout: "/admin",
    showOnSidebar: true,
  },
  {
    path: "/translation/search",
    name: "Search Translation",
    rtlName: "لوحة القيادة",
    icon: Search,
    component: SearchResults,
    layout: "/admin",
    showOnSidebar: true,
  },
];

export default adminRoutes;
