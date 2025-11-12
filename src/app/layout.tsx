import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Payload Posts App',
  description: 'A simple posts application built with PayloadCMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

