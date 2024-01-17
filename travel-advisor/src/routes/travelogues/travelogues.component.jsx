import Travelogues from "../components/travelogues/travelogues";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect, useState} from "react";


const TRAVEL= () => {

    const [travelogues, setTravelogues] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [cityDisplay, setCityDisplay] = useState('');
    const [originalTravelogues, setOriginalTravelogues] = useState([]);
    const [searchHasResults, setSearchHasResults] = useState(true);

    //This method fetches the records from the database.
    useEffect(() => {
        
        async function getTravelogues() {
            let response = await fetch(`https://traveladvisor-407701.wl.r.appspot.com/travelogue`);


            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }


            let travelogues = await response.json();
            if (travelogues.length === 0) {
                // No travelogues found for the searched city
                setSearchHasResults(false);
            } else {
                setSearchHasResults(true);
            }
            travelogues = travelogues.map(travelogue => ({
                ...travelogue,
                liked: false // Initialize 'liked' to false
            }));
            setTravelogues(travelogues);
            setOriginalTravelogues(travelogues);
        }

        getTravelogues();
        
    }, []);

    const resetTravelogues = (e) => {
        e.preventDefault();
        if (originalTravelogues.length === 0) {
            // No travelogues found for the searched city
            setSearchHasResults(false);
        } else {
            setSearchHasResults(true);
        }
        setCityInput('');
        setCityDisplay('');
        setTravelogues(originalTravelogues);
    };

    //This method fetches the records from the database.
        useEffect(() => {
            fetch("https://traveladvisor-407701.wl.r.appspot.com/travelogue/popular")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setCities(data);
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }, [cities.length]);

    
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://traveladvisor-407701.wl.r.appspot.com/travelogue/city/${encodeURIComponent(cityInput)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const travelogues = await response.json();
            if (travelogues.length === 0) {
                // No travelogues found for the searched city
                setSearchHasResults(false);
            } else {
                setSearchHasResults(true);
            }
            let newTravelogues = [...travelogues];
            setTravelogues(newTravelogues);
            setCityDisplay(cityInput);
        } catch (error) {
            setSearchHasResults(false);
            console.error('Fetch error:', error);
            // Handle the error appropriately
        }
    };
    const handleCityClick = async (event, cityName) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://traveladvisor-407701.wl.r.appspot.com/travelogue/city/${encodeURIComponent(cityName)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const travelogues = await response.json();
            if (travelogues.length === 0) {
                // No travelogues found for the searched city
                setSearchHasResults(false);
            } else {
                setSearchHasResults(true);
            }
            let newTravelogues = [...travelogues];
            setCityInput(cityName);
            setCityDisplay(cityName);
            setTravelogues(newTravelogues);
        } catch (error) {
            setSearchHasResults(false);
            console.error('Fetch error:', error);
        }
    };

    return (
        <Container>
            <div className="searchContainer">
                <InputGroup className="mb-3">
                    <Form.Control
                        data-testid="searchInput"
                        placeholder="Where do you want to go?"
                        aria-label="city name"
                        aria-describedby="basic-addon2"
                        value={cityInput}
                        onChange={(e) => {
                            setCityInput(e.target.value);
                        }}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={(e) => {handleSearch(e)}}>
                        Search
                    </Button>
                </InputGroup>
                <Container>
                    <div className="contentWrapper">
                        <div className="linkGroup">
                            {cities.map((city, index) => (
                                <a data-testid={city._id} key={city._id} href="#" onClick={(e) => handleCityClick(e, city._id)}> {city._id}</a>
                            ))}
                        </div>
                        <div className="rightSide">
                            <a data-testid="allCities" href="#" className="rightMostLink" onClick={(e) => {resetTravelogues(e)}}>All</a>
                        </div> 
                    </div>
                </Container>
            </div>
            <div className="travelogueDisplay">
                <div className="text-center mb-5">
                    <h3 className="tittle_head" data-testid="title_result">{cityDisplay && searchHasResults ? `Hot Travelogues for ${cityDisplay}` : 'Hot Travelogues'}</h3>
                </div>
                {!searchHasResults && (
                    <h2>Sorry, no travelogues found for this city.</h2>
                )}
                <Travelogues travelogues={travelogues} />
            </div>
        </Container>

    );
};

export default TRAVEL;