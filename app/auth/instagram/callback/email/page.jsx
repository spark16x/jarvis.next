'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/components/supabase_client.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default async function Email() {
let params= useSearchParams();
let id=params.get('id');
let user = await supabase.from('users_profile').select().eq('id', id).single();

  return (
    <div>
      {id ? (
        <p>Welcome, {user.data.name}</p> // Adjust according to decoded token structure
      ) : (
        <p >Loading... </p>
      )}
    </div>
  );
}