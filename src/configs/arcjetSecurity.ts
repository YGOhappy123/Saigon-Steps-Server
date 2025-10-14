import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node'
import { parsedEnv } from '@/env'

const arcjetSecurity = arcjet({
    key: parsedEnv.ARCJET_KEY,
    rules: [
        shield({ mode: 'LIVE' }),
        detectBot({
            mode: 'LIVE',
            allow: ['CATEGORY:SEARCH_ENGINE']
        }),
        slidingWindow({
            mode: 'LIVE',
            max: 100,
            interval: 60
        })
    ]
})

export default arcjetSecurity
