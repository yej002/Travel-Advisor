import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Adjust the import based on your project structure

/**
 * Test suite for the App component.
 *
 * This test suite verifies the rendering of different components
 * and links in the App component when it's rendered at the root route.
 */
test('renders Home component on root route', () => {
  // Render the App component wrapped with BrowserRouter
  render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );

  // Test if the 'HOME' link is present in the document
  const homeLink = screen.getByRole('link', { name: /HOME/i });
  expect(homeLink).toBeInTheDocument();

  // Test if the 'Travelogues' link is present in the document
  const travelElement = screen.getByRole('link', { name: /Travelogues/i });
  expect(travelElement).toBeInTheDocument();

  // Test if the 'New Travelogue' link is present in the document
  const newTravelogueElement = screen.getByRole('link', { name: /New Travelogue/i });
  expect(newTravelogueElement).toBeInTheDocument();

  // Test if the 'CONTACT US' link is present in the document
  const contactElement = screen.getByRole('link', { name: /CONTACT US/i });
  expect(contactElement).toBeInTheDocument();
});
