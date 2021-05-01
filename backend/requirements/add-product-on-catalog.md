# Add product on catalog

## Success case

1. A product is added to the product catalog ✅

## Exception - invalid id

1. System returns an 'invalid id' error when empty ✅

## Exception - invalid name

1. System returns an 'invalid name, must not be empty' error when empty ✅
1. System returns an 'invalid name, has more than 60 chars' error when lengh has more than 60 chars ✅

## Exception - invalid description

1. System returns an 'invalid description, must not be empty' error when empty ✅
1. System returns an 'invalid description, has more than 255 chars' error when lengh has more than 60 chars ✅

## Exception - product already exists

1. System returns a 'product already exists' error ✅
