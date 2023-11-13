# API Reference
- Root: `/api`

## Groups
### List all groups
- Method: `GET`
- Endpoint: `/api/group`
- Data: Array of `Group` objects. See `datatypes/group.ts` for more info.

### Operate with a group
- Endpoint: `/api/group/:gid`
- Data:
    - Charset: `UTF-8`
    - Content-Type: `application/json`

#### Create group
- Method: `POST`
- Data: `Group` object. See `datatypes/group.ts` for more info.

#### Retrieve group
- Method: `GET`
- Data: `Group` object. See `datatypes/group.ts` for more info.

#### Update group
- Methods: `PATCH`, `PUT`
- Data: Partial `Group` object for `PATCH` method, full object for `PUT` method. See `datatypes/group.ts` for more info.

#### Delete group
- Method: `DELETE`

## Transactions
### List all transactions from a group
- Method: `GET`
- Endpoint: `/api/group/:gid/transaction`
- Data: Array of `Transaction` objects. See `datatypes/transaction.ts` for more info.

### Operate with a transaction
- Endpoint: `/api/group/:gid/transaction/:tid`
- Data:
    - Charset: `UTF-8`
    - Content-Type: `application/json`

#### Create transaction
- Method: `POST`
- Data: `Transaction` object. See `datatypes/transaction.ts` for more info.

#### Retrieve transaction
- Method: `GET`
- Data: `Transaction` object. See `datatypes/transaction.ts` for more info.

#### Update transaction
- Methods: `PATCH`, `PUT`
- Data: Partial `Transaction` object for `PATCH` method, full object for `PUT` method. See `datatypes/transaction.ts` for more info.

#### Delete transaction
- Method: `DELETE`

## Users
### Login
- Endpoint: `/api/login`
- Data: TBA

### Register
- Endpoint: `/api/register`
- Data: TBA

### Operate with a user
- Endpoint: `/api/user/:uid`
- Data:
    - Charset: `UTF-8`
    - Content-Type: `application/json`

#### Retrieve user
- Method: `GET`
- Data: `User` object. See `datatypes/user.ts` for more info.

#### Update user
- Methods: `PATCH`, `PUT`
- Data: Partial `User` object for `PATCH` method, full object for `PUT` method. See `datatypes/user.ts` for more info.

#### Delete user
- Method: `DELETE`
