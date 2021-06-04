import Dashboard from "views/Dashboard.js";
import UserProfile from "views/Profile";
import Orders from "views/Orders";
import Users from "views/Users";
import Price from "views/Price";
import Plans from "views/Plans";
import NewDestination from "pages/NewDestination";
import PlanDetail from "pages/PlanDetail";
import EditCity from "pages/EditCity";
import EditPlan from "pages/EditPlan";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-briefcase-24",
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/price",
    name: "Price",
    icon: "nc-icon nc-money-coins",
    component: Price,
    layout: "/admin",
  },
  {
    path: "/plans",
    name: "Plans",
    icon: "nc-icon nc-bus-front-12",
    component: Plans,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-10",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: UserProfile,
    layout: "/admin",
  },
];
export const adminRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/orders",
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/price",
    component: Price,
    layout: "/admin",
  },
  {
    path: "/plans",
    component: Plans,
    layout: "/admin",
  },
  {
    path: "/plans/new",
    component: NewDestination,
    layout: "/admin",
  },
  {
    path: "/plans/:plan",
    component: PlanDetail,
    layout: "/admin",
  },
  {
    path: "/plans/edit/:plan",
    component: EditPlan,
    layout: "/admin",
  },
  {
    path: "/plans/:plan/:city",
    component: EditCity,
    layout: "/admin",
  },
  {
    path: "/users",
    component: Users,
    layout: "/admin",
  },

  {
    path: "/profile",
    component: UserProfile,
    layout: "/admin",
  },
];
export default routes;
