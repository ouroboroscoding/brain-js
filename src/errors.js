/**
 * Errors
 *
 * Contains constants to describe errors from the brain service
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-03-04
 */
// Re-export the body errors
export { errors as body } from '@ouroboros/body';
// Constants
export const SIGNIN_FAILED = 1200;
export const PASSWORD_STRENGTH = 1201;
export const BAD_PORTAL = 1202;
