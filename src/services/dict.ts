'use server'

import type { YoudaoResponse } from '@/services/response'

export const searchDict = async (word: string): Promise<YoudaoResponse> => {
  const result = await fetch(
    'https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4',
    {
      body: `q=${word}&le=en&t=2&client=web&keyfrom=webdict`,
      headers: {
        Referer: 'https://www.youdao.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        accept: 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
      method: 'POST',
    },
  )
  const json = await result.json()

  return json
}
