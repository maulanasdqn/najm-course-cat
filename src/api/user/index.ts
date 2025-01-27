import { api } from "@/libs/axios/api";
import { TResponseData } from "@/commons/types/response";
import {
  TGetUsersParams,
  TUserUpdateRequest,
  TUserDetailResponse,
  TUserCreateRequest,
  TUserPaginateResponse,
} from "./type";

export const getUsers = async (params: TGetUsersParams): Promise<TUserPaginateResponse> => {
  const { data } = await api.get("/v1/users", { params });
  return data;
};

export const getUser = async (id: string): Promise<TUserDetailResponse> => {
  return Promise.resolve({
    status_code: 200,
    data: {
      id: "1",
      fullname: "John Doe",
      email: "johndoe@example.com",
      phone_number: "1234567890",
      avatar: "https://example.com/avatar.png",
      student_type: "fulltime",
      referral_code: "ABC123",
      referred_by: "XYZ789",
      role: {
        id: "1",
        name: "Admin",
        created_at: "2023-01-01T00:00:00.000Z",
        updated_at: "2023-01-01T00:00:00.000Z",
        permissions: [
          {
            id: "1",
            created_at: "2023-01-01T00:00:00.000Z",
            updated_at: "2023-01-01T00:00:00.000Z",
            name: "users:read",
          },
          {
            id: "2",
            created_at: "2023-01-01T00:00:00.000Z",
            updated_at: "2023-01-01T00:00:00.000Z",
            name: "users:create",
          },
          {
            id: "3",
            created_at: "2023-01-01T00:00:00.000Z",
            updated_at: "2023-01-01T00:00:00.000Z",
            name: "users:update",
          },
          {
            id: "4",
            created_at: "2023-01-01T00:00:00.000Z",
            updated_at: "2023-01-01T00:00:00.000Z",
            name: "users:delete",
          },
        ],
      },
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
    },
    version: "1.0.0",
  });
  const { data } = await api.get(`/v1/users/detail/${id}`);
  return data;
};

export const createUser = async (data: TUserCreateRequest): Promise<TResponseData<null>> => {
  const response = await api.post("/v1/users", data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: TUserUpdateRequest,
): Promise<TResponseData<null>> => {
  const response = await api.put(`/v1/users/update/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<TResponseData<null>> => {
  const response = await api.delete(`/v1/users/delete/${id}`);
  return response.data;
};
