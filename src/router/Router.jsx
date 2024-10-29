import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout/Layout";
import Dashboard from "../page/Dashboard";
import SignIn from "../component/layout/SignIn";
import FormSignIn from "../form/FormSignIn";
import VerifyOTP from "../form/VerifyOTP";
import PageAccount from "../page/PageAccount";
import PageError from "../page/PageError";
import AddNewAccount from "../form/AddNewAccount";
import UpdateAccount from "../form/UpdateAccount";
import PageCandidate from "../page/PageCandidate";
import FormCreateCandidate from "../form/FormCreateCandidate";
import PageCvs from "../page/PageCv";
import FormCreateCv from "../form/FormCreateCv";
import PageGroups from "../page/PageGroup";
import FormCreateGroup from "../form/FormCreateGroup";
import PageCompany from "../page/PageCompany";
import FormCreateCompany from "../form/FormCreateCompany";
import PageJob from "../page/PageJob";
import FormCreateJob from "../form/FormCreateJob";
import Profile from "../page/Profile";
import UpdateCandidate from "../form/UpdateCandidate";
import DetailCandidate from "../page/DetailCandidate";
import DetailCv from "../page/DetailCv";
import DetailGroup from "../page/DetailGroup";
import UpdateCv from "../form/UpdateCv";
import PageEmailServices from "../page/PageEmailServices";

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
                    },
                    {
                        path:"update/:id",
                        element: <UpdateAccount/>
                    },
                    {
                        path: "profile",
                        element: <Profile/>
                    }
                ]
            }
            ,
            {
                path: "candidate",
                children: [
                    {
                        path: "",
                        element: <PageCandidate/>
                    },
                    {
                        path: "new",
                        element: <FormCreateCandidate/>
                    },
                    {
                        path: "update/:id",
                        element: <UpdateCandidate/>
                    },
                    {
                        path: ":id",
                        element: <DetailCandidate/>
                    }
                ]
            },
            {
                path: "cv",
                children: [
                    {
                        path: "",
                        element: <PageCvs/>
                    },
                    {
                        path: "new",
                        element: <FormCreateCv/>
                    },
                    {
                        path: "update/:id",
                        element: <UpdateCv/>
                    },
                    {
                        path: ":id",
                        element: <DetailCv/>
                    }
                ]
            },
            {
                path: "group",
                children: [
                    {
                        path: "",
                        element: <PageGroups/>
                    },
                    {
                        path: "new",
                        element: <FormCreateGroup/>
                    },
                    {
                        path: "update/:id",
                        element: <FormCreateCandidate/>
                    },
                    {
                        path: ":id",
                        element: <DetailGroup/>
                    }
                ]
            },
            {
                path: "job",
                children: [
                    {
                        path: "",
                        element: <PageJob/>
                    },
                    {
                        path: "new",
                        element: <FormCreateJob/>
                    },
                    {
                        path: "update/:id",
                        element: <FormCreateCandidate/>
                    }
                ]
            },
            {
                path: "company",
                children: [
                    {
                        path: "",
                        element: <PageCompany/>
                    },
                    {
                        path: "new",
                        element: <FormCreateCompany/>
                    },
                    {
                        path: "update/:id",
                        element: <FormCreateCandidate/>
                    }
                ]
            },
            {
                path: "interview",
                children: [
                    {
                        path: "",
                        element: <PageCandidate/>
                    },
                    {
                        path: "new",
                        element: <FormCreateCandidate/>
                    },
                    {
                        path: "update/:id",
                        element: <FormCreateCandidate/>
                    }
                ]
            },
            {
                path: "services",
                children: [
                    {
                        path: "",
                        element: <PageEmailServices/>
                    }
                ]
            },
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
                path: "",
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