import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TravelogueDetails = () => {
  const [travelogue, setTravelogue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTravelogue = async () => {
      try {
        const response = await axios.get(`https://traveladvisor-407701.wl.r.appspot.com/travelogue/${id}`);
        setTravelogue(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelogue();
  }, [id]);

  const containerStyle = {
    margin: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const titleStyle = {
    color: '#333',
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    fontWeight: 'bold',
    color: '#666',
    fontSize: '18px',
    margin: '5px 0',
  };

  const imagesContainerStyle = {
    marginTop: '20px',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  const likeStyle = {
    color: 'red',
    fontSize: '20px',
  };


  if (loading) return <div>Loading travelogue details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!travelogue) return <div>No travelogue found</div>;

  return (
    <div className="container py-lg-5 py-3" style={containerStyle}>
      <h2 style={titleStyle}>{travelogue.title}</h2>
      <p style={likeStyle}>❤️ {travelogue.likes}</p>
      <p style={paragraphStyle}><strong style={{ color: '#3F3E3F' }}>Author: </strong>{travelogue.author}</p>
      <p style={paragraphStyle}><strong style={{ color: '#3F3E3F' }}>City: </strong>{travelogue.city}</p>
      <p style={paragraphStyle}><strong style={{ color: '#3F3E3F' }}>Story: </strong>{travelogue.description}</p>
      {travelogue.images && (
        <div style={imagesContainerStyle}>
          {travelogue.images.map((image, index) => {
            const imageSrc = `data:${image.contentType};base64,${image.data}`;
            return <img key={index} src={imageSrc} alt={`Travelogue Image ${index + 1}`} style={imageStyle} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TravelogueDetails;
