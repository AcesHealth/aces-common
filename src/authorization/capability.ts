import { Permission } from './model';
import { authorizeRequest } from './authorizer';

// default permissions, client can set these using 'setPermissions'
let defaultPermissions = [] as Permission[];

/**
 * Convenience function used to set default permissions so client
 * does not always have to pass them in the the below functions
 * @param permissions The permissions to use by default in the below functions
 */
export function setPermissions(permissions : Permission[]) {
    defaultPermissions = permissions;
}

/**
 * Returns true if the given permissions allow creating an organization
 * @param permissions The given permissions
 */
export function createOrganization(permissions : Permission[] = defaultPermissions) {
    return canCreate('organizations', permissions);
}

/**
 * Returns true if the given permissions allow deleting the given organization
 * @param orgId The given organization
 * @param permissions The given permissions
 */
export function deleteOrganization(orgId : number, permissions : Permission[] = defaultPermissions) {
    return canDelete(`organizations/${orgId}`, permissions);
}

/**
 * Returns a list of editable fields for the given organziation and permissions
 * @param orgId The given organization
 * @param permissions The given permissions
 */
export function getEditableOrganizationFields(orgId : number, permissions : Permission[] = defaultPermissions) {
    return getEditableFields(`organizations/${orgId}`, permissions);
}

/**
 * Returns true if the given permissions allow creating a trial in the given organization
 * @param orgId The given organization
 * @param permissions The given permissions
 */
export function createTrial(orgId : number, permissions : Permission[] = defaultPermissions) {
    return canCreate(`organizations/${orgId}/trials`, permissions);
}

/**
 * Returns true if the given permissions allow deleting the given trial
 * @param orgId The given organization
 * @param trialId The given trial
 * @param permissions The given permissions
 */
export function deleteTrial(orgId : number, trialId : number, permissions : Permission[] = defaultPermissions) {
    return canDelete(`organizations/${orgId}/trials/${trialId}`, permissions);
}

/**
 * Returns a list of editable fields for the given trial and permissions
 * @param orgId The given organization
 * @param trialId The given trial
 * @param permissions The given permissions
 */
export function getEditableTrialFields(orgId : number, trialId : number, permissions : Permission[] = defaultPermissions) {
    return getEditableFields(`organizations/${orgId}/trials/${trialId}`, permissions);
}

/**
 * Returns true if the given permissions allow creating a survey in the given organization and trial
 * @param orgId The given organization
 * @param trialId The given organization
 * @param permissions The given permissions
 */
export function createSurvey(orgId : number, trialId : number, permissions : Permission[] = defaultPermissions) {
    return canCreate(`organizations/${orgId}/trials/${trialId}/surveys`, permissions);
}

/**
 * Returns true if the given permissions allow view a given survey
 * @param orgId The given organization
 * @param trialId The given organization
 * @param surveyId The given survey
 * @param permissions The given permissions
 */
export function viewSurvey(orgId : number, trialId : number, surveyId : number, permissions : Permission[] = defaultPermissions) {
    return canRead(`organizations/${orgId}/trials/${trialId}/surveys/${surveyId}`, permissions);
}

/**
 * Returns true if the given permissions allow deleting a given survey
 * @param orgId The given organization
 * @param trialId The given organization
 * @param surveyId The given survey
 * @param permissions The given permissions
 */
export function deleteSurvey(orgId : number, trialId : number, surveyId : number, permissions : Permission[] = defaultPermissions) {
    return canDelete(`organizations/${orgId}/trials/${trialId}/surveys/${surveyId}`, permissions);
}

/**
 * Returns true if the given permissions allow editing a given survey
 * @param orgId The given organization
 * @param trialId The given organization
 * @param surveyId The given survey
 * @param permissions The given permissions
 */
export function editSurvey(orgId : number, trialId : number, surveyId : number, permissions : Permission[] = defaultPermissions) {
    return canModify(`organizations/${orgId}/trials/${trialId}/surveys/${surveyId}/**`, permissions);
}

/**
 * Returns true if the given permissions are authorized to create the given resource
 * @param url The given resource url to test
 * @param permissions The given permissions
 */
function canCreate(url : string, permissions : Permission[]) {
    return can(url, 'POST', permissions);
}

/**
 * Returns true if the given permissions are authorized to view the given resource
 * @param url The given resource url to test
 * @param permissions The given permissions
 */
function canRead(url : string, permissions : Permission[]) {
    return can(url, 'GET', permissions);
}

/**
 * Returns true if the given permissions are authorized to delete the given resource
 * @param url The given resource url to test
 * @param permissions The given permissions
 */
function canDelete(url : string, permissions : Permission[]) {
    return can(url, 'DELETE', permissions);
}

/**
 * Returns true if the given permissions are authorized to edit the given resource
 * @param url The given resource url to test
 * @param permissions The given permissions
 */
function canModify(url : string, permissions : Permission[]) {
    return can(url, 'PUT', permissions);
}

/**
 * Returns the editable fields of the given url and permissions
 * @param url The given resource url to test
 * @param permissions The given permissions
 */
function getEditableFields(url : string, permissions : Permission[]) {
    const auth = authorizeRequest({
        url,
        method : 'PUT'
    }, permissions);

    if(auth.access == 'DENY')
        return [];

    return auth.endpoints || 'ALL';
}

/**
 * Returns true if the given permissions are authorized to perform given method on the given resource
 * @param url The given resource url to test
 * @param method The given url to test
 * @param permissions The given permissions
 */
function can(url : string, method : Method, permissions : Permission[]) {
    return authorizeRequest({
        url,
        method
    }, permissions).access == 'ALLOW';
}

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';