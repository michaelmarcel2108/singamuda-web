export default function Location() {
  return (
    <section id="location" className="py-20 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
            Visit Us
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2">
            LOKASI KAMI
          </h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-stone-400 text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Mari mampir dan nikmati seduhan kopi terbaik dari Singamuda secara langsung.
          </p>
        </div>

        <div className="bg-stone-950 p-2 sm:p-4 border border-stone-800/80 rounded-xl shadow-2xl">
          <div className="w-full h-[300px] sm:h-[400px] bg-stone-900 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.376221368915!2d115.07505245683465!3d-8.116587785936773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19b9d45983443%3A0x472862bbd84f407f!2sSingamuda%20Coffee!5e0!3m2!1sid!2sid!4v1783852951064!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4 sm:mt-6 text-center pb-2">
            <a
              href="https://maps.app.goo.gl/PuLpZM3aHHBQy2E88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors shadow-lg"
            >
              <i className="fa-solid fa-map-location-dot"></i>
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
