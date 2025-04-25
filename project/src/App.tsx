import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchDoctors } from './api/doctorsApi';
import { Doctor, FilterState } from './types';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import DoctorDetails from './pages/DoctorDetails';
import {
  filterDoctors,
  getUniqueSpecialties,
  getFilterParamsFromUrl,
  updateUrlWithFilters
} from './utils/filterUtils';

function HomePage() {
  const initialFilters = getFilterParamsFromUrl();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  const { data: allDoctors = [], isLoading, error } = useQuery<Doctor[], Error>(
    'doctors',
    fetchDoctors
  );
  
  const filteredDoctors = filterDoctors(allDoctors, filters);
  const specialties = getUniqueSpecialties(allDoctors);
  
  useEffect(() => {
    updateUrlWithFilters(filters);
  }, [filters]);
  
  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFilterParamsFromUrl();
      setFilters(urlFilters);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleSearch = (query: string) => {
    handleFilterChange({ searchQuery: query });
  };
  
  const handleSelectDoctor = (doctorName: string) => {
    handleFilterChange({ searchQuery: doctorName });
  };
  
  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      consultationType: '',
      specialties: [],
      sortBy: 'experience'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-2xl font-bold mb-6 text-center">
              Find the Best Doctors Near You
            </h1>
            <SearchBar 
              doctors={allDoctors} 
              onSearch={handleSearch} 
              onSelectDoctor={handleSelectDoctor} 
            />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="sticky top-8">
              <FilterPanel 
                filters={filters}
                specialties={specialties}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
          
          <div className="w-full md:w-3/4">
            <DoctorList 
              doctors={filteredDoctors} 
              isLoading={isLoading}
              error={error as Error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;