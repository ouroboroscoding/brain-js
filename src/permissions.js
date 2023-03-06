/**
 * Permissions
 *
 * Handles checking for specific rights in the user's permissions
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-01-17
 */
// Ouroboros modules
import clone from '@ouroboros/clone';
import events from '@ouroboros/events';
// Rights types
const _types = {
    create: 0x01,
    read: 0x02,
    update: 0x04,
    delete: 0x08
};
/**
 * Permissions
 *
 * Stores the user's permissions and provides methods to access them
 *
 * @name Permissions
 */
class Permissions {
    // The list of user permissions
    list = {};
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name Permissions
     * @access private
     */
    constructor() {
        // Updated permissions when user signs in
        events.get('signedIn').subscribe((user) => {
            // Reset the point to the list by re-initialising it
            this.list = {};
            // Go through each permission on the user
            for (const name of Object.keys(user.permissions)) {
                // Initialise the permission rights to none
                this.list[name] = {};
                // Go through each right
                for (const s of Object.keys(_types)) {
                    // If it exists on the permission
                    if (user.permissions[name] & _types[s]) {
                        // Set it to true
                        this.list[name][s] = true;
                    }
                }
            }
        });
        // Update permissions when user signs out
        events.get('signedOut').subscribe(() => {
            this.list = {};
        });
    }
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
    get(name) {
        // If the name is not in the permission set, it's none
        if (!(name in this.list)) {
            return {};
        }
        // Return the permissions set
        return clone(this.list[name]);
    }
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
    has(name, type) {
        // If the name is not in the permission set, false
        if (!(name in this.list)) {
            return false;
        }
        // Return on the right having the type
        return this.list[name][type] || false;
    }
}
// Create an instance of Permissions
const permissions = new Permissions();
// Set it as the default export
export default permissions;
