import {
    Routes,
    Route
} from "react-router-dom";

import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                    }
            />

            <Route
                path="/chat/:companyId"
                element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/upload/:companyId"
                element={
                    <ProtectedRoute>
                        <Upload />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );
}


export default App;