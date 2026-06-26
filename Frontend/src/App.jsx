import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Router from './Router'
function App() {
  const { token, fetchUser } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return <Router />;


}

export default App;