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
import * as errors_1 from './errors';
export { errors_1 as errors };
// Create an instance of Service and export it as default
const brain = new Service('brain');
export default brain;
