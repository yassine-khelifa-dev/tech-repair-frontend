import { BrowserRouter, Routes, Route } from "react-router-dom";
import RepairRequest from "../pages/RepairRequestPage";
import App from "../App";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                path="/" 
                element={<App />} />

                <Route
                    path="/repair-request"
                    element={<RepairRequest />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;