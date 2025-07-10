import type { LocationQueryValue } from '#vue-router'
import { useRoute, useRouter } from 'nuxt/app'

export function useQueryParams() {
  const route = useRoute()
  const router = useRouter()

  function getParam<T extends string | string[] | undefined>(
    key: string,
    defaultValue?: T,
  ): T {
    return (route.query[key] as T) || defaultValue as T
  }

  function addParam(
    key: string,
    value: string | number | null | undefined,
    options: { replace?: boolean } = {},
  ) {
    const query = { ...route.query }

    if (value === null || value === undefined || value === '') {
      delete query[key]
    }
    else {
      query[key] = String(value)
    }

    return router.push({
      path: route.path,
      query,
      replace: options.replace,
    })
  }

  function setParam(
    key: string,
    value: string | number | null | undefined,
    options: { replace?: boolean } = {},
  ) {
    const query: {
      [p: string]: LocationQueryValue | LocationQueryValue[]
    } = {}

    if (value !== null && value !== undefined && value !== '') {
      query[key] = String(value)
    }

    return router.push({
      path: route.path,
      query,
      replace: options.replace,
    })
  }

  function clearParams(options: { replace?: boolean } = {}) {
    return router.push({
      path: route.path,
      query: {},
      replace: options.replace,
    })
  }

  function hasParams(): boolean {
    return Object.keys(route.query).length > 0
  }

  return {
    getParam,
    addParam,
    setParam,
    clearParams,
    hasParams,
  }
}
