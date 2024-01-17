import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import TRAVEL from './travelogues.component';
import { act } from '@testing-library/react';
import Travelogue from '../components/travelogues/travelogue/travelogue';

const mockDataAll = [{
                    "_id": "6570e192ffc5bcc35fe0fe01",
                    "title": "test",
                    "author": "John Doe",
                    "images": [{ "data": "", "contentType": "image/jpeg", "filename" :""}],
                    "description": "test",
                    "city": "Oahu",
                    "likes": 23,
                },
                {
                    "_id": "6570e192ffc5bcc35fe0fe02",
                    "title": "test",
                    "author": "John Doe",
                    "images": [{ "data": "", "contentType": "image/jpeg", "filename": "" }],
                    "description": "test",
                    "city": "New York",
                    "likes": 23,
                }]
const mockDataOahu = [{
    "_id": "6570e192ffc5bcc35fe0fe01",
    "title": "test",
    "author": "John Doe",
    "images": [{ "data": "", "contentType": "image/jpeg", "filename": "" }],
    "description": "test",
    "city": "Oahu",
    "likes": 23,
}]
const topCities = [
    {
        "_id": "Oahu",
        "count": 1
    },
    {
        "_id": "New York",
        "count": 1
    },];
beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url === 'https://traveladvisor-407701.wl.r.appspot.com/travelogue/city/Oahu') {
            return Promise.resolve({
                ok:true,
                json: () => Promise.resolve(mockDataOahu) 
            })
        } else if (url === 'https://traveladvisor-407701.wl.r.appspot.com/travelogue') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockDataAll)
            })
        } else if (url === 'https://traveladvisor-407701.wl.r.appspot.com/travelogue/popular') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(topCities)
            })
        } else {
                // Mocking a successful request for other cases
                return Promise.resolve({
                    ok:true,
                    json: () => Promise.resolve([]),
                });
            }
        });
})
   

test('renders TRAVEL component', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(
            <Router>
                <TRAVEL />
            </Router>
        );
    })

    expect(screen.getByPlaceholderText(/Where do you want to go?/i)).toBeInTheDocument();
});

test('allows user to enter city and perform search', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(
            <Router>
                <TRAVEL />
            </Router>
        );
    })

    // eslint-disable-next-line testing-library/no-await-sync-query
    const searchInput = await screen.getByTestId('searchInput');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async() => {
        await fireEvent.change(searchInput, { target: { value: 'Oahu' } });
    })
        expect(searchInput.value).toBe('Oahu');
        const searchButton = screen.getByText(/Search/i);
    await act(async() => {        
        await userEvent.click(searchButton);
    })
    // Check if the search function is called, or the state is updated appropriately
    await waitFor(async () => {
        // Assert that the h3 text is updated
        const title_result = await screen.getByTestId('title_result');
        expect(title_result).toHaveTextContent('Hot Travelogues for Oahu');
    });
});


test('it shows no result found when searching for city that not exist', async () => {
    await act(async () => {
        render(
            <Router>
                <TRAVEL />
            </Router>
        );
    })
    const searchInput = await screen.getByTestId('searchInput');
    await act(async () => {
        await fireEvent.change(searchInput, { target: { value: 'Hangzhou' } });
    })
    expect(searchInput.value).toBe('Hangzhou');
    const searchButton = screen.getByText(/Search/i);
    await act(async () => {
        await userEvent.click(searchButton);
    })
    // Check if the search function is called, or the state is updated appropriately
    await waitFor(async () => {
        // Assert that the h3 text is updated
        //const title_result = await screen.getByTestId('title_result');
        expect(screen.getByText('Sorry, no travelogues found for this city.')).toBeInTheDocument();
    });
});

test('it handles city click', async () => {
    await act(async () => {
        render(
            <Router>
                <TRAVEL />
            </Router>
        );
    })
    const cityLink = screen.getByTestId("Oahu");
    await act(async () => {
        await userEvent.click(cityLink);
    })
    // Check if the search function is called, or the state is updated appropriately
    await waitFor(async () => {
        // Assert that the h3 text is updated
        const title_result = await screen.getByTestId('title_result');
        expect(title_result).toHaveTextContent('Hot Travelogues for Oahu');
        const h2Element = screen.queryByText('Sorry, no travelogues found for this city.', { selector: 'h2' });
        expect(h2Element).not.toBeInTheDocument();
    });
});


test('it handles when click on all', async () => {
    await act(async () => {
        render(
            <Router>
                <TRAVEL />
            </Router>
        );
    })
    const cityLink = screen.getByTestId("allCities");
    await act(async () => {
        await userEvent.click(cityLink);
    })
    // Check if the search function is called, or the state is updated appropriately
    await waitFor(async () => {
        // Assert that the h3 text is updated
        const title_result = await screen.getByTestId('title_result');
        expect(title_result).toHaveTextContent('Hot Travelogues');
        const h2Element = screen.queryByText('Sorry, no travelogues found for this city.', { selector: 'h2' });
        expect(h2Element).not.toBeInTheDocument();
    });
});


test('when user click on the like button, like increase by one', async () => {
    await act(async () => {
        render(
        <Router>
            <Travelogue key={mockDataAll[0]._id} travelogue={mockDataAll[0]} />
        </Router>
        ) 
    })
    const likeButton = await screen.getByTestId('likeButton');
    await act(async () => {
        await userEvent.click(likeButton);
    })
    await waitFor(async () => {
        expect(screen.getByTestId('likeCount')).toHaveTextContent(24);
    })
});

test('fetches travelogues on render', async () => {
    render(<TRAVEL />);

    // Wait for the component to finish loading data
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

});

afterEach(() => {
    jest.clearAllMocks();
});