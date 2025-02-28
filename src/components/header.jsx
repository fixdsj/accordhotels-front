import {useAuth} from "../context/AuthContext.jsx";
import {LogOutIcon} from "lucide-react";

export default function Header() {
    const {user, logout} = useAuth();
    const logOut = () => {
        // Call the logout function from the context
        logout();
    }
    return (
        <header className="bg-white shadow">
            <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 cursor-pointer"
                    onClick={() => window.location.href = "/"}>Akkor Hotel</h1>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-gray-700">Espace employé</button>
                    <button className="text-gray-500 hover:text-gray-700">Administration</button>
                    {user ? (
                        <>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ">Mon
                                compte
                            </button>
                            <LogOutIcon className="h-5 w-5 text-indigo-600 cursor-pointer" onClick={logOut}/>
                        </>
                    ) : (
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                onClick={() => window.location.href = "/login"}>Connexion</button>
                    )}
                </div>
            </div>
        </header>
    )
}