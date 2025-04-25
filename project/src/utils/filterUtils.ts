import { Doctor, FilterState, SortOption } from '../types';

export const filterDoctors = (doctors: Doctor[], filters: FilterState): Doctor[] => {
  let filteredDoctors = [...doctors];

  // Filter by search query
  if (filters.searchQuery) {
    const lowerCaseQuery = filters.searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Filter by consultation type
  if (filters.consultationType) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      if (filters.consultationType === 'Video Consult') {
        return doctor.video_consult;
      } else if (filters.consultationType === 'In Clinic') {
        return doctor.in_clinic;
      }
      return true;
    });
  }

  // Filter by specialties
  if (filters.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      filters.specialties.some(specialty => 
        doctor.specialities.some(s => s.name === specialty)
      )
    );
  }

  // Sort doctors
  filteredDoctors = sortDoctors(filteredDoctors, filters.sortBy);

  return filteredDoctors;
};

export const sortDoctors = (doctors: Doctor[], sortBy: SortOption): Doctor[] => {
  const sortedDoctors = [...doctors];
  
  if (sortBy === 'fees') {
    sortedDoctors.sort((a, b) => {
      const aFee = parseInt(a.fees.replace(/[^0-9]/g, ''));
      const bFee = parseInt(b.fees.replace(/[^0-9]/g, ''));
      return aFee - bFee;
    });
  } else if (sortBy === 'experience') {
    sortedDoctors.sort((a, b) => {
      const aExp = parseInt(a.experience.replace(/[^0-9]/g, ''));
      const bExp = parseInt(b.experience.replace(/[^0-9]/g, ''));
      return bExp - aExp;
    });
  }
  
  return sortedDoctors;
};

export const getUniqueSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialities.forEach(specialty => {
      specialtiesSet.add(specialty.name);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};

export const getFilterParamsFromUrl = (): FilterState => {
  const params = new URLSearchParams(window.location.search);
  
  return {
    searchQuery: params.get('search') || '',
    consultationType: params.get('consultationType') || '',
    specialties: params.getAll('specialty') || [],
    sortBy: (params.get('sortBy') as SortOption) || 'experience'
  };
};

export const updateUrlWithFilters = (filters: FilterState): void => {
  const params = new URLSearchParams();
  
  if (filters.searchQuery) {
    params.set('search', filters.searchQuery);
  }
  
  if (filters.consultationType) {
    params.set('consultationType', filters.consultationType);
  }
  
  filters.specialties.forEach(specialty => {
    params.append('specialty', specialty);
  });
  
  params.set('sortBy', filters.sortBy);
  
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
};

export const searchDoctorsByName = (doctors: Doctor[], query: string): Doctor[] => {
  if (!query) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  return doctors
    .filter(doctor => doctor.name.toLowerCase().includes(lowerCaseQuery))
    .slice(0, 3);
};