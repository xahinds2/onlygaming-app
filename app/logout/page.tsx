"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/loading';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/logout`);
        localStorage.removeItem('userInfo');
        window.location.href = "/login"
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    handleLogout();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
}
