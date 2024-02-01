import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <Typography variant="h1">Ski Gear Shop</Typography>
      <Catalog products={products}/>
    </div>
  );
}

export default App;
