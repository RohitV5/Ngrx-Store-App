
import { UserState } from '../user/state/user.reducer'

// Dont define state for lazy loading modules here like Product Module. we will have to extend this interface for that
// To check out lazy loaded module check the bundled file in chunks, for lazy modules extra chunks are created
// Lazy loading helps in improving perfomance and loading module when needed

// user Module is not lazy loaded to lets define that state interface. This is just for correct typying or strong typing
export interface State {
    user: UserState
}