import React from 'react';
import { ArrowUpDown, Loader } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 5;

const Home: React.FC = () => {
  const {
    users,
    loading,
    error,
    searchTerm,
    sortDirection,
    currentPage,
    setSortDirection,
  } = useUsers();

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-grow">
          <SearchBar />
        </div>
        <button
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort {sortDirection === 'asc' ? 'Z-A' : 'A-Z'}
        </button>
      </div>

      <div className="grid gap-6 mb-8">
        {paginatedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Home;