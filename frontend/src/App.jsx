import {
    Routes,
    Route
} from "react-router-dom";

import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";


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
                element={<Dashboard />}
            />

            <Route
                path="/chat/:companyId"
                element={<Chat />}
            />

            <Route
                path="/upload/:companyId"
                element={<Upload />}
            />

        </Routes>

    );
}


export default App;