import { userApi } from '@/api/user.js'
import { buildUserPermissions } from '@/config/permission.js'

export const UserService = {
  async fetchProfile() {
    const user = await userApi.getProfile()
    return {
      ...user,
      permissions: buildUserPermissions(user),
    }
  },
}
