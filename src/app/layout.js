// app/layout.js

import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="https://3pservicepartner.com.br/wp-content/uploads/2025/03/3P_logo-horizontal_1-1-e1744026584210.png"
        />
        <title>RaioX 3P</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />

        {/* Estilo inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .bg-consultoria {
            background-color: #043149;
          }
          .footer-text {
            color: white;
          }
        `}} />

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        {/* Meta Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1787819748758348');
            fbq('track', 'PageView');
          `}
        </Script>

      </head>

      <body>

        {children}

        {/* Fallback para quando o JS está desativado */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1787819748758348&ev=PageView&noscript=1"
          />
        </noscript>

      </body>
    </html>
  );
}
