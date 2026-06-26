
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { usePortfolioStore } from './store/portfolioStore';
import Router from './Router';

function App() {
  const { token, isAuthenticated, fetchUser } = useAuthStore();
  const { fetchPortfolio } = usePortfolioStore();

  useEffect(() => {
    if (token && isAuthenticated) {
      fetchUser();
      fetchPortfolio();
    }
  }, [token, isAuthenticated, fetchUser, fetchPortfolio]);

  return <Router />;
}

export default App;