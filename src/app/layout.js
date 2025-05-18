

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
        <title>Cadastro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: "\n        .bg-consultoria {\n            background-color: #043149;\n        }\n\n        .footer-text {\n            color: white;\n        }\n    " }} />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>

      <body>

        {children}

      </body>
    </html>
  );
}
