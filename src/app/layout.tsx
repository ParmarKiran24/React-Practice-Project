import { ReactNode } from "react";
import ChakraProviders from "../providers/ChakraProviders.jsx";
import MainContainer from "../components/layout/MainContainer.jsx"
export const metadata = {
  title: "DU App",
  description: "Dynamic University app starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning prevents React from throwing a hydrate error for differences inside body */}
      <body suppressHydrationWarning>
        <ChakraProviders>
          <MainContainer />
          {children}
        </ChakraProviders>
      </body>
    </html>
  );
}
