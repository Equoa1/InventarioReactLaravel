
import {
  Navbar,
} from "@material-tailwind/react";

import {
  useMaterialTailwindController,
} from "@/context";

export function DashboardNavbar() {
  const [controller] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
 
  

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-200/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      
      
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
