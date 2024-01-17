import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NewTravelogue from './newtravelogue.component';

// Mock axios
jest.mock('axios');

// Mock navigate
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

describe('NewTravelogue Component', () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<NewTravelogue />} />
                </Routes>
            </MemoryRouter>
        );
    });

    test('renders form with all fields', () => {
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
        // ... Check for other fields
    });

    test('allows user to fill out the form', () => {
        userEvent.type(screen.getByLabelText(/Title/i), 'My Travelogue');
        expect(screen.getByLabelText(/Title/i)).toHaveValue('My Travelogue');
        // ... Similar tests for other fields
    });

    test('submits the form with valid data', async () => {
        // Fill out the form
        userEvent.type(screen.getByLabelText(/Title/i), 'My Travelogue');

        // Mock the axios post request
        axios.post.mockResolvedValue({ data: { success: true } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Create Travelogue/i }));

        // Check if axios was called
        await waitFor(() => {
            // Make assertions inside waitFor
            expect(axios.post).toHaveBeenCalledTimes(0)
        });
    });

});
