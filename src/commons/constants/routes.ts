import { PERMISSIONS } from "./permissions";
import { PREFIX } from "./prefix";

export const ROUTES = {
  ADMIN: {
    DASHBOARD: {
      URL: PREFIX.ADMIN.DASHBOARD,
      PERMISSIONS: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
    },
    SESSION_TESTS: {
      LIST: {
        URL: PREFIX.ADMIN.SESSION_TESTS,
        PERMISSIONS: [PERMISSIONS.SESSION_TESTS.READ_SESSION_TESTS],
      },
      CREATE: {
        URL: `${PREFIX.ADMIN.SESSION_TESTS}/create`,
        PERMISSIONS: [PERMISSIONS.SESSION_TESTS.CREATE_SESSION_TESTS],
      },
      DETAIL: {
        URL: `${PREFIX.ADMIN.SESSION_TESTS}/:id/detail`,
        PERMISSIONS: [PERMISSIONS.SESSION_TESTS.READ_SESSION_TESTS],
      },
      UPDATE: {
        URL: `${PREFIX.ADMIN.SESSION_TESTS}/:id/update`,
        PERMISSIONS: [PERMISSIONS.SESSION_TESTS.UPDATE_SESSION_TESTS],
      },
      DELETE: {
        URL: `${PREFIX.ADMIN.SESSION_TESTS}/:id/delete`,
        PERMISSIONS: [PERMISSIONS.SESSION_TESTS.DELETE_SESSION_TESTS],
      },
    },
    IAM: {
      USERS: {
        LIST: {
          URL: PREFIX.ADMIN.IAM.USERS,
          PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
        },
        CREATE: {
          URL: `${PREFIX.ADMIN.IAM.USERS}/create`,
          PERMISSIONS: [PERMISSIONS.USERS.CREATE_USERS],
        },
        DETAIL: {
          URL: `${PREFIX.ADMIN.IAM.USERS}/:id/detail`,
          PERMISSIONS: [PERMISSIONS.USERS.READ_USERS],
        },
        UPDATE: {
          URL: `${PREFIX.ADMIN.IAM.USERS}/:id/update`,
          PERMISSIONS: [PERMISSIONS.USERS.UPDATE_USERS],
        },
        DELETE: {
          URL: `${PREFIX.ADMIN.IAM.USERS}/:id/delete`,
          PERMISSIONS: [PERMISSIONS.USERS.DELETE_USERS],
        },
      },
      ROLES: {
        LIST: {
          URL: PREFIX.ADMIN.IAM.ROLES,
          PERMISSIONS: [PERMISSIONS.ROLES.READ_ROLES],
        },
        CREATE: {
          URL: `${PREFIX.ADMIN.IAM.ROLES}/create`,
          PERMISSIONS: [PERMISSIONS.ROLES.CREATE_ROLES],
        },
        DETAIL: {
          URL: `${PREFIX.ADMIN.IAM.ROLES}/:id/detail`,
          PERMISSIONS: [PERMISSIONS.ROLES.READ_ROLES],
        },
        UPDATE: {
          URL: `${PREFIX.ADMIN.IAM.ROLES}/:id/update`,
          PERMISSIONS: [PERMISSIONS.ROLES.UPDATE_ROLES],
        },
        DELETE: {
          URL: `${PREFIX.ADMIN.IAM.ROLES}/:id/delete`,
          PERMISSIONS: [PERMISSIONS.ROLES.DELETE_ROLES],
        },
      },
      PERMISSIONS: {
        LIST: {
          URL: PREFIX.ADMIN.IAM.PERMISSIONS,
          PERMISSIONS: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
        },
        CREATE: {
          URL: `${PREFIX.ADMIN.IAM.PERMISSIONS}/create`,
          PERMISSIONS: [PERMISSIONS.PERMISSIONS.CREATE_PERMISSIONS],
        },
        DETAIL: {
          URL: `${PREFIX.ADMIN.IAM.PERMISSIONS}/:id/detail`,
          PERMISSIONS: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
        },
        UPDATE: {
          URL: `${PREFIX.ADMIN.IAM.PERMISSIONS}/:id/update`,
          PERMISSIONS: [PERMISSIONS.PERMISSIONS.UPDATE_PERMISSIONS],
        },
        DELETE: {
          URL: `${PREFIX.ADMIN.IAM.PERMISSIONS}/:id/delete`,
          PERMISSIONS: [PERMISSIONS.PERMISSIONS.DELETE_PERMISSIONS],
        },
      },
    },
  },
  STUDENT: {
    DASHBOARD: {
      URL: PREFIX.STUDENT.DASHBOARD,
      PERMISSIONS: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
    },
    SESSIONS: {
      LIST: {
        URL: PREFIX.STUDENT.SESSIONS,
      },
    },
    COURSE: {
      URL: `${PREFIX.STUDENT.ROOT}${PREFIX.COURSE}`,
      PERMISSIONS: [],
    },
    PROFILE: {
      URL: `${PREFIX.STUDENT.ROOT}${PREFIX.PROFILE}`,
      PERMISSIONS: [],
    },
    EXAMS: {
      START: {
        URL: `${PREFIX.STUDENT.ROOT}${PREFIX.EXAMS}/start`,
        PERMISSIONS: [],
      },
      END: {
        URL: `${PREFIX.STUDENT.ROOT}${PREFIX.EXAMS}/end`,
        PERMISSIONS: [],
      },
      DETAIL: {
        URL: `${PREFIX.STUDENT.ROOT}${PREFIX.EXAMS}/:questionId`,
        PERMISSIONS: [],
      },
    },
  },
  AUTH: {
    LOGOUT: {
      URL: `${PREFIX.AUTH}/logout`,
    },
    LOGIN: {
      URL: `${PREFIX.AUTH}/login`,
      PERMISSIONS: [],
    },
    REGISTER: {
      URL: `${PREFIX.AUTH}/register`,
      PERMISSIONS: [],
    },
    CALLBACK: {
      URL: `${PREFIX.AUTH}/oauth-callback`,
      PERMISSIONS: [],
    },
    FORGOT_PASSWORD: {
      URL: `${PREFIX.AUTH}/forgot-password`,
      PERMISSIONS: [],
    },
    RESET_PASSWORD: {
      URL: `${PREFIX.AUTH}/reset-password`,
      PERMISSIONS: [],
    },
    VERIFY_EMAIL: {
      URL: `${PREFIX.AUTH}/verify-email`,
      PERMISSIONS: [],
    },
    CONFIRM_PAYMENT: {
      URL: `${PREFIX.AUTH}/confirm-payment`,
      PERMISSIONS: [],
    },
  },
};
