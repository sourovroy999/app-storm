import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import SingleProduct from "./SingleProduct";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from '../../Spinner/LoadingSpinner';

const Products = () => {
    const axiosCommon = useAxiosCommon()
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(10)
    const [searchInput, setSearchInput] = useState('')
    const [activeSearch, setActiveSearch] = useState('')

    const { data: productsData = {}, refetch, isLoading } = useQuery({
        queryKey: ['products', currentPage, productsPerPage, activeSearch],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: productsPerPage.toString()
            })

            if (activeSearch.trim()) {
                params.append('search', activeSearch.trim())
            }

            const { data } = await axiosCommon.get(`/products?${params}`)
            return data
        },
        onError: (err) => {
            console.log(err.message);
        },
        keepPreviousData: true
    })

    const products = productsData.products || []
    const totalProducts = productsData.total || 0
    const totalPages = productsData.totalPages || 1

    const handleSearch = () => {
        setActiveSearch(searchInput)
        setCurrentPage(1)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const clearSearch = () => {
        setSearchInput('')
        setActiveSearch('')
        setCurrentPage(1)
    }

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const getPageNumbers = () => {
        const pageNumbers = []
        const maxVisiblePages = 5
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push('...')
                pageNumbers.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1)
                pageNumbers.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                pageNumbers.push(1)
                pageNumbers.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push('...')
                pageNumbers.push(totalPages)
            }
        }
        
        return pageNumbers
    }

    if (isLoading && products.length === 0) return <LoadingSpinner />;

    return (
        <div className="pb-20">
            {/* Header */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mb-8">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">Discover Amazing Products</h1>
                    <p className="text-lg opacity-90">Find the perfect product for your needs</p>
                </div>
            </div> */}

            {/* Search Section */}
           <div className="max-w-2xl mx-auto my-4 px-4">
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-colors duration-300">
    <div className="flex flex-col sm:flex-row gap-4">
      
      {/* Search Input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search products, creators, descriptions..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}  // better than onKeyPress (deprecated)
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 
                     rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent text-gray-800 dark:text-gray-200 
                     placeholder-gray-500 dark:placeholder-gray-400
                     bg-white dark:bg-gray-800 transition-colors duration-300"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 
                   text-white font-medium rounded-xl transition-all duration-200
                   flex items-center justify-center gap-2 shadow-md"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>

      {/* Clear Button */}
      {activeSearch && (
        <button
          onClick={clearSearch}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 
                     text-white font-medium rounded-xl transition-all duration-200
                     shadow-md"
        >
          Clear
        </button>
      )}
    </div>
  </div>
</div>


            {/* Active Search Display */}
            {activeSearch && (
                <div className="max-w-2xl mx-auto mb-6 px-4">
                    <div className="bg-blue-50 border dark:bg-base-200 dark:border-base-200 border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-800 font-medium">Searching for:</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border">
                                    "{activeSearch}"
                                </span>
                            </div>
                            <button
                                onClick={clearSearch}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Info */}
            <div className="max-w-4xl mx-auto mb-6 px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-gray-600">
                        {totalProducts > 0 ? (
                            <>
                                {activeSearch && (
                                    <span className="text-blue-600 font-medium">
                                        {totalProducts} result{totalProducts !== 1 ? 's' : ''} found
                                    </span>
                                )}
                                {activeSearch && totalProducts > 0 && ' • '}
                                <span>
                                    Showing {((currentPage - 1) * productsPerPage) + 1}-{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts}
                                </span>
                            </>
                        ) : (
                            !isLoading && <span>No products found</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show:</span>
                        <select
                            value={productsPerPage}
                            onChange={(e) => {
                                setProductsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className="max-w-6xl mx-auto px-4">
                {isLoading && products.length === 0 ? (
                    <div className="flex justify-center py-12">
                        {/* <LoadingSpinner /> */}
                        <p>loading...</p>
                    </div>
                ) : products.length > 0 ? (
                    <ul className="list bg-base-100 max-w-2xl mx-auto">
                        {products.map(product => (
                            <SingleProduct 
                                key={product._id} 
                                product={product} 
                                refetch={refetch}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-4">
                                {activeSearch 
                                    ? "Try adjusting your search terms" 
                                    : "No products are currently available"
                                }
                            </p>
                            {activeSearch && (
                                <button
                                    onClick={clearSearch}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View All Products
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {getPageNumbers().map((pageNum, index) => (
                        <button
                            key={index}
                            onClick={() => typeof pageNum === 'number' && goToPage(pageNum)}
                            disabled={pageNum === '...'}
                            className={`px-3 py-2 text-sm rounded ${
                                pageNum === currentPage
                                    ? 'bg-blue-500 text-white'
                                    : pageNum === '...'
                                    ? 'bg-transparent text-gray-500 cursor-default'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;