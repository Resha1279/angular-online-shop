export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  rate: number;
  content: string;
  review: number;
  imageUrl: string;
  images: Array<string>;
}
