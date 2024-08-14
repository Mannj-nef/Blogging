/* eslint-disable */
// @ts-nocheck

export enum EVENT_KEY {
  GET_ME = 'user:get-me',
  USER_CONTROL = 'user:control'
}

export const sendEvent = <T>({ eventName, data }: { eventName: EVENT_KEY; data?: T }) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const listenEvent = <T>({
  eventName,
  handler
}: {
  eventName: EVENT_KEY
  handler?: ({ detail }: { detail: T }) => void
}) => {
  document.addEventListener(eventName, handler)
  return () => document.removeEventListener(eventName, handler)
}
