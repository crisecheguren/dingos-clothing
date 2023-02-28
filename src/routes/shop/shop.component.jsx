import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';



const Shop = () => {
    const { products, setProducts } = useContext(ProductsContext);

    return (
        <div>
            {products.map( product => (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <img src={product.imageUrl} alt={product.name} />
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};
export default Shop;

