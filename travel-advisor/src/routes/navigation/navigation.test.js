// Navigation.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './navigation.component'; // Adjust the import path as necessary

/**
 * Tests for the Navigation component.
 *
 * These tests verify that the Navigation component correctly renders
 * the links and their respective href attributes.
 */
describe('Navigation Component', () => {
    /**
     * Test if the HOME link is rendered and has the correct href attribute.
     */
    test('renders HOME link', () => {
        render(
            <Router>
                <Navigation />
            </Router>
        );

        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });

    /**
     * Test if the Travelogues link is rendered and has the correct href attribute.
     */
    test('renders Travelogues link', () => {
        render(
            <Router>
                <Navigation />
            </Router>
        );

        const traveloguesLink = screen.getByRole('link', { name: /Travelogues/i });
        expect(traveloguesLink).toBeInTheDocument();
        expect(traveloguesLink).toHaveAttribute('href', '/travelogues');
    });

    /**
     * Test if the NEW Travelogues link is rendered and has the correct href attribute.
     */
    test('renders NEW Travelogues link', () => {
        render(
            <Router>
                <Navigation />
            </Router>
        );

        const traveloguesLink = screen.getByRole('link', { name: /New Travelogue/i });
        expect(traveloguesLink).toBeInTheDocument();
        expect(traveloguesLink).toHaveAttribute('href', '/newtravelogue');
    });

    /**
     * Test if the Contact Us link is rendered and has the correct href attribute.
     */
    test('renders Contact link', () => {
        render(
            <Router>
                <Navigation />
            </Router>
        );

        const traveloguesLink = screen.getByRole('link', { name: /Contact Us/i });
        expect(traveloguesLink).toBeInTheDocument();
        expect(traveloguesLink).toHaveAttribute('href', '/contact');
    });

});
