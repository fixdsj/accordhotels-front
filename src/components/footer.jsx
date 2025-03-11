import {ArrowUpIcon} from "lucide-react";
import {useAuth} from "../hooks/useAuth.js";


export default function Footer() {
    const user = useAuth();

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Akkor Hotel</h3>
                        <p className="text-gray-300">La meilleure expérience pour réserver votre hôtel partout dans le
                            monde.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-white">
                                    Recherche d'hôtels
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Comment ça marche
                                </a>
                            </li>
                            {user ? (
                                <li>
                                <a href="/account" className="text-gray-300 hover:text-white">
                                    Mon compte
                                </a>
                                </li>
                            ) : (
                                <>
                                <li>
                                <a href="/login" className="text-gray-300 hover:text-white">
                                    Se connecter
                                </a>
                                </li>
                                <li>
                                <a href="/register" className="text-gray-300 hover:text-white">
                                    S'inscrire
                                </a>
                                </li>
                                </>
                            )}

                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    A venir...
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <a href="#" className="text-gray-300 hover:text-white">
                            <ArrowUpIcon className="h-5 w-5 inline-block mr-1"/>
                            Retour en haut
                        </a>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Akkor Hotel Ltd. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )

}