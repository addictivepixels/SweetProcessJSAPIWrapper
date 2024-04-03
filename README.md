# SweetProcess JavaScript API Wrapper

This JavaScript module provides a convenient wrapper around the SweetProcess API, allowing you to interact with various endpoints and perform operations such as retrieving procedures, task instances, users, and managing invitations and team memberships.

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sweetprocess-api-wrapper.git

# Navigate into the cloned repository
cd sweetprocess-api-wrapper

# Install the dependencies
npm install
```

## Usage

First, import the `SweetProcessAPI` class and create an instance with your SweetProcess API token:

```javascript
const SweetProcessAPI = require('./SweetProcessAPI');

const apiToken = 'YOUR_API_TOKEN';
const sweetProcess = new SweetProcessAPI(apiToken);
```

### Procedures

```javascript
sweetProcess.getProcedures({ teamId: 1, search: 'procedure', tag: 'tag1,tag2', policyId: 1, visibleToUser: 1, ordering: 'name' })
  .then((procedures) => {
    console.log('Procedures:', procedures);
  })
  .catch((error) => {
    console.error('Error retrieving procedures:', error);
  });
```

Returns a promise that resolves to the list of procedures matching the provided filters.

### Task Instances

```javascript
sweetProcess.getTaskInstances({ templateId: 1, user: 'https://example.com/api/users/1/', contentType: 'document', objectId: 1, completed: true, dueLte: '2023-06-01', dueGte: '2023-06-30' })
  .then((taskInstances) => {
    console.log('Task Instances:', taskInstances);
  })
  .catch((error) => {
    console.error('Error retrieving task instances:', error);
  });
```

Returns a promise that resolves to the list of task instances matching the provided filters.

### Users

```javascript
sweetProcess.getUsers({ teamId: 1, excludeTeamId: 2, id: 1, excludeId: 2, status: 'active' })
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((error) => {
    console.error('Error retrieving users:', error);
  });
```

Returns a promise that resolves to the list of users matching the provided filters.

```javascript
sweetProcess.inviteUser('John Doe', 'john@example.com', 0)
  .then((user) => {
    console.log('Invited User:', user);
  })
  .catch((error) => {
    console.error('Error inviting user:', error);
  });
```

Returns a promise that resolves to the invited user's information.

```javascript
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
```

Returns a promise that resolves to the updated user's information.

```javascript
const userIdToDelete = 2;
sweetProcess.deleteUser(userIdToDelete)
  .then((status) => {
    console.log('User deleted with status:', status);
  })
  .catch((error) => {
    console.error('Error deleting user:', error);
  });
```

Returns a promise that resolves to the HTTP status code of the response. For example, 204 for a successful deletion.

### Invitations

```javascript
sweetProcess.createInvitation(true, 'team', 'view', 1, 'https://example.com/api/users/3/')
  .then((invitation) => {
    console.log('Created Invitation:', invitation);
  })
  .catch((error) => {
    console.error('Error creating invitation:', error);
  });
```

Returns a promise that resolves to the created invitation.

### Team Memberships

```javascript
const teamUserIdToDelete = 3;
sweetProcess.deleteTeamUser(teamUserIdToDelete)
  .then((status) => {
    console.log('Teamuser deleted with status:', status);
  })
  .catch((error) => {
    console.error('Error deleting teamuser:', error);
  });
```

Returns a promise that resolves to the HTTP status code of the response. For example, 204 for a successful deletion.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
