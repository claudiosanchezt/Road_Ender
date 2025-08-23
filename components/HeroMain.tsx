import React from 'react';

export default function HeroMain() {
  return (
    <header className="rounded-lg overflow-hidden bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-10">
      <div className="container mx-auto">
        {/* Slick carousel (jQuery) - load CSS and JS from CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />

        <div className="hero-slider max-w-3xl mx-auto" aria-live="polite">
          <div className="px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold">Descubrí experiencias locales únicas</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">Conectamos turistas con guías y hospedajes verificados en Chile.</p>
          </div>
          <div className="px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold">Conectá con guías locales expertos</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">Explorá tours verificados y anfitriones recomendados.</p>
          </div>
        </div>

        {/* Load jQuery and Slick from CDN and initialize with fade, dots and autoplay. */}
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (function waitForJQueryAndSlick(){
            var $ = window.jQuery;
            if(!$ || !($.fn && $.fn.slick)) { setTimeout(waitForJQueryAndSlick, 100); return; }
            $('.hero-slider').slick({
              dots: true,
              fade: true,
              autoplay: true,
              autoplaySpeed: 4000,
              arrows: true,
              accessibility: true,
              adaptiveHeight: true
            });
          })();
        `}} />
      </div>
    </header>
  );
}
