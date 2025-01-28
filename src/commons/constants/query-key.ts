export const QUERY_KEY = {
  BOOKS: {
    LIST: "get-books-list",
    DETAIL: "get-books-detail",
    CREATE: "post-create-book",
    UPDATE: "put-update-book",
    DELETE: "delete-delete-book",
  },
  USERS: {
    LIST: "get-users-list",
    DETAIL: "get-users-detail",
    CREATE: "post-create-user",
    UPDATE: "put-update-user",
    DELETE: "delete-delete-user",
  },
  ROLES: {
    LIST: "get-roles-list",
    DETAIL: "get-roles-detail",
    CREATE: "post-create-role",
    UPDATE: "put-update-role",
    DELETE: "delete-delete-role",
  },
  PERMISSIONS: {
    LIST: "get-permissions-list",
    DETAIL: "get-permissions-detail",
    CREATE: "post-create-permission",
    UPDATE: "put-update-permission",
    DELETE: "delete-delete-permission",
  },
} as const;
