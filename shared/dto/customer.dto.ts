export interface CustomerAddressDTO {
  id?: number
  street?: string
  streetName?: string
  address?: string
  addressComplement?: string
  postalCode?: string
  city?: string
  country?: string | {
    name?: string
    label?: string
  }
  fullAddress?: {
    display_name?: string
    address?: {
      road?: string
      country?: string
    }
  }
}

export interface CustomerOrderDTO {
  id: number
  reference: string
  status: string
  subtotal: number
  fees: number
  tva: number
  total: number
  currency: string
  createdAt: string
  shippingInfo: Record<string, unknown>
  invoiceUrl: string | null
  items: Array<{
    productId: number
    name: string
    quantity: number
    unitPriceTTC: number
    totalTTC: number
  }>
}

export interface CustomerOrderListDTO {
  orders: CustomerOrderDTO[]
}

export default interface CustomerDTO {
  id: number
  surname: string | null
  name: string | null
  email: string | null
  addresses: CustomerAddressDTO[]
  orders: CustomerOrderDTO[]
}
