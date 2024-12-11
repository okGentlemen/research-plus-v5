import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function useAuth() {
  const { token, userInfo } = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!token;

  return {
    isAuthenticated,
    userInfo,
    token
  };
}