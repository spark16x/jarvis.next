export default function MusicPlayerContainer() {
  return (
    <div id="musicPlayerContainer" className="fixed top-0 right-0 w-[35vw] h-full bg-black border-l-2 border-white hidden z-[999]">
      <button className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1">X</button>
      <iframe id="musicPlayerIframe" className="w-full h-full" />
    </div>
  )
}
