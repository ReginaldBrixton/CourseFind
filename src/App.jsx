import { useState } from 'react';
import { courses } from './data/courses';

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
    <div className="w-[95%] max-w-[1200px] mx-auto p-4 md:p-8 text-gray-800 grid grid-rows-[auto_1fr_auto] min-h-screen gap-8">
      <header className="text-center p-6 md:p-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h1 className="text-2xl md:text-4xl font-bold m-0">CourseConnect</h1>
          <span className="bg-white/20 px-2 py-1 rounded text-sm font-medium">Beta</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center px-4 md:px-5">
          {departments.map(dept => (
            <button
              key={dept.id}
              className={`px-5 py-2.5 border-2 border-white/20 rounded-lg text-sm md:text-base cursor-pointer transition-all duration-300 font-medium flex-1 min-w-[200px] max-w-[300px] hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5
                ${selectedDepartment === dept.id ? 'bg-white text-indigo-500 border-white' : 'bg-transparent text-white'}`}
              onClick={() => setSelectedDepartment(dept.id)}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </header>

      <main>
        <section className="text-center grid gap-4 max-w-3xl mx-auto py-4 md:py-8">
          <h2 className="text-2xl md:text-3xl text-gray-800">Find Your Perfect Course</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-[60ch] mx-auto">Connect with your classmates, join study groups, and excel in your studies.</p>
          <div className="relative w-full max-w-[600px] mx-auto mt-4">
            <input
              type="text"
              placeholder="Search by course name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 md:py-4 text-base md:text-lg border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10"
              aria-label="Search courses"
            />
            {searchQuery && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-2xl text-gray-500 cursor-pointer p-1 hover:text-gray-800 hover:scale-110 transition-all duration-300"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-4 md:py-5">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className={`bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              tabIndex="0"
            >
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <span className="font-semibold text-gray-800">{course.id}</span>
                <span className={`text-sm px-3 py-1 rounded-full
                  ${course.department.includes('Business') ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${course.department.includes('Engineering') ? 'bg-blue-100 text-blue-800' : ''}
                  ${course.department.includes('IT') ? 'bg-green-100 text-green-800' : ''}
                  ${course.department.includes('Computer Science') ? 'bg-purple-100 text-purple-800' : ''}`}
                >
                  {course.department}
                </span>
              </div>
              <h3 className="text-lg md:text-xl leading-relaxed flex-grow">{course.name}</h3>
              <a
                href={course.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-6 bg-indigo-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-0.5 mt-auto"
                aria-label={`Join study group for ${course.name}`}
              >
                Join WhatsApp Group
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-8 md:py-16">
              <p className="text-gray-600 text-base md:text-lg mb-5">No courses found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                }}
                className="py-3 px-6 bg-indigo-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-0.5"
              >
                Show All Courses
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 md:py-10 text-gray-600">
        <p>Need help? Contact support@courseconnect.com</p>
      </footer>
    </div>
  );
}

export default App;