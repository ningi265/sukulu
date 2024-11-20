import { useState } from 'react';
import { Bell, UserPlus, FileText, Calendar, Mail } from 'lucide-react';
import './notification.css';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'request', title: 'John Doe requested to join Structural Engineering', description: 'New student request', date: '2023-05-15' },
    { id: '2', type: 'submission', title: 'Sarah Smith submitted Assignment 3', description: 'Fluid Mechanics - Week 3', date: '2023-05-14' },
    { id: '3', type: 'event', title: 'Upcoming Webinar', description: 'Latest Trends in Sustainable Construction', date: '2023-05-20' },
    { id: '4', type: 'announcement', title: 'New Course Available', description: 'Introduction to BIM for Civil Engineers', date: '2023-05-13' },
    { id: '5', type: 'request', title: 'Emily Johnson requested to join Geotechnical Engineering', description: 'New student request', date: '2023-05-12' },
    { id: '6', type: 'submission', title: 'Michael Brown submitted Final Project', description: 'Transportation Systems Design', date: '2023-05-11' },
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getIcon = (type) => {
    switch (type) {
      case 'request': return <UserPlus className="notification-icon" />;
      case 'submission': return <FileText className="notification-icon" />;
      case 'event': return <Calendar className="notification-icon" />;
      case 'announcement': return <Mail className="notification-icon" />;
      default: return null;
    }
  };

  const filteredNotifications = notifications.filter(
    (notification) => activeTab === 'all' || notification.type === activeTab
  );

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h1>
          <Bell className="notification-icon" />
          Notification Center
        </h1>
        <p>Stay updated with student requests, submissions, and important announcements</p>
      </div>
      <div className="notification-tabs">
        {['all', 'request', 'submission', 'event', 'announcement'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1) + 's'}
          </button>
        ))}
      </div>
      <div className="notification-list">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.type}`}
          >
            <div className="notification-icon-container">
              {getIcon(notification.type)}
            </div>
            <div className="notification-content">
              <h2>{notification.title}</h2>
              <p>{notification.description}</p>
              <time>{notification.date}</time>
            </div>
            <span className={`notification-badge ${notification.type}`}>
              {notification.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
