import dotenv from "dotenv";

dotenv.config();

export default function PushNotificationManager() {
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])
  
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }
  
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    // await subscribeUser(serializedSub)
  }
  
  // async function unsubscribeFromPush() {
  //   await subscription?.unsubscribe()
  //   setSubscription(null)
  //   await unsubscribeUser()
  // }
  
  // async function sendTestNotification() {
  //   if (subscription) {
  //     await sendNotification(message)
  //     setMessage('')
  //   }
  // }
  
  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }
  
  function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    
    useEffect(() => {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window).MSStream
      );
      
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);
    
    if (isStandalone) {
      return null; // Don't show install button if already installed
    }
    
    return (
      <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
    </div>
    );
  }
  
  
  
  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
      <InstallPrompt />
    </div>
  )
}