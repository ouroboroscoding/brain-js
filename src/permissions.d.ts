/**
 * Permissions
 *
 * Handles checking for specific rights in the user's permissions
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-01-17
 */
export type rightOption = 'create' | 'delete' | 'read' | 'update';
export type rightsStruct = {
    create?: true;
    delete?: true;
    read?: true;
    update?: true;
};
/**
 * Permissions
 *
 * Stores the user's permissions and provides methods to access them
 *
 * @name Permissions
 */
declare class Permissions {
    private list;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name Permissions
     * @access private
     */
    constructor();
    /**
     * Get
     *
     * Returns an object of all types and their status for a specific permission
     * name
     *
     * @name get
     * @access public
     * @param name The name of the right to get
     * @returns {object}
     */
    get(name: string): rightsStruct;
    /**
     * Has
     *
     * Returns true if the specified right and type exists in the current user's
     * permission set
     *
     * @name has
     * @access public
     * @param name The name of the permission to check for
     * @param type The type of permissions
     */
    has(name: string, type: rightOption): boolean;
}
declare const permissions: Permissions;
export default permissions;
