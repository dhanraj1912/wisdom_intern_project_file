import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Globe, Mail, Phone } from 'lucide-react';
import { useUsers } from '../context/UserContext';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users } = useUsers();

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 dark:text-red-400">User not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Users
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {user.name}
        </h1>

        <div className="space-y-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Mail className="w-5 h-5 mr-3" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Phone className="w-5 h-5 mr-3" />
            <span>{user.phone}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Globe className="w-5 h-5 mr-3" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {user.website}
            </a>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Building className="w-5 h-5 mr-3" />
            <div>
              <p className="font-semibold">{user.company.name}</p>
              <p className="text-sm">{user.company.catchPhrase}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;