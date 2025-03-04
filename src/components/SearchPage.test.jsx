import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import SearchPage from './search-page.jsx';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const mockAxios = new MockAdapter(axios);

describe('SearchPage', () => {
    beforeEach(() => {
        mockAxios.reset();
        vi.mock('next/router', () => require('next-router-mock'));
    });

    it('renders initial search form and filters', () => {
        mockAxios.onGet(/\/hotels\/search/).reply(200, []);
        render(<SearchPage/>);
        expect(screen.getByPlaceholderText('Où allez-vous ?')).toBeInTheDocument();
        expect(screen.getByText('Filtres')).toBeInTheDocument();
        expect(screen.getByText('Budget par nuit')).toBeInTheDocument();
        expect(screen.getByText('Équipements')).toBeInTheDocument();
    });

    it('fetches and displays hotels on initial render', async () => {
        const mockHotels = [
            {id: 1, name: 'Hotel 1', location: 'Paris', price: 100, amenities: 'wifi,pool', rating: 4},
            {id: 2, name: 'Hotel 2', location: 'Lyon', price: 200, amenities: 'restaurant,parking', rating: 5},
        ];
        mockAxios.onGet(/\/hotels\/search/).reply(200, mockHotels);

        await act(async () => {
            render(<SearchPage/>);
        });

        await waitFor(() => {
            expect(screen.getByText('Hotel 1')).toBeInTheDocument();
            expect(screen.getByText('Hotel 2')).toBeInTheDocument();
        });
    });

    it('filters hotels by destination', async () => {
        const mockHotels = [
            {id: 1, name: 'Hotel 1', location: 'Paris', price: 100, amenities: 'wifi,pool', rating: 4},
            {id: 2, name: 'Hotel 2', location: 'Lyon', price: 200, amenities: 'restaurant,parking', rating: 5},
        ];
        mockAxios.onGet(/\/hotels\/search/).reply((config) => {
            if (config.params.destination === 'Paris') {
                return [200, [mockHotels[0]]];
            }
            return [200, mockHotels];
        });

        await act(async () => {
            render(<SearchPage/>);
        });

        fireEvent.change(screen.getByPlaceholderText('Où allez-vous ?'), {target: {value: 'Paris'}});
        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: /Rechercher/i}));
        });

        await waitFor(() => {
            expect(screen.getByText('Hotel 1')).toBeInTheDocument();
            expect(screen.queryByText('Hotel 2')).not.toBeInTheDocument();
        });
    });

    it('filters hotels by amenities', async () => {
        const mockHotels = [
            {id: 1, name: 'Hotel 1', location: 'Paris', price: 100, amenities: 'wifi,pool', rating: 4},
            {id: 2, name: 'Hotel 2', location: 'Lyon', price: 200, amenities: 'restaurant,parking', rating: 5},
        ];
        mockAxios.onGet(/\/hotels\/search/).reply((config) => {
            if (config.params.amenities === JSON.stringify(['wifi'])) {
                return [200, [mockHotels[0]]];
            }
            return [200, mockHotels];
        });

        await act(async () => {
            render(<SearchPage/>);
        });

        await act(async () => {
            fireEvent.click(screen.getByLabelText('Wifi'));
        });

        await waitFor(() => {
            expect(screen.getByText('Hotel 1')).toBeInTheDocument();
            expect(screen.queryByText('Hotel 2')).toBeInTheDocument();
        });
    });

    it('clears search filters', async () => {
        const mockHotels = [
            {id: 1, name: 'Hotel 1', location: 'Paris', price: 100, amenities: 'wifi,pool', rating: 4},
            {id: 2, name: 'Hotel 2', location: 'Lyon', price: 200, amenities: 'restaurant,parking', rating: 5},
        ];
        mockAxios.onGet(/\/hotels\/search/).reply(200, mockHotels);

        await act(async () => {
            render(<SearchPage/>);
        });

        fireEvent.change(screen.getByPlaceholderText('Où allez-vous ?'), {target: {value: 'Paris'}});
        fireEvent.click(screen.getByLabelText('Wifi'));
        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: /Effacer la recherche/i}));
        });

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Où allez-vous ?')).toHaveValue('');
            expect(screen.getByLabelText('Wifi')).not.toBeChecked();
        });
    });
});
