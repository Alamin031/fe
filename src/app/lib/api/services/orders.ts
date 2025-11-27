import { apiClient } from "../client"
import {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderInvoiceResponse,
  CalculateEMIRequest,
  CalculateEMIResponse,
} from "../types"
import { API_ENDPOINTS } from "../config"

export const ordersService = {
  /**
   * Create a new order
   */
  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<Order>(API_ENDPOINTS.ORDERS_CREATE, data)
    return response.data
  },

  /**
   * Get all orders (Admin/Management only)
   */
  getAll: async (page = 1, limit = 20): Promise<{ data: Order[]; pagination: unknown }> => {
    const response = await apiClient.get<{ data: Order[]; pagination: unknown }>(API_ENDPOINTS.ORDERS_GET, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get order by ID
   */
  getById: async (id: string): Promise<Order> => {
    const endpoint = API_ENDPOINTS.ORDERS_GET_ONE.replace("{id}", id)
    const response = await apiClient.get<Order>(endpoint)
    return response.data
  },

  /**
   * Update order status (Admin/Management only)
   */
  updateStatus: async (id: string, data: UpdateOrderStatusRequest): Promise<Order> => {
    const endpoint = API_ENDPOINTS.ORDERS_UPDATE_STATUS.replace("{id}", id)
    const response = await apiClient.patch<Order>(endpoint, data)
    return response.data
  },

  /**
   * Get order by order number
   */
  getByOrderNumber: async (orderNumber: string): Promise<Order> => {
    const response = await apiClient.get<Order>(API_ENDPOINTS.PRODUCTS_SEARCH, {
      params: { orderNumber },
    })
    return response.data
  },

  /**
   * Cancel order
   */
  cancel: async (id: string, reason?: string): Promise<Order> => {
    const endpoint = `/orders/${id}/cancel`
    const response = await apiClient.post<Order>(endpoint, { reason })
    return response.data
  },

  /**
   * Generate invoice for order
   */
  generateInvoice: async (id: string): Promise<OrderInvoiceResponse> => {
    const endpoint = API_ENDPOINTS.ORDERS_INVOICE.replace("{id}", id)
    const response = await apiClient.get<OrderInvoiceResponse>(endpoint)
    return response.data
  },

  /**
   * Calculate EMI for amount
   */
  calculateEMI: async (data: CalculateEMIRequest): Promise<CalculateEMIResponse> => {
    const response = await apiClient.post<CalculateEMIResponse>(API_ENDPOINTS.ORDERS_CALCULATE_EMI, data)
    return response.data
  },

  /**
   * Track order
   */
  track: async (orderNumber: string): Promise<{
    order: Order
    status: string
    estimatedDelivery: string
    trackingUpdates: Array<{ date: string; status: string; location: string }>
  }> => {
    const response = await apiClient.get(API_ENDPOINTS.TRACK_ORDER || "/orders/track", {
      params: { orderNumber },
    })
    return response.data
  },
}

export default ordersService
