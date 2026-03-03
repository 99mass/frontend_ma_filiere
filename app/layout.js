import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "MaFiliere — Orientation Post-Bac au Senegal",
  description:
    "Plateforme intelligente pour trouver la filiere universitaire ideale basee sur vos notes du baccalaureat. Donnees officielles Campusen.",
  keywords:
    "orientation, bac, senegal, universite, campusen, filiere, recommandation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
