export default function Footer() {
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
                                <a href="#" className="text-gray-300 hover:text-white">
                                    À propos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Comment ça marche
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Destinations populaires
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Offres spéciales
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Centre d aide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Nous contacter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Politique d annulation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-300 mb-2">Inscrivez-vous pour recevoir nos meilleures offres</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                S inscrire
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Akkor Hotel Ltd. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )

}