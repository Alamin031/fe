import { apiClient } from "../client"
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductListResponse,
  ProductSearchResponse,
  ProductFilters,
} from "../types"
import { API_ENDPOINTS } from "../config"

export const productsService = {
  /**
   * Create a new product (Admin/Management only)
   */
  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>(API_ENDPOINTS.PRODUCTS_CREATE, data)
    return response.data
  },

  /**
   * Get all products with optional filters
   */
  getAll: async (filters?: ProductFilters, page = 1, limit = 20): Promise<ProductListResponse> => {
    const response = await apiClient.get<ProductListResponse>(API_ENDPOINTS.PRODUCTS_GET, {
      params: {
        page,
        limit,
        ...filters,
      },
    })
    return response.data
  },

  /**
   * Get featured products
   */
  getFeatured: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_FEATURED, {
      params: { limit },
    })
    return response.data
  },

  /**
   * Get new products
   */
  getNew: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_NEW, {
      params: { limit },
    })
    return response.data
  },

  /**
   * Get hot products
   */
  getHot: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_HOT, {
      params: { limit },
    })
    return response.data
  },

  /**
   * Search products
   */
  search: async (query: string, page = 1, limit = 20): Promise<ProductSearchResponse> => {
    const response = await apiClient.get<ProductSearchResponse>(API_ENDPOINTS.PRODUCTS_SEARCH, {
      params: { query, page, limit },
    })
    return response.data
  },

  /**
   * Get product by slug
   */
  getBySlug: async (slug: string): Promise<Product> => {
    const endpoint = API_ENDPOINTS.PRODUCTS_SLUG.replace("{slug}", slug)
    const response = await apiClient.get<Product>(endpoint)
    return response.data
  },

  /**
   * Get product by ID
   */
  getById: async (id: string): Promise<Product> => {
    const endpoint = API_ENDPOINTS.PRODUCTS_UPDATE.replace("{id}", id)
    const response = await apiClient.get<Product>(endpoint)
    return response.data
  },

  /**
   * Update product (Admin/Management only)
   */
  update: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const endpoint = API_ENDPOINTS.PRODUCTS_UPDATE.replace("{id}", id)
    const response = await apiClient.patch<Product>(endpoint, data)
    return response.data
  },

  /**
   * Delete product (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.PRODUCTS_DELETE.replace("{id}", id)
    await apiClient.delete(endpoint)
  },
}

export default productsService
