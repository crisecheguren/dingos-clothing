import {  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import { selectCategoriesMap } from '../../store/categories/category.selector';


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);


    
    return (
    <Fragment>
        <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>   
            <CategoryContainer>

        
            {
                products && products.map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                    );
                })

            }
        </CategoryContainer>

    </Fragment>

    );
}

export default Category;