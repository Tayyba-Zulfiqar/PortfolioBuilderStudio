
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AuthCard from '../../components/UI/auth/AuthCard';
import LoginForm from '../../components/UI/auth/LoginForm';


const LoginPage = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    // Pass form data to the store action
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate('/dashboard');
    }
    return result;
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to continue building your story">
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </AuthCard>
  );
};

export default LoginPage;