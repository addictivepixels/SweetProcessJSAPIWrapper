/**
* SweetProcess API Wrapper
*
* This class provides a wrapper for interacting with the SweetProcess API.
* It includes methods for retrieving procedures, task instances, users,
* inviting users, updating users, deleting users, creating invitations,
* and deleting team users.
*/
class SweetProcessAPI {
 /**
  * Constructor for the SweetProcessAPI class.
  * @param {string} apiToken - The API token for authentication.
  * @throws {Error} Throws an error if the API token is not provided.
  */
 constructor(apiToken) {
   if (!apiToken) {
     throw new Error("API token is required.");
   }
   this.baseURL = "https://www.sweetprocess.com/api/v1";
   this.headers = {
     "Authorization": `Token ${apiToken}`,
     "Content-Type": "application/json"
   };
 }

 /**
  * Helper method for making API requests.
  * @param {string} url - The URL for the API request.
  * @param {Object} options - The options for the API request (default: {}).
  * @returns {Promise} A promise that resolves to the parsed JSON response.
  * @throws {Error} Throws an error if the API request fails.
  */
 async fetchAPI(url, options = {}) {
   const response = await fetch(url, options);
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }
   return await response.json();
 }

 /**
  * Retrieves a list of procedures based on the provided filters.
  * @param {Object} options - The options for filtering the procedures.
  * @param {number} options.teamId - Filter procedures within the given team.
  * @param {string} options.search - Search for a procedure.
  * @param {string} options.tag - Filter procedures with the given tag(s) separated by comma.
  * @param {number} options.policyId - Filter procedures with the attached policy.
  * @param {number} options.visibleToUser - Filter procedures that you can see and the requested user can see.
  * @param {string} options.ordering - Order the procedures by the specified field.
  * @returns {Promise} A promise that resolves to the list of procedures.
  */
 getProcedures({ teamId, search, tag, policyId, visibleToUser, ordering } = {}) {
   const params = new URLSearchParams({ team_id: teamId, search, tag, policy_id: policyId, visible_to_user: visibleToUser, ordering }).toString();
   const url = `${this.baseURL}/procedures/?${params}`;
   return this.fetchAPI(url, { headers: this.headers });
 }

 /**
  * Retrieves a list of task instances based on the provided filters.
  * @param {Object} options - The options for filtering the task instances.
  * @param {number} options.templateId - Filter task instances belonging to the given task template.
  * @param {string} options.user - Filter tasks assigned to this user (use the user's API URL).
  * @param {string} options.contentType - Filter for a particular document type.
  * @param {number} options.objectId - Filter for a particular document ID.
  * @param {boolean} options.completed - Filter for completed task instances.
  * @param {string} options.dueLte - Filter task instances with a due date less than or equal to the provided date (ISO 8601 format).
  * @param {string} options.dueGte - Filter task instances with a due date greater than or equal to the provided date (ISO 8601 format).
  * @returns {Promise} A promise that resolves to the list of task instances.
  */
 getTaskInstances({ templateId, user, contentType, objectId, completed, dueLte, dueGte } = {}) {
   const params = new URLSearchParams({ template_id: templateId, user, content_type: contentType, object_id: objectId, completed, due__lte: dueLte, due__gte: dueGte }).toString();
   const url = `${this.baseURL}/taskinstances/?${params}`;
   return this.fetchAPI(url, { headers: this.headers });
 }

 /**
  * Retrieves a list of users based on the provided filters.
  * @param {Object} options - The options for filtering the users.
  * @param {number} options.teamId - Filter users that are members of the given team.
  * @param {number} options.excludeTeamId - Exclude users that are members of the given team.
  * @param {number} options.id - Filter users matching the given ID.
  * @param {number} options.excludeId - Exclude users matching the given ID.
  * @param {string} options.status - Filter users matching one of the provided statuses.
  * @returns {Promise} A promise that resolves to the list of users.
  */
 getUsers({ teamId, excludeTeamId, id, excludeId, status } = {}) {
   const params = new URLSearchParams({ team_id: teamId, exclude_team_id: excludeTeamId, id, exclude_id: excludeId, status }).toString();
   const url = `${this.baseURL}/users/?${params}`;
   return this.fetchAPI(url, { headers: this.headers });
 }

 /**
  * Invites a new user to the SweetProcess account.
  * @param {string} name - The name of the user.
  * @param {string} email - The email address of the user.
  * @param {number} isSuperManager - Indicates if the user is a super manager (1) or not (0).
  * @returns {Promise} A promise that resolves to the invited user's information.
  */
 inviteUser(name, email, isSuperManager) {
   const url = `${this.baseURL}/users/`;
   const data = { name, email, is_super_manager: isSuperManager };
   return this.fetchAPI(url, {
     method: 'POST',
     headers: this.headers,
     body: JSON.stringify(data)
   });
 }

 /**
  * Updates a user's information.
  * @param {number} userId - The ID of the user to update.
  * @param {Object} data - The updated user information.
  * @returns {Promise} A promise that resolves to the updated user's information.
  */
 updateUser(userId, data) {
   const url = `${this.baseURL}/users/${userId}/`;
   return this.fetchAPI(url, {
     method: 'PATCH',
     headers: this.headers,
     body: JSON.stringify(data)
   });
 }

 /**
  * Deletes a user from the SweetProcess account.
  * @param {number} userId - The ID of the user to delete.
  * @returns {Promise} A promise that resolves to the HTTP status code of the response.
  */
 deleteUser(userId) {
   const url = `${this.baseURL}/users/${userId}/`;
   return fetch(url, {
     method: 'DELETE',
     headers: this.headers
   }).then(response => response.status);
 }

 /**
  * Creates an invitation to add a user to a team.
  * @param {boolean} sendMail - Indicates if an email should be sent to the user.
  * @param {string} contentType - The type of content the invitation is for (e.g., "team").
  * @param {string} permission - The permission level of the invitation (e.g., "view").
  * @param {number} objectId - The ID of the object the invitation is for (e.g., team ID).
  * @param {string} toUserId - The API URL of the user to invite.
  * @returns {Promise} A promise that resolves to the created invitation.
  */
 createInvitation(sendMail, contentType, permission, objectId, toUserId) {
   const url = `${this.baseURL}/invitations/`;
   const data = [{ send_mail: sendMail, content_type: contentType, permission, object_id: objectId, to_user_id: toUserId }];
   return this.fetchAPI(url, {
     method: 'POST',
     headers: this.headers,
     body: JSON.stringify(data)
   });
 }

 /**
  * Removes a user from a team.
  * @param {number} teamUserId - The ID of the teamuser to remove.
  * @returns {Promise} A promise that resolves to the HTTP status code of the response.
  */
 deleteTeamUser(teamUserId) {
   const url = `${this.baseURL}/teamusers/${teamUserId}/`;
   return fetch(url, {
     method: 'DELETE',
     headers: this.headers
   }).then(response => response.status);
 }
}

// Example usage
const apiToken = 'YOUR_API_TOKEN';
const sweetProcess = new SweetProcessAPI(apiToken);

// Get procedures
sweetProcess.getProcedures({ teamId: 1, search: 'procedure', tag: 'tag1,tag2', policyId: 1, visibleToUser: 1, ordering: 'name' })
 .then((procedures) => {
   console.log('Procedures:', procedures);
 })
 .catch((error) => {
   console.error('Error retrieving procedures:', error);
 });

// Get task instances
sweetProcess.getTaskInstances({ templateId: 1, user: '/api/users/1/', contentType: 'document', objectId: 1, completed: true, dueLte: '2023-06-01', dueGte: '2023-06-30' })
 .then((taskInstances) => {
   console.log('Task Instances:', taskInstances);
 })
 .catch((error) => {
   console.error('Error retrieving task instances:', error);
 });

// Get users
sweetProcess.getUsers({ teamId: 1, excludeTeamId: 2, id: 1, excludeId: 2, status: 'active' })
 .then((users) => {
   console.log('Users:', users);
 })
 .catch((error) => {
   console.error('Error retrieving users:', error);
 });

// Invite a user
sweetProcess.inviteUser('John Doe', 'john@example.com', 0)
 .then((user) => {
   console.log('Invited User:', user);
 })
 .catch((error) => {
   console.error('Error inviting user:', error);
 });

// Update a user
const userId = 1;
const updatedUserData = {
 name: 'Updated Name',
 email: 'updated@example.com',
};
sweetProcess.updateUser(userId, updatedUserData)
 .then((user) => {
   console.log('Updated User:', user);
 })
 .catch((error) => {
   console.error('Error updating user:', error);
 });

// Delete a user
const userIdToDelete = 2;
sweetProcess.deleteUser(userIdToDelete)
 .then((status) => {
   console.log('User deleted with status:', status);
 })
 .catch((error) => {
   console.error('Error deleting user:', error);
 });

// Create an invitation
sweetProcess.createInvitation(true, 'team', 'view', 1, '/api/users/3/')
 .then((invitation) => {
   console.log('Created Invitation:', invitation);
 })
 .catch((error) => {
   console.error('Error creating invitation:', error);
 });

// Delete a teamuser
const teamUserIdToDelete = 3;
sweetProcess.deleteTeamUser(teamUserIdToDelete)
 .then((status) => {
   console.log('Teamuser deleted with status:', status);
 })
 .catch((error) => {
   console.error('Error deleting teamuser:', error);
 });
