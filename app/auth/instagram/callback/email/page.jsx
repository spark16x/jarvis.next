'use client'

import { useSearchParams } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function Email() {
  let params = useCookies();

   const user = params.get('user');

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}</p> // Adjust according to decoded token structure
      ) : (
        <p >Loading... </p>
      )}
    </div>
  );
}