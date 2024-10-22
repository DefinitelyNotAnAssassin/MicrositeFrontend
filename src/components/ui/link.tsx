
const Link = ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-[#cc0000] hover:underline">
      {children}
    </a>
  )

export default Link
  