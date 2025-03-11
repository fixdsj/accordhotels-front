import {useEffect, useState} from 'react';
import {Trash} from 'lucide-react';
import {useAuth} from '../hooks/useAuth.js';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


const apiUrl = import.meta.env.VITE_API_URL;
export default function AccountPage() {
    const {user, token} = useAuth();
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [activeTab, setActiveTab] = useState("reservations");
    const [modifiedReservations, setModifiedReservations] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleCancelReservation = (id) => {
        axios.delete(`${apiUrl}/reservations/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setSuccessMessage(response.data.message);
                handleSearchReservations();
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                console.error('Erreur lors de l\'annulation de la réservation', error);
            });
    };

    const handleUpdateInfo = (field, value) => {
        setUserInfo({...userInfo, [field]: value});
    };
    const handleUpdateAccount = () => {
        const userId = user.id;
        axios.put(`${apiUrl}/users/${userId}`, userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setSuccessMessage(response.data.message);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                console.error('Erreur lors de la mise à jour des informations', error);
            });
    }

    const handleDeleteAccount = () => {
        const userId = user.id;
        axios.delete(`${apiUrl}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                console.error('Erreur lors de la suppression du compte', error);
            });
    };

    const handleSearchInfos = () => {
        const userId = user.id;
        axios.get(`${apiUrl}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                const userData = response.data;
                setUserInfo(userData);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleSearchReservations = () => {
        const userId = user.id;
        axios.get(`${apiUrl}/reservations/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                const reservationsData = response.data;
                setReservations(reservationsData);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleDateChange = (id, field, value) => {
        setModifiedReservations((prev) => {
            const updatedReservation = {
                ...prev[id],
                [field]: value,
            };
            if (field === 'check_in_date' && !updatedReservation.check_out_date) {
                updatedReservation.check_out_date = reservations.find(res => res.id === id).check_out_date;
            } else if (field === 'check_out_date' && !updatedReservation.check_in_date) {
                updatedReservation.check_in_date = reservations.find(res => res.id === id).check_in_date;
            }
            return {
                ...prev,
                [id]: updatedReservation,
            };
        });
    };
    const handleUpdateReservation = (id) => {
        const updatedReservation = modifiedReservations[id];

        axios.put(`${apiUrl}/reservations/${id}`, updatedReservation, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setSuccessMessage(response.data.message);
                handleSearchReservations();
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                console.error('Erreur lors de la mise à jour de la réservation', error);
            });
    };

    useEffect(() => {
        if ( user) {
        handleSearchReservations();
        handleSearchInfos();
        }
        else {
            navigate('/login');
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pb-12">
            {/* Tabs */}
            <div className="bg-white shadow-md py-6 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab("reservations")}
                            className={`px-4 py-2 rounded-md ${activeTab === "reservations" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                            Mes réservations
                        </button>
                        <button
                            onClick={() => setActiveTab("informations")}
                            className={`px-4 py-2 rounded-md ${activeTab === "informations" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                            Mes informations
                        </button>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert">
                    <strong className="font-bold">Succès! </strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert">
                    <strong className="font-bold">Erreur! </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeTab === "reservations" && reservations && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Mes Réservations</h2>
                        {reservations.map(reservation => (
                            <div key={reservation.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-xl font-bold">Réservation pour {reservation.hotel.name}</h3>
                                        <p className="text-gray-600">(Réservé
                                            le {new Date(reservation.created_at).toLocaleDateString('fr-FR')})</p>
                                    </div>
                                    <div className="flex items-center">
                                        {modifiedReservations[reservation.id] && (
                                            <button
                                                onClick={() => handleUpdateReservation(reservation.id)}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-2"
                                            >
                                                Enregistrer
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleCancelReservation(reservation.id)}
                                            className="text-red-500 hover:text-red-700 flex items-center"
                                        >
                                            <Trash className="h-5 w-5 mr-2"/>
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="block w-1/4 text-gray-700">Date d'arrivée:</label>
                                    <input
                                        type="date"
                                        value={modifiedReservations[reservation.id]?.check_in_date?.split("T")[0] || reservation.check_in_date.split("T")[0]}
                                        onChange={(e) => handleDateChange(reservation.id, 'check_in_date', e.target.value)}
                                        className="border p-2 rounded w-3/4"
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="block w-1/4 text-gray-700">Date de départ:</label>
                                    <input
                                        type="date"
                                        value={modifiedReservations[reservation.id]?.check_out_date?.split('T')[0] || reservation.check_out_date.split('T')[0]}
                                        onChange={(e) => handleDateChange(reservation.id, 'check_out_date', e.target.value)}
                                        className="border p-2 rounded w-3/4"
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="block w-1/4 text-gray-700">Nombre de personnes:</label>
                                    <span className="font-bold">{reservation.people}</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="block w-1/4 text-gray-700">Statut:</label>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${reservation.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                                    >
                                        {reservation.status === "confirmed" ? "Confirmée" : reservation.status === "waiting" ? "En attente" : "Annulée"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <label className="block w-1/4 text-gray-700">Prix total:</label>
                                    <span className="font-bold">{reservation.total_price}€</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "reservations" && reservations.length === 0 && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <p>Vous n'avez pas de réservations en cours.</p>
                    </div>
                )}
                {activeTab === "informations" && userInfo && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Mes Informations</h2>
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <div className="flex items-center mb-4">
                                <label className="block w-1/4 text-gray-700">Pseudo:</label>
                                <input
                                    type="text"
                                    value={userInfo.pseudo}
                                    onChange={(e) => handleUpdateInfo("pseudo", e.target.value)}
                                    className="border p-2 rounded w-3/4"
                                />
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="block w-1/4 text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => handleUpdateInfo("email", e.target.value)}
                                    className="border p-2 rounded w-3/4"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="block w-1/4 text-gray-700">Date d'inscription:</label>
                                <span>{userInfo.created_at ? new Date(userInfo.created_at).toLocaleDateString('fr-FR') : "N/A"}</span>
                            </div>

                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleUpdateAccount}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Enregistrer
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="flex items-center text-red-500 hover:text-red-700"
                            >
                                <Trash className="h-5 w-5 mr-2"/>
                                Supprimer mon compte
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === "informations" && !userInfo && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <p>Vos informations ne sont pas disponibles pour le moment.</p>
                    </div>
                )}
            </main>
        </div>
    );
};
