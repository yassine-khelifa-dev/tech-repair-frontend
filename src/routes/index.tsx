import { Routes, Route } from "react-router-dom";

import { RepairRequestForm } from "../components/repair/RepairRequestForm";
import RepairRequestSuccess from "../pages/RepairRequestSuccess";
import { ROUTES } from "./ROUTES";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route
        path={ROUTES.REPAIR_REQUEST_CREATE}
        element={<RepairRequestForm />}
      />
      <Route
        path={ROUTES.REPAIR_REQUEST_SUCCESS}
        element={<RepairRequestSuccess />}
      />
    </Routes>
  );
}
