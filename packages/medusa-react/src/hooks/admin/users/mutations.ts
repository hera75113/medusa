import {
  AdminDeleteUserRes,
  AdminResetPasswordRequest,
  AdminResetPasswordTokenRequest,
  AdminUserRes,
} from "@medusajs/medusa"
import {
  AdminCreateUserPayload,
  AdminUpdateUserPayload,
  Response,
} from "@medusajs/medusa-js"
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { adminUserKeys } from "./queries"
import { useMedusa } from "../../../contexts/medusa"
import { buildOptions } from "../../utils/buildOptions"

export const useAdminCreateUser = (
  options?: UseMutationOptions<
    Response<AdminUserRes>,
    Error,
    AdminCreateUserPayload
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    (payload: AdminCreateUserPayload) => client.admin.users.create(payload),
    buildOptions(queryClient, adminUserKeys.lists(), options)
  )
}

export const useAdminUpdateUser = (
  id: string,
  options?: UseMutationOptions<
    Response<AdminUserRes>,
    Error,
    AdminUpdateUserPayload
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    (payload: AdminUpdateUserPayload) => client.admin.users.update(id, payload),
    buildOptions(
      queryClient,
      [adminUserKeys.lists(), adminUserKeys.detail(id)],
      options
    )
  )
}

export const useAdminDeleteUser = (
  id: string,
  options?: UseMutationOptions<Response<AdminDeleteUserRes>, Error, void>
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    () => client.admin.users.delete(id),
    buildOptions(
      queryClient,
      [adminUserKeys.detail(id), adminUserKeys.lists()],
      options
    )
  )
}

export const useAdminResetPassword = (
  options?: UseMutationOptions<
    Response<AdminUserRes>,
    Error,
    AdminResetPasswordRequest
  >
) => {
  const { client } = useMedusa()
  return useMutation(
    (payload: AdminResetPasswordRequest) =>
      client.admin.users.resetPassword(payload),
    options
  )
}

export const useAdminSendResetPasswordToken = (
  options?: UseMutationOptions<
    Response<void>,
    Error,
    AdminResetPasswordTokenRequest
  >
) => {
  const { client } = useMedusa()
  return useMutation(
    (payload: AdminResetPasswordTokenRequest) =>
      client.admin.users.sendResetPasswordToken(payload),
    options
  )
}
