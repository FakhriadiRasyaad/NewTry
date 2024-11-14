"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../components/SupabaseClient';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


type User = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  is_admin: boolean;
};

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Gunakan tipe User
  const [error, setError] = useState('');
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        router.push('/login');
      } else {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (data && data.is_admin !== undefined) {
          setIsCurrentUserAdmin(data.is_admin); // Cek data sebelum akses
        }
      }
    };

    checkUserStatus();
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, is_admin');

    if (error) {
      setError('Error fetching users');
    } else {
      setUsers(data || []); 
    }
  };

  const handleAdminButtonClick = () => {
    router.push('/user/useradmin');
  };
  const handleAdminButtonClicks = () => {
    router.push('/user/dokument');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 lg:p-12 relative mt-24 pt-10"> 
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar User</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-8 w-full max-w-6xl">
          {users.length > 0 ? (
            <div className="overflow-x-auto shadow-md rounded-lg border border-black">
              <table className="table-auto w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avatar</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Full Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition duration-200">
                      <td className="border px-4 py-2">
                      {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <span className="text-gray-500">No Avatar</span>
                        )}
                      </td>
                      <td className="border px-4 py-2">{user.full_name}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Tidak ada pengguna</p>
          )}
        </div>


        {isCurrentUserAdmin && (
          <div className="absolute top-4 right-4 flex items-center">
           <button
              onClick={handleAdminButtonClick}
              className=" bg-red-500 hover:bg-red-800 text-white px-4  mx-1 py-2 rounded"
            >
              <span className="text-base font-semibold">Tambahkan User</span>
            </button>
            <button
              onClick={handleAdminButtonClicks}
              className=" bg-red-500 hover:bg-red-800 text-white px-4 mx-1 py-2 rounded"
            >
              <span className="text-base font-semibold">Semua Dokumen</span>
            </button>
          </div>
        )}
        
        <div className="mt-20"> 
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
