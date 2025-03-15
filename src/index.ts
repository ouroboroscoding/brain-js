/**
 * Brain
 *
 * Main export of @ouroboros/brain module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-03-06
 */

// Ouroboros modules
import { Service } from '@ouroboros/body';

// Import and re-export module files
export * as errors from './errors';

// Constants
export const RIGHTS = {
	CREATE: 1,
	READ: 2,
	UPDATE: 4,
	DELETE: 8,
	ALL: 15
};
export const RIGHTS_ALL_ID = '012345679abc4defa0123456789abcde';

// Create an instance of Service and export it as default
const brain = new Service('brain');
export default brain;