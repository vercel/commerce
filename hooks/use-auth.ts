import AuthContext from 'contexts/auth-context';
import { useContext } from 'react';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
