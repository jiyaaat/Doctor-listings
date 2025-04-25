import React from 'react';
import { MapPin, Building, Star, Video, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden" 
      data-testid="doctor-card"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {doctor.photo ? (
              <div className="relative group">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {doctor.name_initials}
                </span>
              </div>
            )}
            
            <div className="mt-3 flex items-center justify-center gap-2">
              {doctor.video_consult && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Video className="w-3 h-3 mr-1" />
                  Video
                </span>
              )}
              {doctor.in_clinic && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Stethoscope className="w-3 h-3 mr-1" />
                  Clinic
                </span>
              )}
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <h2 
                  className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200" 
                  data-testid="doctor-name"
                  onClick={() => navigate(`/doctor/${doctor.id}`)}
                >
                  {doctor.name}
                </h2>
                <p className="text-blue-600 font-medium mt-1" data-testid="doctor-specialty">
                  {doctor.specialities.map(s => s.name).join(', ')}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900" data-testid="doctor-fee">
                  {doctor.fees}
                </div>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.5 (120 reviews)</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mt-3 line-clamp-2">
              {doctor.doctor_introduction}
            </p>
            
            <div className="mt-4" data-testid="doctor-experience">
              <span className="text-gray-900 font-semibold">{doctor.experience}</span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <Building className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">{doctor.clinic.name}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">
                  {`${doctor.clinic.address.address_line1}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 font-medium">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;