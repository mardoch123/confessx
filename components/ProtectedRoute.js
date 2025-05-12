import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === 'loading';

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push('/auth/signin');
      } else if (adminOnly && session.user.role !== 'admin') {
        router.push('/');
      }
    }
  }, [session, loading, adminOnly, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (adminOnly && session.user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}