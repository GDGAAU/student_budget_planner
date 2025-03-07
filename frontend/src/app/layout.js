import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SideBar from '../../components/SideBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Budget Planner',
  description: 'Budget Planner for university students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex antialiased gap-4 h-screen`}
      >
        <SideBar />
        {children}
      </body>
    </html>
  );
}
