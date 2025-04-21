import React, { useState } from 'react';
export const UserDetailContext = React.createContext();

export function UserDetailProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);  // Assume you're setting this from some auth logic
  
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}
