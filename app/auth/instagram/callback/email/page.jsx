'use client'

import { useSearchParams } from 'next/navigation'

export default function Email() {
  let param =useSearchParams();
  return (<div>{param.get('user')}</div>)
}