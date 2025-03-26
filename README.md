# @ouroboros/brain
[![npm version](https://img.shields.io/npm/v/@ouroboros/brain.svg)](https://www.npmjs.com/package/@ouroboros/brain) ![Custom License](https://img.shields.io/npm/l/@ouroboros/brain.svg)

Shared javascript code for interacting with the brain service created by
Ouroboros Coding Inc.

See [Releases](https://github.com/ouroboroscoding/brain-js/blob/main/releases.md)
for changes from release to release.

## Installation

Install with npm

```console
foo@bar:~$ npm install @ouroboros/brain
```

## RESTlike Documentation
If you're here to connect to a backend using [brain2_oc](https://pypi.org/project/brain2_oc/)
and you're already familiar with how to connect to [body_oc](https://pypi.org/project/body_oc/), services in JS/TS projects, then you're probably just looking for the request
docs. See the [full documentation](https://github.com/ouroboroscoding/brain2/blob/main/rest.md)
on the individual RESTlike requests in brain and what they return.

## React
If you're connecting to brain via a [React](https://react.dev/) framework, you
might want to checkout
[@ouroboros/brain-react](https://www.npmjs.com/package/@ouroboros/brain-react)
which provides several functions and hooks that make using brain in react a
snap.

## Using brain
Brain uses [@ouroboros/body](https://www.npmjs.com/package/@ouroboros/body), so
some small setup is required there for brain to work as expected.

```javascript
import body from '@ouroboros/body';
import brain, { errors } from '@ouroboros/brain';

// Set the domain for all requests
body.domain('https://rest.mydomain.com');

// Do we have a session?
const session = localStorage.getItem('session');
if(session) {
  body.session(session);
}

// Sign in
brain.create('signin', {
  email: 'me@mydomain.com',
  passwd: '********',
  portal: 'my_app'
}).then(data => {

  // Did we get something back?
  if(data) {
    
    // Store session so we can use it on a reload
    localStorage.setItem('session', data.session);

    // Let body know we have a session
    body.session(data.session);

    // Get user
    brain.read('user').then(storeUser, handleError);
  }
}, error => {
  if(error.code === errors.SIGNIN_FAILED) {
    // notify failed signin
  } else if(error.code === errors.BAD_PORTAL) {
    // notify no access to portal
  } else {
    // notify.... uh oh
  }
})
```

## Errors
Brain provides several error codes unique to the [brain2_oc](https://pypi.org/project/brain2_oc/)
service.

`SIGNIN_FAILED`, `PASSWORD_STRENGTH`, `BAD_PORTAL`, `INTERNAL_KEY`, `BAD_OAUTH`,
`BAD_CONFIG`

They can be accessed through `errors` from `@ouroboros/brain`.

```javascript
import { errors } from '@ouroboros/brain';
console.log(errors.SIGNIN_FAILED) // prints 1200
```

Additionally, if you need to access lower level [body_oc](https://pypi.org/project/body_oc/)
errors, you can do so via the `body` variable.

```javascript
import { errors } from '@ouroboros/brain';
console.log(errors.body.DATA_FIELDS) // prints 1001
```

## RIGHTS
Brain provides the bits for standard crud operations. These are useful for the
permissions and verification calls.

`CREATE`, `READ`, `UPDATE`, `DELETE`

They can be accessed through `RIGHTS` from `@ouroboros/brain`.

```javascript
import { RIGHTS } from '@ouroboros/brain';
console.log(RIGHTS.CREATE) // prints 1
console.log(RIGHTS.READ | RIGHTS.UPDATE) // prints 6 
console.log(RIGHTS.ALL) // prints 15
```

## RIGHTS_ALL_ID
Useful for creating global permissions, i.e. permissions across a portal or even
the whole system, not attached to a specific record ID.

It can be accessed through `RIGHTS_ALL_ID` from `@ouroboros/brain`.

```javascript
import brain, { RIGHTS_ALL_ID, RIGHTS } from '@ouroboros/brain';

brain.update('permissions', {
  user: '18f85e33036d11f08878ea3e7aa7d94a',
  portal: 'my_app',
  rights: {
    my_service_permission: { [RIGHTS_ALL_ID]: RIGHTS.ALL },
    my_other_service_permission: { [RIGHTS_ALL_ID]: RIGHTS.READ },
    my_other_other: { [RIGHTS_ALL_ID]: RIGHTS.CREATE | RIGHTS.DELETE }
  }
}).then(data => {}, error => {});
```