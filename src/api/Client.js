/*
 * Created by duydatpham@gmail.com on 13/04/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { createClient } from "react-fetching-library"
import {requestHostInterceptor} from "./requestInterceptors/requestHostInterceptor";
import {responseInterceptor} from "./responseHostInterceptor/responseHostInterceptor";

// In real application this const will be stored in ENV's`
export const Client = createClient({
    // requestInterceptors: [requestHostInterceptor(window.env.BASE_API_URL)],
    requestInterceptors: [requestHostInterceptor('http://localhost:9100/api/v1')],
    responseInterceptors: [responseInterceptor]
})
