import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout/Layout";
import Dashboard from "../page/Dashboard";
import SignIn from "../component/layout/SignIn";
import FormSignIn from "../form/FormSignIn";
import VerifyOTP from "../form/VerifyOTP";
import PageAccount from "../page/PageAccount";
import PageError from "../page/PageError";
import AddNewAccount from "../page/AddNewAccount";

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
                path: "account",
                children: [
                    {
                        path:"list",
                        element: <PageAccount/>
                    },
                    {
                        path:"new",
                        element: <AddNewAccount/>
                    }
                ]
            }
            ,
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
    },
    {
        path: "/login",
        element: <SignIn/>,
        children:[
            {
                path: "signin",
                element: <FormSignIn/>
            },
            {
                path: "veryfy-otp",
                element: <VerifyOTP/>
            }
        ]
    },
    {
        path: "*",
        element: <PageError/>
    }
])

export default Router;