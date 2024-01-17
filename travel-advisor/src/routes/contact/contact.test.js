import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CONTACT from './contact.component';

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

/**
 * Tests for the CONTACT component.
 *
 * These tests verify that the CONTACT form can be rendered, filled out,
 * and submitted correctly.
 */
describe('CONTACT Component', () => {
    /**
     * Test if the CONTACT form can be rendered and fields can be filled out.
     */
    test('renders CONTACT form', () => {
        render(<CONTACT />);
        userEvent.type(screen.getByLabelText('Subject *'), 'Test Subject');
        userEvent.type(screen.getByLabelText('Email *'), 'test@example.com');
        userEvent.type(screen.getByLabelText('How can we help?'), 'Test Message');

    });

    /**
     * Test if the CONTACT form can be filled out and submitted,
     * and if the submission triggers a fetch request.
     */
    test('allows user to fill out and submit the form', () => {
        render(<CONTACT />);

        userEvent.type(screen.getByLabelText('Subject *'), 'Test Subject');
        userEvent.type(screen.getByLabelText('Email *'), 'test@example.com');
        userEvent.type(screen.getByLabelText('How can we help?'), 'Test Message');

        expect(screen.getByLabelText('Subject *')).toHaveValue('Test Subject');
        expect(screen.getByLabelText('Email *')).toHaveValue('test@example.com');
        expect(screen.getByLabelText('How can we help?')).toHaveValue('Test Message');

        fireEvent.click(screen.getByText('Submit'));

        expect(fetch).toHaveBeenCalledWith('/contact/post', expect.any(Object));
    });

});
