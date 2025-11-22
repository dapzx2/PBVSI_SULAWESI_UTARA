import React from 'react';
import { Organizer } from '../types';

const ORGANIZERS: Organizer[] = [
  { id: 1, name: 'Ir. John Doe, M.Si', role: 'Ketua Umum', imageUrl: 'https://picsum.photos/150/150?random=10' },
  { id: 2, name: 'Michael Smith', role: 'Sekretaris Umum', imageUrl: 'https://picsum.photos/150/150?random=11' },
  { id: 3, name: 'Sarah Johnson', role: 'Bendahara', imageUrl: 'https://picsum.photos/150/150?random=12' },
  { id: 4, name: 'Coach Budi', role: 'Bidang Prestasi', imageUrl: 'https://picsum.photos/150/150?random=13' },
];

const Organization: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-pbvsi-red font-semibold tracking-wide uppercase">Struktur Organisasi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Pengurus PBVSI Sulut
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Berdedikasi untuk memajukan olahraga bola voli di Sulawesi Utara melalui manajemen yang profesional dan transparan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ORGANIZERS.map((person) => (
            <div key={person.id} className="bg-white rounded-lg shadow px-6 py-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mx-auto h-24 w-24 rounded-full overflow-hidden border-4 border-gray-100 mb-4">
                <img className="h-full w-full object-cover" src={person.imageUrl} alt={person.name} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
              <p className="text-sm text-pbvsi-red font-medium">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organization;