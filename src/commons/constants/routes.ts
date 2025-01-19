import { PERMISSIONS } from "./permissions";
import { PREFIX } from "./prefix";

export const ROUTES = {
  DASHBOARD: {
    URL: `${PREFIX.DASHBOARD}`,
    PERMISSIONS: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
  },
  COURSE: { URL: "/course", PERMISSIONS: [] },
  SETTINGS: { URL: "/admin/settings", PERMISSIONS: [] },
  EXAMS: {
    START: {
      URL: "/exams/start/",
      PERMISSIONS: [],
    },
    END: {
      URL: "/exams/end/",
      PERMISSIONS: [],
    },
    DETAIL: {
      URL: "/exams/:questionId/",
      PERMISSIONS: [],
    },
  },
  AUTH: {
    LOGIN: { URL: `${PREFIX.AUTH}/login`, PERMISSIONS: [] },
    REGISTER: { URL: `${PREFIX.AUTH}/register`, PERMISSIONS: [] },
    CALLBACK: { URL: `${PREFIX.AUTH}/oauth-callback`, PERMISSIONS: [] },
    FORGOT_PASSWORD: { URL: `${PREFIX.AUTH}/forgot-password`, PERMISSIONS: [] },
    RESET_PASSWORD: { URL: `${PREFIX.AUTH}/reset-password`, PERMISSIONS: [] },
  },
  IAM: {
    USERS: {
      LIST: {
        URL: PREFIX.IAM.USERS,
        PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
      },
      CREATE: {
        URL: `${PREFIX.IAM.USERS}/create`,
        PERMISSIONS: [PERMISSIONS.USERS.CREATE_USERS],
      },
      DETAIL: {
        URL: `${PREFIX.IAM.USERS}/:id/detail`,
        PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
      },
      UPDATE: {
        URL: `${PREFIX.IAM.USERS}/:id/update`,
        PERMISSIONS: [PERMISSIONS.USERS.UPDATE_USERS],
      },
      DELETE: {
        URL: `${PREFIX.IAM.USERS}/:id/delete`,
        PERMISSIONS: [PERMISSIONS.USERS.DELETE_USERS],
      },
    },
    ROLES: {
      LIST: {
        URL: PREFIX.IAM.ROLES,
        PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
      },
      CREATE: {
        URL: `${PREFIX.IAM.ROLES}/create`,
        PERMISSIONS: [PERMISSIONS.USERS.CREATE_USERS],
      },
      DETAIL: {
        URL: `${PREFIX.IAM.ROLES}/:id/detail`,
        PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
      },
      UPDATE: {
        URL: `${PREFIX.IAM.ROLES}/:id/update`,
        PERMISSIONS: [PERMISSIONS.USERS.UPDATE_USERS],
      },
      DELETE: {
        URL: `${PREFIX.IAM.ROLES}/:id/delete`,
        PERMISSIONS: [PERMISSIONS.USERS.DELETE_USERS],
      },
    },
    PERMISSIONS: {
      LIST: {
        URL: PREFIX.IAM.PERMISSIONS,
        PERMISSIONS: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
      },
      CREATE: {
        URL: `${PREFIX.IAM.PERMISSIONS}/create`,
        PERMISSIONS: [PERMISSIONS.PERMISSIONS.CREATE_PERMISSIONS],
      },
      DETAIL: {
        URL: `${PREFIX.IAM.PERMISSIONS}/:id/detail`,
        PERMISSIONS: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
      },
      UPDATE: {
        URL: `${PREFIX.IAM.PERMISSIONS}/:id/update`,
        PERMISSIONS: [PERMISSIONS.PERMISSIONS.UPDATE_PERMISSIONS],
      },
      DELETE: {
        URL: `${PREFIX.IAM.PERMISSIONS}/:id/delete`,
        PERMISSIONS: [PERMISSIONS.PERMISSIONS.DELETE_PERMISSIONS],
      },
    },
  },
};
