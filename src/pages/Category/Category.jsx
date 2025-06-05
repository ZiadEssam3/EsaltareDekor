import React, { useState } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import './Category.css';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import Title from '../../components/Title/Title';
import { ProductCategory } from '../../assets/assets';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const productsPerPage = 6;

  const getDiscount = (original, current) => {
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? ProductCategory.filter(product => product.category === selectedCategory)
    : ProductCategory;

  // Pagination 
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      <TopNavbar />
      <Navbar />
      <BottomNavBar />
      <div className='bottom-distance'></div>
      <Title title="Our Category" />

      <CategoryMenu onCategorySelect={handleCategorySelect} />
      {/* Pass category select handler */}
      <div className='ED-category-menu-products'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, i) => (
            <ProductCard2
              className='ED-category-menu-product'
              key={i}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.originalPrice}
              discount={getDiscount(product.originalPrice, product.price)}
              slug={product.slug}
            />
          ))
        ) : (
          <h2 className='ED-No-Product'>No products found in this category</h2> 
        )}
      </div>

      {/* Pagination */}
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
