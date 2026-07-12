import { ref } from 'vue'

import { MembershipService } from '@/services/MembershipService.js'

export function useMembership() {
  const membership = ref(null)

  async function loadMembership() {
    membership.value = await MembershipService.fetchProfile()
    return membership.value
  }

  return {
    membership,
    loadMembership,
  }
}
