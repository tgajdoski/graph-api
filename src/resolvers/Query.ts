import { getUserId, Context } from '../utils'

export const Query = {
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return 'YEP'
  },
}
