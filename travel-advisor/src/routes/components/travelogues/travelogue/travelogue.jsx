import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import "./style.css"
import axios from 'axios';

export default function Travelogue({ travelogue }) {
  const [likes, setLikes] = useState(travelogue.likes);
  const [liked, setLiked] = useState(travelogue.liked);

  const handleLikeClick = async () => {
    const newLiked = !liked;
    const newLikes = newLiked ? +likes + 1 : +likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);
    try {
      await axios.put(`https://traveladvisor-407701.wl.r.appspot.com/travelogue/likes/${travelogue._id}`, { likes: newLikes });
    } catch (error) {
      console.error('Error updating travelogue:', error);
    }
  }
    return (
        <Card>
        <Card.Img variant="top" src={`data: ${travelogue.images[0].contentType}; base64, ${travelogue.images[0].data}`} style={{width: '100%', height:'30vh', objectFit:'cover'}}/>
            <Card.Body>
              <div className="title-container">
                <Card.Title>{travelogue.title}</Card.Title>
                <div className="like-section">
              <button type="button" className={`btn ${liked ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={handleLikeClick}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                <span className="visually-hidden" data-testid="likeButton">Button</span>
                  </button>
              <div data-testid="likeCount" className="likes-count">
                    {likes}
                  </div>
                </div>
              </div>
              <Card.Text>
                {travelogue.description}
              </Card.Text>

            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg> {travelogue.city}</ListGroup.Item>
              <ListGroup.Item><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
              </svg> {travelogue.author}</ListGroup.Item>
              <ListGroup.Item>
                <Link to={`/travelogues/${travelogue._id}`}>View Details</Link> {/* Link to the travelogue details page */}
              </ListGroup.Item>
            </ListGroup>
          </Card>

)};