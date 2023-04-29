import {  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../store/categories/category.selector';


const Category = () => {
    const { category } = useParams();
    console.log('render/re-render category component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    

    useEffect(() => {
        console.log('useEffect in category component')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);


    
    return (
    <Fragment>
        <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
        {
            isLoading ? (
                <Spinner /> )
                 : (
   
            <CategoryContainer>

        
            {
                products && products.map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                    );
                })

            }
        </CategoryContainer>
        )}
    </Fragment>

    );
}

export default Category;