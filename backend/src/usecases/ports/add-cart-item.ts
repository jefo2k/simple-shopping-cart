import { AddToCartDto } from '../../dtos/add-to-cart-dto';

export interface AddCartItem {
  add: (addToCartDto: AddToCartDto, tenantId: string) => Promise<string>
}
