import {
  TGetSessionTestsParams,
  TSessionTestUpdateRequest,
  TSessionTestDetailResponse,
  TSessionTestCreateRequest,
  TSessionTestPaginateResponse,
  TSessionTestDeleteResponse,
  TSessionTestUpdateResponse,
  TSessionTestCreateResponse,
  TSessionTestItem,
} from "./type";

// Dummy data
const dummySessionTests: TSessionTestItem[] = [
  {
    id: "1",
    name: "Mid Term Test 2024",
    start_date: "2024-06-01T09:00:00Z",
    end_date: "2024-06-01T11:00:00Z",
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-01-15T08:00:00Z"
  },
  {
    id: "2",
    name: "Final Exam 2024",
    start_date: "2024-12-15T13:00:00Z",
    end_date: "2024-12-15T16:00:00Z",
    created_at: "2024-01-20T10:30:00Z",
    updated_at: "2024-01-20T10:30:00Z"
  },
  {
    id: "3",
    name: "Practice Test 1",
    start_date: "2024-03-10T14:00:00Z",
    end_date: "2024-03-10T15:30:00Z",
    created_at: "2024-02-01T09:15:00Z",
    updated_at: "2024-02-01T09:15:00Z"
  }
];

// Mock API functions with proper response types
export const getSessionTests = async (params: TGetSessionTestsParams): Promise<TSessionTestPaginateResponse> => {
  // Simulate API call with dummy data
  const page = params.page || 1;
  const limit = params.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const filtered = params.search
    ? dummySessionTests.filter(test => 
        test.name.toLowerCase().includes((params.search || "").toLowerCase())
      )
    : dummySessionTests;

  return {
    status_code: 200,
    data: filtered.slice(start, end),
    meta: {
      page: page,
      per_page: limit,
      total: filtered.length,
      total_page: Math.ceil(filtered.length / limit),
    },
    version: "1.0.0"
  };
};

export const getSessionTest = async (id: string): Promise<TSessionTestDetailResponse> => {
  // Simulate API call with dummy data
  const sessionTest = dummySessionTests.find(test => test.id === id);
  
  if (!sessionTest) {
    throw new Error("Session test not found");
  }

  return {
    status_code: 200,
    data: sessionTest,
    version: "1.0.0"
  };
};

export const createSessionTest = async (data: TSessionTestCreateRequest): Promise<TSessionTestCreateResponse> => {
  // Simulate API call
  const newId = (dummySessionTests.length + 1).toString();
  const newSessionTest = {
    id: newId,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  dummySessionTests.push(newSessionTest);

  return {
    message: "Session test created successfully",
    version: "1.0.0"
  };
};

export const updateSessionTest = async (
  id: string,
  data: TSessionTestUpdateRequest,
): Promise<TSessionTestUpdateResponse> => {
  // Simulate API call
  const index = dummySessionTests.findIndex(test => test.id === id);
  
  if (index === -1) {
    throw new Error("Session test not found");
  }

  const updatedSessionTest = {
    ...dummySessionTests[index],
    ...data,
    updated_at: new Date().toISOString()
  };

  dummySessionTests[index] = updatedSessionTest;

  return {
    message: "Session test updated successfully",
    data: updatedSessionTest,
    version: "1.0.0"
  };
};

export const deleteSessionTest = async (id: string): Promise<TSessionTestDeleteResponse> => {
  // Simulate API call
  const index = dummySessionTests.findIndex(test => test.id === id);
  
  if (index === -1) {
    throw new Error("Session test not found");
  }

  dummySessionTests.splice(index, 1);

  return {
    message: "Session test deleted successfully",
    version: "1.0.0"
  };
};