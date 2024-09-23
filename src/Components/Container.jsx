/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Header from "./Header";
import Maincontent from "./Maincontent";
import { Toaster } from 'react-hot-toast';

export default function Container({children}) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Toaster/>
        <Maincontent />
        {children}
      </main>
      <Footer />
    </>
  );
}
