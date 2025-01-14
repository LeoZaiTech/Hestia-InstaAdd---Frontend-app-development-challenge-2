import { Vendor } from './vendor';

export interface Product {
  /**
   * Alt 1 Code associated with the product.
   */
  altCode?: string;
  /**
   * Link to the product in the enterprise search system.
   */
  enterpriseSearchUrl?: string;
  /**
   * Master Product ID.
   */
  mpid?: string;
  /**
   * Description.
   */
  description?: string;
  /**
   * Product code.
   */
  productCode?: string;
  /**
   * Product image URL.
   */
  imageUrl?: string;
  /**
   * UPC code associated with the product.
   */
  upc?: string;
  /**
   * Vendor.
   */
  vendor?: Vendor;
}

export interface ProductSearchRequest {
  /**
   * altCode when searching by altCode.
   */
  altCode?: string | null;
  /**
   * Product code when searching by product code.
   */
  productCode?: string | null;
  /**
   * UPC code when searching by UPC.
   */
  upc?: string | null;
  /**
   * Vendor name or identifier (required for product code and UPC search).
   */
  vendorId?: string | null;
}
