
import React, { useState } from 'react';
import { Lock, ArrowLeft, AlertCircle, Volleyball } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for better UX feel
    setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
            onLogin();
        } else {
            setError('Username atau Password salah!');
            setIsLoading(false);
        }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pbvsi-red blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 blur-3xl opacity-10"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-fade-in">
        {/* Header with Logo */}
        <div className="bg-gray-900 p-8 text-center border-b border-gray-800">
            <div className="inline-flex items-center justify-center p-3 bg-pbvsi-red rounded-xl shadow-lg mb-4">
                <Volleyball className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">PBVSI Sulawesi Utara</h2>
            <p className="text-gray-400 text-sm mt-1">Sistem Manajemen Konten (CMS)</p>
        </div>

        <div className="p-8">
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Login Administrator</h3>
                <p className="text-sm text-gray-500">Masuk untuk mengelola berita, pertandingan, dan data.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center text-sm font-bold border border-red-100 animate-pulse">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Username</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-gray-50 outline-none transition-all font-medium text-gray-900"
                            placeholder="admin"
                            autoFocus
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Password</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-gray-50 outline-none transition-all font-medium text-gray-900"
                            placeholder="•••••"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-pbvsi-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all transform hover:-translate-y-1 flex justify-center items-center"
                >
                    {isLoading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memverifikasi...
                        </span>
                    ) : (
                        <span className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            Masuk Dashboard
                        </span>
                    )}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <button 
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 text-sm font-bold flex items-center justify-center mx-auto transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali ke Website Utama
                </button>
            </div>
        </div>
      </div>

      <div className="absolute bottom-6 text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} PBVSI Sulawesi Utara. Secure Admin Portal.
      </div>
    </div>
  );
};

export default AdminLogin;
