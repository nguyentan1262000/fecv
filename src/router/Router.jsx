import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout/Layout";
import Dashboard from "../page/Dashboard";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard/>
            },
            {
                path: "candidate",
                element: <Dashboard/>
            },
            {
                path: "cv",
                element: <Dashboard/>
            }
        ]
    },
    {
        path: "/admin/",
        element: <Dashboard/>
    }
])

export default Router;