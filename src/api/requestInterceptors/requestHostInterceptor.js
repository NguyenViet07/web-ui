
export const requestHostInterceptor = (host) => () => async action => {
  const token = localStorage.getItem('token')

  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
    headers: {
      Accept: "application/json",
      ...(!!token ? { Authorization: `Bearer ${token}` } : {}),
      ...(action.headers || {})
    }
  }
}
