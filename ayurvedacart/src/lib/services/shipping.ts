import { BaseService } from './base'
import type { Database } from '@/types/supabase'

interface ShippingAddress {
  first_name: string
  last_name: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone?: string
}

interface ShippingOption {
  id: string
  name: string
  description: string
  price: number
  estimated_days: number
  tracking_available: boolean
  insurance_included: boolean
  signature_required: boolean
}

interface ShippingCalculationData {
  items: Array<{
    product_id: string
    quantity: number
    weight: number
    dimensions: { length: number; width: number; height: number }
  }>
  origin_address: ShippingAddress
  destination_address: ShippingAddress
  declared_value: number
}

interface TrackingInfo {
  tracking_number: string
  status: string
  estimated_delivery: Date
  events: Array<{
    timestamp: Date
    location: string
    description: string
    status: string
  }>
}

export class ShippingService extends BaseService {
  
  async calculateShippingRates(data: ShippingCalculationData): Promise<ShippingOption[]> {
    return this.withErrorHandling(
      async () => {
        // Get shipping zone for destination country
        const { data: shippingZone } = await this.supabase
          .from('shipping_zones')
          .select('*')
          .contains('countries', [data.destination_address.country])
          .eq('is_active', true)
          .single()

        if (!shippingZone) {
          throw new Error('Shipping not available to this location')
        }

        // Calculate package weight and dimensions
        const totalWeight = data.items.reduce((sum, item) => sum + (item.weight * item.quantity), 0)
        const packageValue = data.declared_value

        // Base shipping options
        const options: ShippingOption[] = []

        // Standard shipping
        if (shippingZone.standard_rate !== null) {
          const standardPrice = this.calculateShippingPrice(
            shippingZone.standard_rate,
            totalWeight,
            packageValue,
            'standard'
          )

          options.push({
            id: 'standard',
            name: 'Standard Shipping',
            description: `Delivery within ${shippingZone.standard_delivery_days} business days`,
            price: standardPrice,
            estimated_days: shippingZone.standard_delivery_days,
            tracking_available: true,
            insurance_included: packageValue > 100,
            signature_required: false
          })
        }

        // Express shipping
        if (shippingZone.express_rate !== null) {
          const expressPrice = this.calculateShippingPrice(
            shippingZone.express_rate,
            totalWeight,
            packageValue,
            'express'
          )

          options.push({
            id: 'express',
            name: 'Express Shipping',
            description: `Delivery within ${shippingZone.express_delivery_days} business days`,
            price: expressPrice,
            estimated_days: shippingZone.express_delivery_days,
            tracking_available: true,
            insurance_included: true,
            signature_required: packageValue > 200
          })
        }

        // Overnight shipping (if available)
        if (shippingZone.overnight_available && shippingZone.overnight_rate !== null) {
          const overnightPrice = this.calculateShippingPrice(
            shippingZone.overnight_rate,
            totalWeight,
            packageValue,
            'overnight'
          )

          options.push({
            id: 'overnight',
            name: 'Overnight Shipping',
            description: 'Next business day delivery',
            price: overnightPrice,
            estimated_days: 1,
            tracking_available: true,
            insurance_included: true,
            signature_required: true
          })
        }

        // Free shipping check
        if (shippingZone.free_shipping_threshold && packageValue >= shippingZone.free_shipping_threshold) {
          const freeShippingOption = options.find(opt => opt.id === 'standard')
          if (freeShippingOption) {
            freeShippingOption.price = 0
            freeShippingOption.name = 'Free Standard Shipping'
          }
        }

        return options
      },
      { service: 'ShippingService', method: 'calculateShippingRates', params: data }
    )
  }

  async createShipment(orderId: string, shippingOption: string) {
    return this.withErrorHandling(
      async () => {
        // Get order details
        const { data: order } = await this.supabase
          .from('orders')
          .select(`
            *,
            order_items(*, products(*))
          `)
          .eq('id', orderId)
          .single()

        if (!order) {
          throw new Error('Order not found')
        }

        // Generate tracking number
        const trackingNumber = this.generateTrackingNumber()

        // Create shipment record
        const { data: shipment, error } = await this.supabase
          .from('shipments')
          .insert({
            order_id: orderId,
            tracking_number: trackingNumber,
            shipping_method: shippingOption,
            status: 'pending',
            shipping_address: order.shipping_address,
            estimated_delivery: this.calculateEstimatedDelivery(shippingOption),
            created_at: new Date().toISOString()
          })
          .select()
          .single()

        if (error) throw error

        // Update order with tracking number
        await this.supabase
          .from('orders')
          .update({
            tracking_number: trackingNumber,
            status: 'processing'
          })
          .eq('id', orderId)

        // Create shipping label (integration with shipping provider)
        const labelUrl = await this.createShippingLabel(shipment, order)

        // Update shipment with label URL
        await this.supabase
          .from('shipments')
          .update({ shipping_label_url: labelUrl })
          .eq('id', shipment.id)

        return {
          ...shipment,
          shipping_label_url: labelUrl
        }
      },
      { service: 'ShippingService', method: 'createShipment', params: { orderId, shippingOption } }
    )
  }

  async trackShipment(trackingNumber: string): Promise<TrackingInfo> {
    return this.withErrorHandling(
      async () => {
        // Get shipment details
        const { data: shipment } = await this.supabase
          .from('shipments')
          .select('*')
          .eq('tracking_number', trackingNumber)
          .single()

        if (!shipment) {
          throw new Error('Shipment not found')
        }

        // Get tracking events
        const { data: events } = await this.supabase
          .from('tracking_events')
          .select('*')
          .eq('shipment_id', shipment.id)
          .order('timestamp', { ascending: false })

        // Mock tracking info (in real implementation, this would call shipping provider API)
        const trackingInfo: TrackingInfo = {
          tracking_number: trackingNumber,
          status: shipment.status,
          estimated_delivery: new Date(shipment.estimated_delivery),
          events: events?.map(event => ({
            timestamp: new Date(event.timestamp),
            location: event.location,
            description: event.description,
            status: event.status
          })) || []
        }

        return trackingInfo
      },
      { service: 'ShippingService', method: 'trackShipment', params: { trackingNumber } }
    )
  }

  async updateShipmentStatus(trackingNumber: string, status: string, location?: string) {
    return this.withErrorHandling(
      async () => {
        // Get shipment
        const { data: shipment } = await this.supabase
          .from('shipments')
          .select('*')
          .eq('tracking_number', trackingNumber)
          .single()

        if (!shipment) {
          throw new Error('Shipment not found')
        }

        // Update shipment status
        await this.supabase
          .from('shipments')
          .update({
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', shipment.id)

        // Create tracking event
        await this.supabase
          .from('tracking_events')
          .insert({
            shipment_id: shipment.id,
            status,
            location: location || 'In Transit',
            description: this.getStatusDescription(status),
            timestamp: new Date().toISOString()
          })

        // Update order status if shipped or delivered
        if (status === 'shipped') {
          await this.supabase
            .from('orders')
            .update({
              status: 'shipped',
              shipped_at: new Date().toISOString()
            })
            .eq('id', shipment.order_id)
        } else if (status === 'delivered') {
          await this.supabase
            .from('orders')
            .update({
              status: 'delivered',
              delivered_at: new Date().toISOString()
            })
            .eq('id', shipment.order_id)
        }

        return { success: true }
      },
      { service: 'ShippingService', method: 'updateShipmentStatus', params: { trackingNumber, status } }
    )
  }

  async getShipmentsByOrder(orderId: string) {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('shipments')
          .select(`
            *,
            tracking_events(*)
          `)
          .eq('order_id', orderId)
          .order('created_at', { ascending: false })

        if (error) throw error
        return data
      },
      { service: 'ShippingService', method: 'getShipmentsByOrder', params: { orderId } }
    )
  }

  async validateAddress(address: ShippingAddress): Promise<{ valid: boolean; suggestions?: ShippingAddress[] }> {
    return this.withErrorHandling(
      async () => {
        // Address validation logic (would integrate with address validation service)
        const isValid = this.isValidAddress(address)
        
        if (isValid) {
          return { valid: true }
        } else {
          // Return suggestions for correction
          const suggestions = await this.getAddressSuggestions(address)
          return { valid: false, suggestions }
        }
      },
      { service: 'ShippingService', method: 'validateAddress', params: address }
    )
  }

  async calculateDeliveryDate(shippingMethod: string, destinationCountry: string): Promise<Date> {
    return this.withErrorHandling(
      async () => {
        const { data: zone } = await this.supabase
          .from('shipping_zones')
          .select('*')
          .contains('countries', [destinationCountry])
          .single()

        if (!zone) {
          throw new Error('Shipping zone not found')
        }

        const deliveryDays = this.getDeliveryDays(shippingMethod, zone)
        const deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)

        // Skip weekends for business days calculation
        while (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
          deliveryDate.setDate(deliveryDate.getDate() + 1)
        }

        return deliveryDate
      },
      { service: 'ShippingService', method: 'calculateDeliveryDate', params: { shippingMethod, destinationCountry } }
    )
  }

  private calculateShippingPrice(baseRate: number, weight: number, value: number, method: string): number {
    let price = baseRate

    // Weight-based pricing
    if (weight > 1) {
      price += (weight - 1) * 2 // $2 per additional kg
    }

    // Value-based insurance
    if (value > 100) {
      price += value * 0.01 // 1% insurance fee
    }

    // Method multipliers
    const multipliers = {
      standard: 1,
      express: 1.5,
      overnight: 2.5
    }

    price *= multipliers[method as keyof typeof multipliers] || 1

    return Math.round(price * 100) / 100 // Round to 2 decimal places
  }

  private generateTrackingNumber(): string {
    const prefix = 'AYU'
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}${timestamp}${random}`
  }

  private calculateEstimatedDelivery(shippingMethod: string): string {
    const days = {
      standard: 7,
      express: 3,
      overnight: 1
    }

    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + (days[shippingMethod as keyof typeof days] || 7))
    
    return deliveryDate.toISOString()
  }

  private async createShippingLabel(shipment: any, order: any): Promise<string> {
    // Mock shipping label creation (would integrate with shipping provider)
    // In real implementation, this would call FedEx, UPS, DHL APIs
    const labelUrl = `https://labels.ayurveda-royale.com/${shipment.tracking_number}.pdf`
    
    // Log label creation
    console.log(`Shipping label created for ${shipment.tracking_number}`)
    
    return labelUrl
  }

  private getStatusDescription(status: string): string {
    const descriptions = {
      pending: 'Shipment created, awaiting pickup',
      picked_up: 'Package picked up by carrier',
      in_transit: 'Package is in transit',
      out_for_delivery: 'Package is out for delivery',
      delivered: 'Package has been delivered',
      exception: 'Delivery exception occurred',
      returned: 'Package returned to sender'
    }

    return descriptions[status as keyof typeof descriptions] || 'Status updated'
  }

  private isValidAddress(address: ShippingAddress): boolean {
    // Basic validation (would use real address validation service)
    return !!(
      address.first_name &&
      address.last_name &&
      address.address_line_1 &&
      address.city &&
      address.state &&
      address.postal_code &&
      address.country
    )
  }

  private async getAddressSuggestions(address: ShippingAddress): Promise<ShippingAddress[]> {
    // Mock address suggestions (would use real address correction service)
    return [{
      ...address,
      city: address.city.charAt(0).toUpperCase() + address.city.slice(1).toLowerCase()
    }]
  }

  private getDeliveryDays(method: string, zone: any): number {
    switch (method) {
      case 'express':
        return zone.express_delivery_days || 3
      case 'overnight':
        return 1
      default:
        return zone.standard_delivery_days || 7
    }
  }

  async getShippingZones() {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('shipping_zones')
          .select('*')
          .eq('is_active', true)
          .order('name')

        if (error) throw error
        return data
      },
      { service: 'ShippingService', method: 'getShippingZones' }
    )
  }

  async updateShippingRates(zoneId: string, rates: any) {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('shipping_zones')
          .update({
            standard_rate: rates.standard_rate,
            express_rate: rates.express_rate,
            overnight_rate: rates.overnight_rate,
            free_shipping_threshold: rates.free_shipping_threshold,
            updated_at: new Date().toISOString()
          })
          .eq('id', zoneId)
          .select()
          .single()

        if (error) throw error
        return data
      },
      { service: 'ShippingService', method: 'updateShippingRates', params: { zoneId, rates } }
    )
  }
} 