export default function manifest() {
  return {
    name: 'Jarvis',
    short_name: 'Jarvis',
    description: 'Jarvis is a ai aegant Developed by Pratham vig',
    start_url: '/chat',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/imgs/jarvsi.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/imgs/jarvsi.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}