/**
 * Brain
 *
 * Main export of @ouroboros/brain module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-03-06
 */
import { Service } from '@ouroboros/body';
export * as errors from './errors';
export declare const RIGHTS: {
    CREATE: number;
    READ: number;
    UPDATE: number;
    DELETE: number;
    ALL: number;
};
declare const brain: Service;
export default brain;
