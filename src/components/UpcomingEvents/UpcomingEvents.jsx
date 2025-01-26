import React, { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const {theme}=useContext(AuthContext);

  // Sample event data, you can replace it with your actual data source
  useEffect(() => {
    // Simulate fetching upcoming events from an API or database
    const fetchedEvents = [
      {
        id: 1,
        title: 'Community Food Drive: Share the Joy',
        description: 'Join us in collecting surplus food to help families in need this holiday season.',
        date: '2024-12-20T10:00:00',
        location: 'Central Community Center, Sylhet',
      },
      {
        id: 2,
        title: 'Online Workshop: Reducing Food Waste at Home',
        description: 'Learn practical tips and tricks to minimize food waste and contribute to food donation efforts.',
        date: '2024-12-21T18:00:00',
        location: 'Online (Zoom)',
      },
      {
        id: 3,
        title: 'Volunteer Meet-Up: Fighting Hunger Together',
        description: 'A meet-up for volunteers to discuss upcoming events and share success stories.',
        date: '2024-12-22T16:00:00',
        location: 'Community Hall, Sylhet',
      },
      {
        id: 4,
        title: 'Cooking for a Cause: Charity Cook-Off',
        description: 'Watch local chefs prepare delicious meals for donation to shelters and food banks.',
        date: '2024-12-23T15:00:00',
        location: 'City Square, Sylhet',
      },
      {
        id: 5,
        title: 'Food Donation Awareness Walk',
        description: 'Join our awareness walk to promote food donation and its impact on the community.',
        date: '2024-12-24T08:00:00',
        location: 'Sylhet Park to City Center',
      },
    ];
    

    setEvents(fetchedEvents);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h2 className="text-4xl font-bold text-center text-orange-700 mb-6">Upcoming Movie Events</h2>
      <div className="space-y-10 my-24">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className={theme === "light"? 'bg-white p-6 rounded-lg shadow-md' : 'p-6 rounded-lg shadow-md bg-gray-700'}>
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="text-lg text-gray-700">{event.description}</p>
              <p className="text-md text-gray-500 mt-2">
                <strong>Date:</strong> {formatDate(event.date)}
              </p>
              <p className="text-md text-gray-500 mt-2">
                <strong>Location:</strong> {event.location}
              </p>
    
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No upcoming events at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
