import { useState } from 'react';
import { courses } from './data/courses';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'business', name: 'Business School' },
    { id: 'engineering', name: 'School of Engineering' },
    { id: 'it', name: 'Information Technology (IT)' },
    { id: 'cs', name: 'Computer Science' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             course.department === departments.find(d => d.id === selectedDepartment)?.name;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>CourseConnect</h1>
          <span className="beta-tag">Beta</span>
        </div>
        <div className="department-filters">
          {departments.map(dept => (
            <button
              key={dept.id}
              className={`filter-button ${selectedDepartment === dept.id ? 'active' : ''}`}
              onClick={() => setSelectedDepartment(dept.id)}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Find Your Perfect Course</h2>
          <p>Connect with your classmates, join study groups, and excel in your studies.</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by course name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search courses"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </section>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className={`course-card ${course.department.toLowerCase().replace(/[^a-z]/g, '')}`}
              tabIndex="0"
            >
              <div className="card-header">
                <span className="course-id">{course.id}</span>
                <span className={`department-label ${course.department.toLowerCase().replace(/[^a-z]/g, '')}`}>
                  {course.department}
                </span>
              </div>
              <h3 className="course-name">{course.name}</h3>
              <a
                href={course.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="join-button"
                aria-label={`Join study group for ${course.name}`}
              >
                Join WhatsApp Group
                <span className="icon">→</span>
              </a>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="no-results">
              <p>No courses found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                }}
                className="reset-button"
              >
                Show All Courses
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Need help? Contact support@courseconnect.com</p>
      </footer>
    </div>
  );
}

export default App;