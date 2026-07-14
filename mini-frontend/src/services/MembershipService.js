import { membershipApi } from '@/api/membership.js'

export const MembershipService = {
  fetchProfile() {
    return membershipApi.profile()
  },
  createOrder(data) {
    return membershipApi.createOrder(data)
  },
}
