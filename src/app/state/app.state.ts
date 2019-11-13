import { ProductState } from '../products/state/product.reducer'

// Dont define state for lazy loading module here like Product. we will have to extend this interface for that
// To check out lazy loaded module check the bundled file in chunks, for lazy modules extra chunks are created
// Lazy loading helps in improving perfomance and loading module when needed
export interface State {
    product: ProductState,
    user: any
}