import { apiClient } from "../client"
import { Review, CreateReviewRequest, ReviewListResponse } from "../types"
import { API_ENDPOINTS } from "../config"

export const reviewsService = {
  /**
   * Create review (Authenticated users only)
   */
  create: async (data: CreateReviewRequest): Promise<Review> => {
    const response = await apiClient.post<Review>(API_ENDPOINTS.REVIEWS_CREATE, data)
    return response.data
  },

  /**
   * Get reviews by product
   */
  getByProduct: async (productId: string, page = 1, limit = 10): Promise<ReviewListResponse> => {
    const endpoint = API_ENDPOINTS.REVIEWS_GET.replace("{productId}", productId)
    const response = await apiClient.get<ReviewListResponse>(endpoint, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get review by ID
   */
  getById: async (id: string): Promise<Review> => {
    const endpoint = API_ENDPOINTS.REVIEWS_GET_ONE?.replace("{id}", id) || `/reviews/${id}`
    const response = await apiClient.get<Review>(endpoint)
    return response.data
  },

  /**
   * Update review
   */
  update: async (id: string, data: Partial<CreateReviewRequest>): Promise<Review> => {
    const endpoint = API_ENDPOINTS.REVIEWS_UPDATE?.replace("{id}", id) || `/reviews/${id}`
    const response = await apiClient.patch<Review>(endpoint, data)
    return response.data
  },

  /**
   * Delete review (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.REVIEWS_DELETE.replace("{id}", id)
    await apiClient.delete(endpoint)
  },

  /**
   * Mark review as helpful
   */
  markHelpful: async (id: string): Promise<Review> => {
    const endpoint = API_ENDPOINTS.REVIEWS_MARK_HELPFUL?.replace("{id}", id) || `/reviews/${id}/helpful`
    const response = await apiClient.post<Review>(endpoint)
    return response.data
  },

  /**
   * Mark review as unhelpful
   */
  markUnhelpful: async (id: string): Promise<Review> => {
    const endpoint = API_ENDPOINTS.REVIEWS_MARK_UNHELPFUL?.replace("{id}", id) || `/reviews/${id}/unhelpful`
    const response = await apiClient.post<Review>(endpoint)
    return response.data
  },

  /**
   * Get user reviews
   */
  getByUser: async (userId: string, page = 1, limit = 10): Promise<{ data: Review[]; pagination: unknown }> => {
    const endpoint = API_ENDPOINTS.REVIEWS_GET_BY_USER || "/reviews/user"
    const response = await apiClient.get<{ data: Review[]; pagination: unknown }>(endpoint, {
      params: { userId, page, limit },
    })
    return response.data
  },

  /**
   * Get verified reviews only
   */
  getVerified: async (productId: string, page = 1, limit = 10): Promise<ReviewListResponse> => {
    const endpoint = API_ENDPOINTS.REVIEWS_GET_VERIFIED || "/reviews/verified"
    const response = await apiClient.get<ReviewListResponse>(endpoint, {
      params: { productId, page, limit },
    })
    return response.data
  },
}

export default reviewsService
