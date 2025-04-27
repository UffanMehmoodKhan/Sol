import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom'
import './index.css'
import routes from "./routes.jsx";


const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
    <>
        <RouterProvider router={router} />
    </>
)
