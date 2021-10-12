/*
 * Created by duydatpham@gmail.com on 13/04/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

export const requestHostInterceptor = (host) => () => async action => {
  const token = localStorage.getItem('token')

      console.log(`${host}${action.endpoint}`)

  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      ...(!!token ? { Authorization: `Bearer ${token}` } : {}),
      ...(action.headers || {})
    }
  }
}
