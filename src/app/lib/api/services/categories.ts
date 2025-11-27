import { apiClient } from "../client"
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryProductsResponse,
  ProductFilters,
} from "../types"
import { API_ENDPOINTS } from "../config"

export const categoriesService = {
  /**
   * Create a new category (Admin only)
   */
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<Category>(API_ENDPOINTS.CATEGORIES_CREATE, data)
    return response.data
  },

  /**
   * Get all categories
   */
  getAll: async (page = 1, limit = 50): Promise<{ data: Category[]; pagination: unknown }> => {
    const response = await apiClient.get<{ data: Category[]; pagination: unknown }>(API_ENDPOINTS.CATEGORIES_GET, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get featured categories
   */
  getFeatured: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES_FEATURED)
    return response.data
  },

  /**
   * Get category by slug
   */
  getBySlug: async (slug: string): Promise<Category> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_SLUG.replace("{slug}", slug)
    const response = await apiClient.get<Category>(endpoint)
    return response.data
  },

  /**
   * Get products in category with filters
   */
  getProducts: async (
    slug: string,
    filters?: ProductFilters,
    page = 1,
    limit = 20,
  ): Promise<CategoryProductsResponse> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_PRODUCTS.replace("{slug}", slug)
    const response = await apiClient.get<CategoryProductsResponse>(endpoint, {
      params: {
        page,
        limit,
        ...filters,
      },
    })
    return response.data
  },

  /**
   * Update category (Admin only)
   */
  update: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_UPDATE.replace("{id}", id)
    const response = await apiClient.patch<Category>(endpoint, data)
    return response.data
  },

  /**
   * Delete category (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_DELETE.replace("{id}", id)
    await apiClient.delete(endpoint)
  },
}

export default categoriesService
