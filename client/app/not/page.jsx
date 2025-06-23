'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions.js'
import PushNotificationManager from '@/components/PushNotificationManager.jsx';

export default function page() {
  return(<PushNotificationManager />)
}