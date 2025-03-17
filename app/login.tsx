import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/auth/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'login', email, password }),
    });

    const data = await res.json();
    setLoading(false);

    console.log('Login Response:', data); // Debugging line

    if (data.success) {
      console.log('Redirecting to dashboard...'); // Debugging line
      router.replace('/dashboard'); // Use replace instead of push
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>
      <p>
        <span>After logging in, you will be redirected to the dashboard.</span>
      </p>
    </form>
  );
} 