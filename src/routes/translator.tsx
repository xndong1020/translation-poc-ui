// @material-ui/icons
import Person from "@material-ui/icons/Person";
import CalendarToday from "@material-ui/icons/CalendarToday";

import TasksList from "../views/TasksList/TasksList";
import TaskItem from "../views/TaskItem/TaskItem";

// routes for the sidebar
const translatorRoutes = [
  {
    exact: true,
    path: "/tasks",
    name: "My Tasks",
    rtlName: "لوحة القيادة",
    icon: CalendarToday,
    component: TasksList,
    layout: "/translator",
    showOnSidebar: true,
  },
  {
    path: "/tasks/:id",
    name: "Task",
    rtlName: "لوحة القيادة",
    icon: Person,
    component: TaskItem,
    layout: "/translator",
    showOnSidebar: false,
  },
];

export default translatorRoutes;
