// src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

interface UserProfile {
  "agbCode": string,
  "name"?: string,
  "phoneNumber"?: string,
  "email"?: string,
  "street"?: string,
  "houseNumber"?: string,
  "houseNumberAddition"?:string,
  "postalCode"?: string,
  "city"?: string,
  "createdAt"?: string,
  "updatedAt"?: string,
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = token && JSON.parse(atob(token.split('.')[1])).username;
        const response = await api.get('/getProfile/'+username);
        setProfile(response.data);
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <p>
          <strong>Agb Code:</strong> {profile.agbCode}
        </p>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Phone Number:</strong> {profile.phoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Street:</strong> {profile.street}
        </p>
        <p>
          <strong>House Number:</strong> {profile.houseNumber}
        </p>
        <p>
          <strong>House Number Addition:</strong> {profile.houseNumberAddition}
        </p>
        <p>
          <strong>Postal Code:</strong> {profile.postalCode}
        </p>
        <p>
          <strong>City:</strong> {profile.city}
        </p>
        <p>
          <strong>Created At:</strong> {profile.createdAt}
        </p>
        <p>
          <strong>Last Updated At:</strong> {profile.updatedAt}
        </p>
        
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
          onClick={() => {
            localStorage.removeItem('token')
            window.location.reload()
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Profile;
