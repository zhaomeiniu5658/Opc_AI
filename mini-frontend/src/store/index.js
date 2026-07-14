import { createPinia as createPiniaInstance } from 'pinia'

export function createPinia() {
  return createPiniaInstance()
}

export * from './app.js'
export * from './interview.js'
export * from './job.js'
export * from './membership.js'
export * from './message.js'
export * from './permission.js'
export * from './recommendation.js'
export * from './resume.js'
export * from './user.js'
