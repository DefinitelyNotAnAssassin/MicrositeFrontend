import React, { useMemo, useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { ProgramContext } from './contexts/ProgramContext';
import { GetSubdomain } from './utils/Subdomain';
import { GetProgramName, GetProgramDescription } from './utils/ProgramHelper';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  const subdomain = GetSubdomain();
  const programName = GetProgramName(subdomain);
  const programDescription = GetProgramDescription(subdomain);
  const programAbbreviation = subdomain.toUpperCase();

  const programProvider = useMemo(() => ({
    programName,
    programDescription,
    programAbbreviation,
  }), [programName, programDescription, programAbbreviation]);



  const [message, setMessage] = useState('');  

  

  return (

  <AuthProvider>
    <ProgramContext.Provider value={programProvider}>
      <RouterProvider router={router} />
    </ProgramContext.Provider>
  </AuthProvider>

  );
}