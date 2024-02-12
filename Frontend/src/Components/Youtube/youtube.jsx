import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios using npm install axios
import './youtube.css';

const FitnessVideos = ({ term, isOpen }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual YouTube API key
    const API_KEY = 'AIzaSyCApvdi1Nfxh1WPCoQ2UlKcl0pOfX_mIto  ';
    const maxResults = 15; // Set the desired number of results

    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: API_KEY,
            q: term,
            type: 'video',
            part: 'snippet',
            maxResults: maxResults,
          },
        });

        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, [term]);

  return (
    <div className={`content ${isOpen ? 'shifted' : ''}`}>
    <div className="videos-container">
      {videos.map((video) => (
        <div key={video.id.videoId} className="video-item">
          <div className="video-wrapper">
            <iframe
              className="video-frame"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
            <p className="video-title">{video.snippet.title}</p>
          </div>
        </div>
      ))}
    </div>
    </div>  
  );
};

export default FitnessVideos;
