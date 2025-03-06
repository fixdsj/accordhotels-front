import {useParams} from "react-router-dom";
import {CircleParkingIcon, CoffeeIcon, DropletIcon, LoaderCircleIcon, MapPinIcon, WifiIcon} from "lucide-react";
import {StarIcon as SolidStarIcon} from '@heroicons/react/24/solid'
import {StarIcon as OutlineStarIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function BookingPage() {
    const {user} = useAuth();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [people, setPeople] = useState(1);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const checkErrorDate = (newCheckInDate, newCheckOutDate) => {
        if (new Date(newCheckOutDate) <= new Date(newCheckInDate)) {
            setErrorMessage("La date de départ doit être après la date d'arrivée.");
            setTimeout(() => setErrorMessage(null), 2000);

            // Reset the date
            setCheckOutDate("");
        } else {
            setErrorMessage(null);
        }
    }

    const handleBooking = () => {
        // Vérifier si la date de départ est après la date d'arrivée
        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            setErrorMessage("La date de départ doit être après la date d'arrivée.");
            return;
        }

        // Calculer le nombre de jours
        const days = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));

        // Calculer le prix total
        const totalPrice = days * hotel.price * people;

        console.log("Données de la réservation : ", {
            user_id: user.userId,
            hotel_id: hotel.id,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            people: people,
            total_price: totalPrice,
            status: "waiting"
        });

        axios.post(apiUrl + "/reservations/create", {
            user_id: user.userId,
            hotel_id: hotel.id,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            people,
            total_price: totalPrice,
            status: "waiting"
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setSuccessMessage(response.data.message);
                setTimeout(() => setSuccessMessage(null), 2000);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage("Une erreur est survenue lors de la réservation.");
                setTimeout(() => setErrorMessage(null), 2000);
            });
    }


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
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Erreur : </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                     role="alert">
                    <strong className="font-bold">Succès : </strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
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
                    <div className="flex items-center mb-4">
                        <label className="block w-1/4 text-gray-700">Date d'arrivée:</label>
                        <input
                            type="date"
                            className="border p-2 rounded w-3/4"
                            value={checkInDate}
                            onChange={(e) => {
                                setCheckInDate(e.target.value);
                                checkErrorDate(e.target.value, checkOutDate);
                            }}/>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="block w-1/4 text-gray-700">Date de départ:</label>
                        <input
                            type="date"
                            className="border p-2 rounded w-3/4"
                            value={checkOutDate}
                            onChange={(e) => {
                                setCheckOutDate(e.target.value);
                                checkErrorDate(checkInDate, e.target.value);
                            }}/>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="block w-1/4 text-gray-700">Nombre de personnes:</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-3/4"
                            min={1}
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                        />
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            onClick={handleBooking}>Réserver {checkInDate && checkOutDate && `pour ${hotel.price * people * (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)}€`}</button>
                </div>
            </div>
        </div>
    );
}
