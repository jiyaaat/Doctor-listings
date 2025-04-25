import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: Error | null;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, isLoading, error }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading doctors: {error.message}</div>;
  }

  if (doctors.length === 0) {
    return <div className="text-center py-8">No doctors found matching your criteria.</div>;
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;