
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AuthCard from '../../components/UI/auth/AuthCard';
import SignupForm from '../../components/UI/auth/SignupForm';

const SignupPage = () => {
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    const result = await signup(data);
    if (result.success) {
      navigate('/dashboard');
    }
    return result;
  };

  return (
    <AuthCard title="Create Account" subtitle="Join thousands of creatives showcasing their work">
      <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
    </AuthCard>
  );
};

export default SignupPage;