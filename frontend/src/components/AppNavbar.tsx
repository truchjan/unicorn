import { Link, Outlet } from "react-router-dom"
import { PATH_ROOT, PATH_LINKS } from "@/components/MainRouter"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const AppNavbar = () => {

  return (
      <div>

        <div className="fixed w-full top-0 bg-gradient-to-r from-indigo-200 to-purple-300 h-16 flex items-center justify-end">

          <div className="mr-8">
            <Link to={PATH_ROOT} className="text-lg no-underline text-black rounded-lg hover:bg-black hover:text-white py-3 px-4">
              Preview
            </Link>

            <Link to={PATH_LINKS} className="text-lg no-underline text-black rounded-lg hover:bg-black hover:text-white py-3 px-4">
              Link Administration
            </Link>
          </div>

        </div>

        <div className="mt-20">
          <Outlet />
        </div>
        <ToastContainer autoClose={2000} />
      </div>
  )
}

export default AppNavbar
