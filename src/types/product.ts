export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  meta: {
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
  };
  minimumOrderQuantity: number;
  returnPolicy: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    [key: string]: any;
  }>;
  shippingInformation: string;
  sku: string;
  tags: string[];
  warrantyInformation: string;
  weight: number;
}
