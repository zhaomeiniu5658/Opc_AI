import { authApi } from '@/api/auth.js'
import { buildUserPermissions } from '@/config/permission.js'

export const AuthService = {
  async login(data) {
    const result = await authApi.login(data)
    return {
      ...result,
      user: {
        ...result.user,
        permissions: buildUserPermissions(result.user),
      },
    }
  },
}
