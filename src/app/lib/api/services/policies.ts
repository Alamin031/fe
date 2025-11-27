import { apiClient } from "../client"
import { Policy, CreatePolicyRequest, UpdatePolicyRequest } from "../types"
import { API_ENDPOINTS } from "../config"

export const policiesService = {
  /**
   * Create policy (Admin only)
   */
  create: async (data: CreatePolicyRequest): Promise<Policy> => {
    const response = await apiClient.post<Policy>(API_ENDPOINTS.POLICIES_CREATE, data)
    return response.data
  },

  /**
   * Get all policies
   */
  getAll: async (page = 1, limit = 20): Promise<{ data: Policy[]; pagination: unknown }> => {
    const response = await apiClient.get<{ data: Policy[]; pagination: unknown }>(API_ENDPOINTS.POLICIES_GET, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get policy by slug
   */
  getBySlug: async (slug: string): Promise<Policy> => {
    const endpoint = API_ENDPOINTS.POLICIES_SLUG.replace("{slug}", slug)
    const response = await apiClient.get<Policy>(endpoint)
    return response.data
  },

  /**
   * Get policy by ID
   */
  getById: async (id: string): Promise<Policy> => {
    const endpoint = API_ENDPOINTS.POLICIES_GET_ONE?.replace("{id}", id) || `/policies/${id}`
    const response = await apiClient.get<Policy>(endpoint)
    return response.data
  },

  /**
   * Get all published policies
   */
  getPublished: async (): Promise<Policy[]> => {
    const endpoint = API_ENDPOINTS.POLICIES_PUBLISHED || "/policies/published"
    const response = await apiClient.get<Policy[]>(endpoint)
    return response.data
  },

  /**
   * Update policy (Admin only)
   */
  update: async (slug: string, data: UpdatePolicyRequest): Promise<Policy> => {
    const endpoint = API_ENDPOINTS.POLICIES_UPDATE.replace("{slug}", slug)
    const response = await apiClient.patch<Policy>(endpoint, data)
    return response.data
  },

  /**
   * Delete policy (Admin only)
   */
  delete: async (slug: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.POLICIES_DELETE.replace("{slug}", slug)
    await apiClient.delete(endpoint)
  },
}

export default policiesService
