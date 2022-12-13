import { useBlockUserMutation, useGetUsersMutation } from "app/api/adminApiSlice";
import { Layout } from "features/admin/components/Layout";
import TimeAgo from "components/TimeAgo";
import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const [getUsers] = useGetUsersMutation();
  const [blockUser, { isLoading }] = useBlockUserMutation();

  const getAllUsers = async () => {
    try {
      const response = await getUsers().unwrap();
      setUsers(response);
    } catch (err) {
      console.log(err.data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  const handleblock = async (current_user) => {
    try{
        const response = await blockUser({id:current_user.id, ...current_user, is_active: !current_user.is_active}).unwrap()
        console.log(response)
        getAllUsers()
    }
    catch(err){
        console.log(err);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8 ">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              User Management
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.username}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#141414] text-sm">
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-200 font-semibold whitespace-no-wrap">
                              {user.email}
                            </p>
                            <p className="text-gray-500 whitespace-no-wrap">
                              {user.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#141414] text-sm">
                        <p className="text-gray-300 whitespace-no-wrap">
                          {user.first_name} {user.last_name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#141414] text-sm">
                        <p className="text-gray-300 whitespace-no-wrap">
                          <TimeAgo timestamp={user.date_joined} />
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#141414] text-sm">
                        {user.is_active ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Active</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Inactive</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#141414] text-sm text-right">
                        <button 
                          type="button"
                          className="inline-block text-gray-500 hover:text-gray-700"
                          onClick={() => handleblock(user)}
                        >
                         {user.is_active ? 'Block' : 'Unblock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
