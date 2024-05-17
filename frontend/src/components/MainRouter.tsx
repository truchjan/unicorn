import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "@/components/ErrorPage";
import AppNavbar from "@/components/AppNavbar";
import LinkList from "@/components/links/LinkList";
import LinkForm from "@/components/links/LinkForm";
import PreviewList from "@/components/preview/PreviewList";

export const PATH_ROOT = '/'
export const PATH_LINKS = '/links'
export const PATH_LINK_FORM = `${PATH_LINKS}/form`

const MainRouter = () => {
  const router = createBrowserRouter([
    {
      element: <AppNavbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH_ROOT,
          element: <PreviewList />
        },
        {
          path: PATH_LINKS,
          element: <LinkList />
        },
        {
          path: `${PATH_LINK_FORM}/:linkId?`,
          element: <LinkForm />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default MainRouter