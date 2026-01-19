import { useEffect, useState } from "react";

function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setYear(currentYear);
  }, []);
  return (
    <footer className="border-t py-6 text-center text-sm text-gray-500">
      © {year} Iris Store. All rights reserved.
    </footer>
  );
}

export default Footer;
