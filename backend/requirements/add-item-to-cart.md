# Add item to a shopping cart

## Success case

1. An item (product + quantity) is added into a specific shopping cart when: ✅
    - Product exists in catalog ✅
    - Product has availability ✅

## product already exists on cart

1. product quantity must be updated ✅

## Exception - product not found

1. System returns an 'product does not exist' error ✅

## Exception - invalid productId

1. System returns an 'invalid productId, must not be empty' error when empty ✅

## Exception - invalid quantity

1. System returns an 'invalid quantity, must be greater than 0' error ✅
1. System returns an 'invalid quantity, must be less than 10' error ✅

## Exception - Item not found in inventory

1. System returns an 'product unavailable' error ✅

## Exception - Item does not have availability in inventory

1. System returns an 'product out of stock' error ✅
