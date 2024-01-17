import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TravelogueDetails from './viewtravelogue.component';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '1', // Mock id
    }),
}));

/**
 * Tests for the TRAVEL component.
 *
 * These tests verify that the TRAVEL component can render, handle user interactions,
 * and correctly fetch and display data.
 */
describe('TravelogueDetails Component', () => {
    test('renders loading state initially', () => {
        render(<TravelogueDetails />);
        expect(screen.getByText('Loading travelogue details...')).toBeInTheDocument();
    });

    test('renders travelogue details on successful fetch', async () => {
        const mockData = {
            title: 'Test Travelogue',
            author: 'John Doe',
            city: 'New York',
            description: 'Test Description',
            likes: 100,
            images: [],
        };

        axios.get.mockResolvedValue({ data: mockData });

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<TravelogueDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Travelogue')).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            // ... Other assertions for travelogue details
        });
    });

    test('renders error message on fetch failure', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        render(<TravelogueDetails />);

        await waitFor(() => {
            expect(screen.getByText('Error: Network error')).toBeInTheDocument();
        });
    });

});
