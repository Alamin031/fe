
import { apiClient } from "../client"
import { LoyaltyPoints, LoyaltyTransaction, RedeemLoyaltyRequest, RedeemLoyaltyResponse } from "../types"
import { API_ENDPOINTS } from "../config"

export const loyaltyService = {
  /**
   * Get user loyalty points
   */
  getUserPoints: async (userId: string): Promise<LoyaltyPoints> => {
    const endpoint = API_ENDPOINTS.LOYALTY_POINTS.replace("{userId}", userId)
    const response = await apiClient.get<LoyaltyPoints>(endpoint)
    return response.data
  },

  /**
   * Get loyalty points history
   */
  getHistory: async (userId: string, page = 1, limit = 20): Promise<{ data: LoyaltyTransaction[]; pagination: unknown }> => {
    const endpoint = API_ENDPOINTS.LOYALTY_HISTORY.replace("{userId}", userId)
    const response = await apiClient.get<{ data: LoyaltyTransaction[]; pagination: unknown }>(
      endpoint,
      {
        params: { page, limit },
      },
    )
    return response.data
  },

  /**
   * Redeem loyalty points
   */
  redeem: async (userId: string, data: RedeemLoyaltyRequest): Promise<RedeemLoyaltyResponse> => {
    const endpoint = API_ENDPOINTS.LOYALTY_REDEEM.replace("{userId}", userId)
    const response = await apiClient.post<RedeemLoyaltyResponse>(endpoint, data)
    return response.data
  },

  /**
   * Get redemption options
   */
  getRedemptionOptions: async (userId: string): Promise<Array<{ points: number; reward: string; description: string }>> => {
    const endpoint = API_ENDPOINTS.LOYALTY_OPTIONS?.replace("{userId}", userId) || `/loyalty/${userId}/options`
    const response = await apiClient.get<Array<{ points: number; reward: string; description: string }>>(
      endpoint,
    )
    return response.data
  },

  /**
   * Check available balance
   */
  getBalance: async (userId: string): Promise<{ availablePoints: number; pendingPoints: number; totalPoints: number }> => {
    const endpoint = API_ENDPOINTS.LOYALTY_BALANCE?.replace("{userId}", userId) || `/loyalty/${userId}/balance`
    const response = await apiClient.get<{ availablePoints: number; pendingPoints: number; totalPoints: number }>(
      endpoint,
    )
    return response.data
  },

  /**
   * Get tier information
   */
  getTier: async (userId: string): Promise<{ tier: string; earnRate: number; redeemRate: number; benefits: string[] }> => {
    const endpoint = API_ENDPOINTS.LOYALTY_TIER?.replace("{userId}", userId) || `/loyalty/${userId}/tier`
    const response = await apiClient.get<{ tier: string; earnRate: number; redeemRate: number; benefits: string[] }>(
      endpoint,
    )
    return response.data
  },

  /**
   * Manually add points (Admin only)
   */
  addPoints: async (userId: string, points: number, reason: string): Promise<LoyaltyTransaction> => {
    const endpoint = API_ENDPOINTS.LOYALTY_ADD_POINTS?.replace("{userId}", userId) || `/loyalty/${userId}/add-points`
    const response = await apiClient.post<LoyaltyTransaction>(endpoint, {
      points,
      reason,
    })
    return response.data
  },
}

export default loyaltyService
