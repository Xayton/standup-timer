import { expect, test } from 'vitest'
import {secToTime} from "../src/composables/secToTime";

test('secToTime works', () => {
    expect(secToTime(0)).toBe("00:00")
    expect(secToTime(1)).toBe("00:01")
    expect(secToTime(59)).toBe("00:59")
    expect(secToTime(60)).toBe("01:00")
    expect(secToTime(61)).toBe("01:01")
    expect(secToTime(120)).toBe("02:00")
    
    expect(secToTime(3600)).toBe("60:00")
    expect(secToTime(3601)).toBe("60:01")
    expect(secToTime(3661)).toBe("61:01")
})