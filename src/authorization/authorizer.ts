import { Operation, Permission, Request, Authorization } from './model';
import * as _ from 'lodash';

/**
 * Authorizes the given request against the given permissions
 * @param request the given request
 * @param permissions the given permissions
 */
export function authorizeRequest(request: Request, permissions : Permission[]) : Authorization {
    const operation = getOperation(request);
    if(!operation) {
        // unknown operation
        return DENY();
    }

    // get allowed resources for the requested operation, split them into arrays
    const allowedResourcePaths = permissions
        .filter(perm => _.includes(perm.operations, operation))
        .map(perm => perm.resource.split('/')
        .filter(x => x)); // 'filter' removes empty elements caused by leading/trailing slashes

    // split the request URL into an array
    const splitUrl = request.url.split('/')
        .filter(x => x); // remove empty elements caused by leading/trailing slashes

    // return true if any resource path matches the url
    const access = allowedResourcePaths.map(path => match(splitUrl, path, operation))
        .filter(access => access.access == 'ALLOW');

    if(_.isEmpty(access)) {
        return DENY();
    }

    if(_.some(access, acc => acc.endpoints == null)) {
        return ALLOW();
    } else {
        return ALLOW(_.uniq(_.flatMap(access, acc => acc.endpoints || [])));
    }
}

/**
 * Authorizes the given request url against the given resource-permission path
 * @param url the tokenized request url
 * @param resourcePath the tokenized resource-permisssion path
 * @param operation the operation that is being performed in the request
 */
function match(url : string[], resourcePath : string[], operation : Operation) : Authorization {
    if(url.length == 0 && resourcePath.length == 0) {
        // exact match
        return ALLOW();
    }
        
    const pathHead = _.head(resourcePath);
    if(pathHead == '**')
        return ALLOW();
    
    const urlHead = _.head(url);
    if(urlHead) {
        if(urlHead == pathHead || pathHead == '*')
            return match(_.tail(url), _.tail(resourcePath), operation);

        if(resourcePath.length == 1 && pathHead && isCompound(pathHead)) {
            const endpoints = getCompoundEndpoints(pathHead);
            if(_.includes(endpoints, urlHead)) {
                // url matched one of the allowed endpoints
                return ALLOW();
            }
        }
    } else {
        if(resourcePath.length == 1 && pathHead) {
            if(pathHead == '*')
                return ALLOW();

            // path ends with a compound e.g. [name, description]
            if(isCompound(pathHead)) { 
                // allow with the given endpoints
                const endpoints = getCompoundEndpoints(pathHead);
                return ALLOW(endpoints); 
            }

            // allow with last remaining endpoint
            return ALLOW([pathHead]);
        }

        if(operation == 'R' && pathHead) {
            if(pathHead == '*')
                return ALLOW();
            else
                return ALLOW([pathHead]);
        }
    }

    return DENY();
}

/**
 * Gets the operation of the given request
 * @param request the given request
 */
function getOperation(request: Request) : Operation | null {
    const method = (request.method || '').toUpperCase();

    if(method == 'GET') return 'R';
    else if (method == 'POST') return 'C';
    else if (method == 'PUT' || method == 'PATCH') return 'U';
    else if (method == 'DELETE') return 'D';
    
    // unknown operation
    return null;
}

/**
 * Returns true if the input starts and ends with '[' and ']'
 * @param input the input string
 */
function isCompound(input : string) {
    return input[0] == '[' && input[input.length - 1] == ']';
}

/**
 * Parses a string surounded by with '[' and ']' and splits it
 * @param input the input string
 */
function getCompoundEndpoints(input : string) {
    return input.substr(1, input.length - 2)
        .split(',')
        .map(s => s.trim());
}

function ALLOW(endpoints? : string[]) {
    return authorize('ALLOW', endpoints);
}

function DENY() {
    return authorize('DENY');
}

/**
 * Returns a new authorization object
 * @param access whether the authorization is allowed or denied
 * @param endpoints the restricted endpoints of the authorization, if any
 */
function authorize(access : 'ALLOW' | 'DENY', endpoints? : string[]) : Authorization {
    return {
        access : access,
        endpoints : endpoints || null
    };
}