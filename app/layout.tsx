// STYLES
import '@/styles/_core.css'
import '@/styles/fetch.css'
// STATIC ASSETS
import logoImage from '@/public/logo.png'
// NEXT COMPONENTS
import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="author" content="Jeffrey Lemay" />

        <title>Fetch - Frontend Project</title>
        <meta name="description" content="A sample project for adopting dogs. Filter, sort, favorite, and get matched with the perfect pup for you!" />

      </head>
      <body>
        <div className="body-wrapper">
          <header className="page-header">
            <div className="content container">
              <div className="brand">
                <div className="logo-wrapper">
                  <Image
                    className="logo"
                    src={logoImage}
                    alt="Logo for Fetch Frontend Project"
                  />
                </div>
              </div>
              <div className="intro-text">
                <h1>
                  Fetch Frontend Project
                </h1>
              </div>
            </div>
          </header>
          <main className="page-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}