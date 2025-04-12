export default function IframeContainer() {
  return (
    <div id="iframeContainer" className="fixed top-0 left-0 w-[35vw] h-full bg-black border-r-2 border-white hidden z-[999]">
      <button className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1">X</button>
      <iframe id="sideIframe" className="w-full h-full" />
    </div>
  )
}
