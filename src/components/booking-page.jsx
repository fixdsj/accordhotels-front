import {useParams} from "react-router-dom";
import {CircleParkingIcon, CoffeeIcon, DropletIcon, LoaderCircleIcon, MapPinIcon, WifiIcon} from "lucide-react";
import {StarIcon as SolidStarIcon} from '@heroicons/react/24/solid'
import {StarIcon as OutlineStarIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function BookingPage() {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        // Récupérer les données de l'hôtel en fonction de l'ID
        axios.get(`${apiUrl}/hotels/search`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {id}
        })
            .then((response) => {
                const hotelData = response.data[0];

                // Convertir amenities en tableau
                if (hotelData.amenities) {
                    hotelData.amenities = hotelData.amenities.split(',').map(amenity => amenity.trim());
                }

                setHotel(hotelData);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <LoaderCircleIcon className={"animate-spin h-10 w-10 mx-auto"}/>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-center text-2xl">Hôtel non trouvé.</p>
            </div>
        )
    }

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={hotel.picture} alt={hotel.name} className="w-full h-96 object-cover rounded-lg"/>
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
                            {[...Array(5)].map((_, index) => (
                                index < hotel.rating ? (
                                    <SolidStarIcon
                                        key={index}
                                        className={`h-4 w-4 mr-1 text-yellow-500`}
                                    />
                                ) : (
                                    <OutlineStarIcon
                                        key={index}
                                        className={`h-4 w-4 mr-1 text-yellow-500`}
                                    />
                                )
                            ))}


                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        {hotel.amenities && hotel.amenities.map((amenity) => (
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
