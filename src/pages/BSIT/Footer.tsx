


export default function Footer(props){ 


    return ( 

        <footer className="bg-[#cc0000] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">BSIT Program</h3>
              <p className="text-gray-200">Shaping the future of IT education</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Programs</a></li>
                <li><a href="#" className="hover:underline">Admissions</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors">Facebook</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
                <a href="#" className="hover:text-gray-300 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p>&copy; {new Date().getFullYear()} BSIT Program. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}