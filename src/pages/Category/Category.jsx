import React, { useEffect, useState, useMemo } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import './Category.css';
import Title from '../../components/Title/Title';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import axios from 'axios';
import CategoryMenu2 from '../../components/CategoryMenu2/CategoryMenu2';

const baseURL = 'http://127.0.0.1:8000/';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const productsPerPage = 6;

  const getDiscount = (original, current) => {
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  useEffect(() => {
    axios.get(`${baseURL}api/esaltare/products/filter`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get(`${baseURL}api/esaltare/categories`)
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // mapping category_id -> category name
  const productsWithCategoryName = useMemo(() => {
    return products.map(product => {
      const categoryObj = categories.find(c => c.id === product.category_id);
      return {
        ...product,
        categoryName: categoryObj ? categoryObj.name : 'Unknown'
      };
    });
  }, [products, categories]);
  console.log('my categories:', categories)
  // filter products based on selected category
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? productsWithCategoryName.filter(p => p.categoryName === selectedCategory)
      : productsWithCategoryName;
  }, [selectedCategory, productsWithCategoryName]);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
  };

  return (
    <div>
      <TopNavbar />
      <Navbar />
      <BottomNavBar />
      <div className='bottom-distance'></div>
      <Title title="Our Category" />
      <CategoryMenu2 categories={categories} onCategorySelect={handleCategorySelect} />

      <div className='ED-category-menu-products'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, i) => (
            <ProductCard2
              key={i}
              id={product.id}
              image={`${baseURL}storage/${product.image}`}
              title={product.description}
              originalprice={product.price}
              discount={product.sale}
              category={product.categoryName}
              description={product.description}
              slug={product.id}
            />
          ))
        ) : (
          <h2 className='ED-No-Product'>No products found in this category</h2>
        )}
      </div>

      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
