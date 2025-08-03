 

import { useNavigate } from 'react-router-dom';
import cro from '../Asset/f1.png';
import che from '../Asset/f2.png';
import cup from '../Asset/f3.png';
import cake from '../Asset/f4.png';

interface Product {
  id: number;
  name: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Croissant', image: cro },
  { id: 2, name: 'CheeseCake', image: che },
  { id: 3, name: 'Cupcake', image: cup },
  { id: 4, name: 'Cake', image: cake },
];

export default function Products() {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <h2 className="text-3xl font-script text-center text-secondary mb-12 font-fntprimary">New Products</h2>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="text-center group">
            <div className="mb-4 relative">
              <div className="absolute inset-0 rounded-full" />
              <img
                src={product.image}
                alt={product.name}
                className="w-1/2 object-cover mx-auto relative z-10 scale-90 group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(`/menu?category=${product.name}`)} // Navigate to menu with category
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}