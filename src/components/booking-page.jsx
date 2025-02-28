import {useParams} from "react-router-dom";
import {CircleParkingIcon, CoffeeIcon, DropletIcon, MapPinIcon, StarIcon, WifiIcon} from "lucide-react";
import {useEffect} from "react";
import axios from "axios";

// Données de test pour un hôtel
const hotelData = {
    id: "1",
    name: "Hôtel de Luxe",
    location: "Paris, France",
    description: "Un hôtel magnifique avec une vue imprenable sur la ville.",
    price: 250,
    rating: 4.5,
    amenities: ["wifi", "restaurant", "pool", "parking"],
    image: "https://picsum.photos/800/600",
};
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function BookingPage() {
    const {id} = useParams();
    useEffect(() => {
        // Récupérer les données de l'hôtel en fonction de l'ID
        axios.get(`${apiUrl}/hotels/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    // Pour l'instant, nous utilisons des données de test.
    // Dans une application réelle, vous récupéreriez les données de l'hôtel en fonction de l'ID.
    const hotel = hotelData;

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={hotel.image} alt={hotel.name} className="w-full h-96 object-cover rounded-lg"/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
                    <p className="text-gray-500 mb-4">
                        <MapPinIcon className="inline-block w-5 h-5 mr-1"/>
                        {hotel.location}
                    </p>
                    <p className="text-gray-500 mb-4">{hotel.description}</p>
                    <div className="flex items-center mb-4">
                        <div
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium flex items-center">
                            <StarIcon className="h-4 w-4 mr-1"/>
                            {hotel.rating}
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        {hotel.amenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                                {amenity === "wifi" && <WifiIcon className="h-4 w-4 mr-1"/>}
                                {amenity === "restaurant" && <CoffeeIcon className="h-4 w-4 mr-1"/>}
                                {amenity === "pool" && <DropletIcon className="h-4 w-4 mr-1"/>}
                                {amenity === "parking" && <CircleParkingIcon className="h-4 w-4 mr-1"/>}
                                {amenity}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-500 mt-4 mb-4">Prix par nuit: {hotel.price}€</p>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Réserver
                    </button>
                </div>
            </div>
        </div>
    );
}
