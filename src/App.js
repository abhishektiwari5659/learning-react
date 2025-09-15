import ReactDOM from "react-dom/client";
import { Header } from "../components/Header";
import Body from "../components/Body";
import About from "../components/About";
import Error from "../components/Error";
import { Contact } from "../components/Contact";
import ResMenuPage from "../components/ResMenuPage"; // New page for menu
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurant/:id", element: <ResMenuPage /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
