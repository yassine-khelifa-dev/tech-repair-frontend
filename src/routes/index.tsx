import { Routes, Route } from "react-router-dom";

import { RepairRequestForm } from "../components/repair/RepairRequestForm";
import RepairRequestSuccess from "../pages/RepairRequestSuccess";
import { ROUTES } from "./ROUTES";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<RepairRequestForm />}
      />

      <Route
        path={ROUTES.REPAIR_REQUEST_SUCCESS}
        element={<RepairRequestSuccess />}
      />
    </Routes>
  );
}