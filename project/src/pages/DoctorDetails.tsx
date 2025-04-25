import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArrowLeft, MapPin, Building, Phone, Globe, Languages } from 'lucide-react';
import { fetchDoctors } from '../api/doctorsApi';
import { Doctor } from '../types';

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: doctors = [] } = useQuery<Doctor[], Error>('doctors', fetchDoctors);
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-red-600">Doctor not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to doctors list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to doctors list
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-start">
              {doctor.photo && (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover mr-8"
                />
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {doctor.name}
                </h1>
                
                <p className="text-lg text-gray-600 mb-4">
                  {doctor.specialities.map(s => s.name).join(', ')}
                </p>
                
                <p className="text-gray-600 mb-4">
                  {doctor.doctor_introduction}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Building className="w-5 h-5 mr-2" />
                    {doctor.clinic.name}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {`${doctor.clinic.address.address_line1}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Languages className="w-5 h-5 mr-2" />
                    {doctor.languages.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Consultation Options</h2>
                  <div className="space-y-3">
                    {doctor.video_consult && (
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-green-500" />
                        <span>Video Consultation Available</span>
                      </div>
                    )}
                    {doctor.in_clinic && (
                      <div className="flex items-center">
                        <Building className="w-5 h-5 mr-2 text-blue-500" />
                        <span>In-Clinic Consultation Available</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Consultation Fee</h2>
                  <div className="text-2xl font-bold text-blue-600">
                    {doctor.fees}
                  </div>
                  <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;