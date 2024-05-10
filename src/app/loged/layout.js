import NavbarLi from "@/components/navbarLi";
import "./globals.css";


export const metadata = {
  title: "AutoLife",
  description: "Generated by create next app",
};

export default function LogedLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white">
          <NavbarLi></NavbarLi>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
