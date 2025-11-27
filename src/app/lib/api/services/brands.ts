import { apiClient } from "../client"
import { Brand, CreateBrandRequest, UpdateBrandRequest, BrandProductsResponse } from "../types"
import { API_ENDPOINTS } from "../config"

export const brandsService = {
  /**
   * Create a new brand (Admin only)
   */
  create: async (data: CreateBrandRequest): Promise<Brand> => {
    const response = await apiClient.post<Brand>(API_ENDPOINTS.BRANDS_CREATE, data)
    return response.data
  },

  /**
   * Get all brands
   */
  getAll: async (page = 1, limit = 50): Promise<{ data: Brand[]; pagination: unknown }> => {
    const response = await apiClient.get<{ data: Brand[]; pagination: unknown }>(API_ENDPOINTS.BRANDS_GET, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get featured brands
   */
  getFeatured: async (): Promise<Brand[]> => {
    const response = await apiClient.get<Brand[]>(API_ENDPOINTS.BRANDS_FEATURED)
    return response.data
  },

  /**
   * Get brand by slug
   */
  getBySlug: async (slug: string): Promise<Brand> => {
    const endpoint = API_ENDPOINTS.BRANDS_SLUG.replace("{slug}", slug)
    const response = await apiClient.get<Brand>(endpoint)
    return response.data
  },

  /**
   * Get products by brand
   */
  getProducts: async (slug: string, page = 1, limit = 20): Promise<BrandProductsResponse> => {
    const endpoint = API_ENDPOINTS.BRANDS_PRODUCTS.replace("{slug}", slug)
    const response = await apiClient.get<BrandProductsResponse>(endpoint, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Update brand (Admin only)
   */
  update: async (id: string, data: UpdateBrandRequest): Promise<Brand> => {
    const endpoint = API_ENDPOINTS.BRANDS_UPDATE.replace("{id}", id)
    const response = await apiClient.patch<Brand>(endpoint, data)
    return response.data
  },

  /**
   * Delete brand (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.BRANDS_DELETE.replace("{id}", id)
    await apiClient.delete(endpoint)
  },
}

export default brandsService
