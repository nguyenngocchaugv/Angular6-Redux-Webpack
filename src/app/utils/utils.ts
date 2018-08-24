import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params, ActivatedRouteSnapshot } from '@angular/router';
import { BaseRequestOptions } from '@angular/http';

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.x, this enables powerful 
 * typerchecking ot our reducers.
 * 
 * Since every action label passes through this function it is a good place 
 * to ensure all of our action labels are unique 
 */

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type '${label}' is not unique`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot and returns
 * any pertinent information needed. The snapshot contains all information 
 * about the state of the router at the given point in time. The entire snapshot
 * is complex and not always needed. in this case, you only need the URL and
 * query parameters from the snapshot in the store. Other items could returned
 * such as route parameters and static route data.
 */

export class RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const queryParams = routerState.root.queryParams;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
        state = state.firstChild;
        }
        const { params } = state;

        return { url, queryParams, params };
    }
}


