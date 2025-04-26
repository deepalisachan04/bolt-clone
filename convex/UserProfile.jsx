'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/convex/_generated/api';
const UserProfile = () => {
  const email = "user@example.com";  // Yahaan apne user ka actual email daalo

  // Use query with email as parameter
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', email],  // 'user' is the query key
    queryFn: () => api.users.GetUser({ email }),  // The fetch function
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
