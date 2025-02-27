import { useParams } from "react-router-dom";
export default function BookingPage() {

    const { id } = useParams();
    console.log(id);
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src="https://picsum.photos/800/600" alt="hotel" className="w-full h-96 object-cover rounded-lg" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">Nom de l'hôtel</h1>
                    <p className="text-gray-500 mb-4">Adresse de l'hôtel</p>
                    <p className="text-gray-500 mb-4">Description de l'hôtel</p>
                    <p className="text-gray-500 mb-4">Prix par nuit: 100€</p>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Réserver</button>
                </div>
            </div>
        </div>
    )

}