import { render, screen } from '@testing-library/react';
import Home from "./home.component";

test('renders Home component on root route', () => {
    render(
        <Home />
    );

    const heading1 = screen.getByRole('heading', { name: /Travel Advisor/i });
    expect(heading1).toBeInTheDocument();

    const heading2 = screen.getByRole('heading', { name: /WHAT WE ARE/i });
    expect(heading2).toBeInTheDocument()

    const heading3 = screen.getByRole('heading', { name: /About Our Team/i });
    expect(heading3).toBeInTheDocument()
});