"use client"
import {useEffect, useState} from "react";
import {
    CircleParkingIcon,
    CoffeeIcon,
    DropletIcon,
    FlameIcon,
    MapPinIcon,
    SearchIcon,
    StarIcon,
    UsersIcon,
    WifiIcon
} from "lucide-react"
import {Menu} from "@headlessui/react"
import axios from "axios";


export default function SearchPage() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [destination, setDestination] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [guests, setGuests] = useState("2")
    const [priceRange, setPriceRange] = useState([50, 500])
    const [amenitiesFilter, setAmenitiesFilter] = useState({
        wifi: false,
        restaurant: false,
        pool: false,
        parking: false,
    })
    const [rating, setRating] = useState(null);


    const handleFilterChange = (filter) => {
        setAmenitiesFilter((prev) => ({...prev, [filter]: !prev[filter]}))
    }

    const handleSearch = (e) => {
        e.preventDefault()
        // Handle search logic here
        console.log("Searching with:", {destination, checkIn, checkOut, guests, priceRange, amenitiesFilter})

    }


    const handleReservation = (hotelId) => {
        // Handle reservation logic here
        console.log("Reserving hotel:", hotelId)
        window.location.href = `/booking/${hotelId}`
    }


    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/hotels/search`, {})
            .then((response) => {
                    //Pour chaque hotel convertir amenities entableau
                    const hotels = response.data.map((hotel) => {
                        if (hotel.amenities) {
                            hotel.amenities = hotel.amenities.split(',').map(amenity => amenity.trim())
                        }
                        return hotel
                    })

                    setHotels(response.data)
                }
            )
            .catch((error) => {
                console.error(error);

            });

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pb-12">

            {/* Search Form */}
            <div className="bg-white shadow-md py-6 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="relative">
                            <label htmlFor="destination" className="sr-only">
                                Destination
                            </label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </div>
                            <input
                                id="destination"
                                name="destination"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Où allez-vous ?"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="check-in" className="sr-only">
                                Date d arrivée
                            </label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <input
                                id="check-in"
                                name="check-in"
                                type="date"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="check-out" className="sr-only">
                                Date de départ
                            </label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <input
                                id="check-out"
                                name="check-out"
                                type="date"
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Menu as="div" className="relative inline-block text-left w-full">
                                <div>
                                    <Menu.Button
                                        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                        {guests} voyageur(s)
                                        <UsersIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>

                                <Menu.Items
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {[1, 2, 3, 4, 5].map((number) => (
                                            <Menu.Item key={number}>
                                                {(active) => (
                                                    <button
                                                        onClick={() => setGuests(number.toString())}
                                                        className={`${
                                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                                        } block px-4 py-2 text-sm w-full text-left`}
                                                    >
                                                        {number} voyageur{number > 1 ? "s" : ""}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Menu>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <SearchIcon className="mr-2 h-5 w-5" aria-hidden="true"/>
                                Rechercher
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Filtres</h2>

                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Budget par nuit</h3>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <span className="text-sm text-gray-500">{priceRange[1]}€</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Équipements</h3>
                                <div className="space-y-2">
                                    {Object.entries(amenitiesFilter).map(([key, value]) => (
                                        <label key={key} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={() => handleFilterChange(key)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                            <span className="ml-2 text-gray-700">
                        {key === "wifi" && <WifiIcon className="inline-block w-5 h-5 mr-1"/>}
                                                {key === "restaurant" &&
                                                    <CoffeeIcon className="inline-block w-5 h-5 mr-1"/>}
                                                {key === "pool" && <DropletIcon className="inline-block w-5 h-5 mr-1"/>}
                                                {key === "parking" &&
                                                    <CircleParkingIcon className="inline-block w-5 h-5 mr-1"/>}
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:w-3/4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Résultats de recherche</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hotels.map((hotel) => (
                                <div key={hotel.id} className="bg-white shadow rounded-lg overflow-hidden">
                                    <div className="relative h-48">
                                        <img src={hotel.picture || "/placeholder.svg"} alt={hotel.name}
                                             className="object-cover w-full h-full"/>
                                        <button
                                            onClick={() => handleFavorite(hotel.id)}
                                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                                        >
                                            <FlameIcon className="h-6 w-6 text-red-500"/>
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{hotel.name}</h3>
                                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                                    <MapPinIcon className="h-4 w-4 mr-1"/>
                                                    {hotel.location}
                                                </p>
                                            </div>
                                            <div
                                                className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                                <StarIcon className="h-4 w-4 mr-1"/>
                                                {hotel.rating}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-600">{hotel.description}</p>
                                        <div className="mt-4 flex space-x-2">

                                            {Array.isArray(hotel.amenities) &&
                                                hotel.amenities.map((amenity) => (
                                                    <span key={amenity}
                                                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {amenity === "wifi" && <WifiIcon className="h-4 w-4 mr-1"/>}
                                                        {amenity === "restaurant" &&
                                                            <CoffeeIcon className="h-4 w-4 mr-1"/>}
                                                        {amenity === "pool" && <DropletIcon className="h-4 w-4 mr-1"/>}
                                                        {amenity === "parking" &&
                                                            <CircleParkingIcon className="h-4 w-4 mr-1"/>}
                                                        {amenity}
        </span>
                                                ))
                                            }
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-gray-900">{hotel.price}€</span>
                                                <span className="text-gray-600 text-sm"> / nuit</span>
                                            </div>
                                            <button
                                                onClick={() => handleReservation(hotel.id)}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Réserver
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

