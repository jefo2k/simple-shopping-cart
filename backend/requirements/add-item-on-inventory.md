# Add item on inventory

## Success case

1. A inventory item is added to the inventory ✅

## Exception - product not found

1. System returns an 'product does not exist' error ✅

## Exception - invalid productId

1. System returns an 'invalid productId, must not be empty' error when empty ✅

## Exception - invalid quantity

1. System returns an 'invalid quantity, must be greater than 0' error ✅
1. System returns an 'invalid quantity, must be less than 99' error ✅

## Exception - inventory item already exists

1. System returns an 'inventory item already exists' error ✅
