import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', { username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      toast.success('Signed up');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="input input-bordered w-full" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input input-bordered w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? '...' : 'Create account'}</button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="link">Login</Link></p>
    </div>
  );
};

export default SignupPage;


