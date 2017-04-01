import { ResultTree } from '../types'

export default function negate(result: ResultTree): ResultTree {
    switch (result.type) {
        case 'number':
            return {
                type: 'number',
                value: -result.value,
            }
    }
}