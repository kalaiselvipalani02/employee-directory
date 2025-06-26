import { Metadata } from "next";
import ApolloWrapper from "./ApolloWrapper";

export const metadata = {
  title: "Employee Directory",
  description: "MERN Stack Directory App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
