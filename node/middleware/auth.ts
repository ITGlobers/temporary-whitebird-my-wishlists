import { AuthenticationError } from '@vtex/api'

export const auth = async (ctx: Context) => {
  const {
    cookies,
    clients: { vtexId },
  } = ctx

  const cookie = cookies.get(
    `VtexIdclientAutCookie_${ctx.vtex.account}`
  ) as string

  const user = await vtexId.getAuthenticatedUser(cookie)

  if (!user?.userId) {
    throw new AuthenticationError('Unauthorized access')
  }

  return {
    email: user.user,
  }
}
