import { apiClient } from "../client"
import { SendMarketingEmailRequest, MarketingEmailResponse } from "../types"
import { API_ENDPOINTS } from "../config"

export const marketingService = {
  /**
   * Send marketing email
   */
  sendEmail: async (data: SendMarketingEmailRequest): Promise<MarketingEmailResponse[]> => {
    const response = await apiClient.post<MarketingEmailResponse[]>(API_ENDPOINTS.MARKETING_EMAIL, data)
    return response.data
  },

  /**
   * Get email campaign status
   */
  getCampaignStatus: async (campaignId: string): Promise<{
    id: string
    status: string
    sentCount: number
    openCount: number
    clickCount: number
    bounceCount: number
    createdAt: string
    updatedAt: string
  }> => {
    const endpoint = API_ENDPOINTS.MARKETING_CAMPAIGN_STATUS?.replace("{campaignId}", campaignId) || `/marketing/campaigns/${campaignId}`
    const response = await apiClient.get(endpoint)
    return response.data
  },

  /**
   * Get all campaigns
   */
  getAllCampaigns: async (page = 1, limit = 20): Promise<{
    data: Array<{
      id: string
      name: string
      status: string
      sentCount: number
      openRate: number
      clickRate: number
      createdAt: string
    }>
    pagination: {
      total: number
      currentPage: number
      perPage: number
      totalPages: number
    }
  }> => {
    const endpoint = API_ENDPOINTS.MARKETING_CAMPAIGNS || "/marketing/campaigns"
    const response = await apiClient.get(endpoint, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Create promotional banner
   */
  createBanner: async (data: {
    title: string
    description?: string
    image: string
    link?: string
    isActive: boolean
    displayFrom: string
    displayTo?: string
  }): Promise<{
    id: string
    title: string
    description?: string
    image: string
    link?: string
    isActive: boolean
  }> => {
    const endpoint = API_ENDPOINTS.MARKETING_BANNERS || "/marketing/banners"
    const response = await apiClient.post(endpoint, data)
    return response.data
  },

  /**
   * Get active banners
   */
  getActiveBanners: async (): Promise<Array<{
    id: string
    title: string
    description?: string
    image: string
    link?: string
    displayPosition: string
  }>> => {
    const endpoint = API_ENDPOINTS.MARKETING_BANNERS_ACTIVE || "/marketing/banners/active"
    const response = await apiClient.get(endpoint)
    return response.data
  },

  /**
   * Schedule email campaign
   */
  scheduleEmailCampaign: async (data: {
    name: string
    recipientSegment: string
    subject: string
    template: string
    scheduledAt: string
    templateVariables?: Record<string, unknown>
  }): Promise<{
    campaignId: string
    status: string
    scheduledAt: string
  }> => {
    const endpoint = API_ENDPOINTS.MARKETING_SCHEDULE_CAMPAIGN || "/marketing/schedule-campaign"
    const response = await apiClient.post(endpoint, data)
    return response.data
  },

  /**
   * Get customer segments
   */
  getSegments: async (): Promise<Array<{
    id: string
    name: string
    description: string
    customerCount: number
    createdAt: string
  }>> => {
    const endpoint = API_ENDPOINTS.MARKETING_SEGMENTS || "/marketing/segments"
    const response = await apiClient.get(endpoint)
    return response.data
  },

  /**
   * Send SMS notification
   */
  sendSMS: async (data: {
    phoneNumbers: string[]
    message: string
    scheduleTime?: string
  }): Promise<{
    status: string
    sentCount: number
    failedCount: number
  }> => {
    const endpoint = API_ENDPOINTS.MARKETING_SMS || "/marketing/sms"
    const response = await apiClient.post(endpoint, data)
    return response.data
  },
}

export default marketingService
