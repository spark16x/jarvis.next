'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function Email() {
let params= useSearchParams();
let id=params.get('id')

  return (
    <div>
      {id ? (
        <p>Welcome, {id}</p> // Adjust according to decoded token structure
      ) : (
        <p >Loading... </p>
      )}
    </div>
  );
}