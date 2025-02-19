import { Link, useNavigate } from 'react-router-dom';
// import ThemeToggle from '../ThemeToggle';
import Axios from 'axios'
import { toast } from '@/hooks/use-toast';
import Notification from './Notification';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/authSlice';
import { Profile } from './Profile';

Axios.defaults.withCredentials = true

const Navbar = () => {
    const isAuthenticated = useSelector((state: any) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLogout = async () => {
        await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
        dispatch(logout())
        toast({
            title: "Logged out successfully.",
        })
        navigate('/auth')
    }


    return (
        <nav className="w-full select-none border-gray-200 bg-slate-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    App<span className="text-blue-600 dark:text-blue-500">Logo</span>.
                </h1>

                <button
                    data-collapse-toggle="navbar-solid-bg"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-solid-bg"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

                        {isAuthenticated &&
                            <li>
                                <Notification />
                            </li>
                        }


                        {isAuthenticated &&
                            <li>
                                <Profile />
                            </li>
                        }

                        <li>
                            {!isAuthenticated ? (
                                <Link
                                    to="auth"
                                    className=''
                                >
                                    Login
                                </Link>
                            ) : (
                                <button onClick={handleLogout} className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Logout
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;