// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";
import { User } from "../../lib/user"
import { sessionOptions } from '../../lib/session'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
    const body = req.body

    if (!body.password) {
        const user: User = { isAuthenticated: false, permission: "none" }
        req.session.user = user
        await req.session.save()
        res.status(400).json(user)
    } else if (body.password == process.env.WEDDINGPASS) {
        const user: User = { isAuthenticated: true, permission: "wedding" }
        req.session.user = user
        await req.session.save()
        res.status(200).json(user)
    } else if (body.password == process.env.WEDRECPASS) {
        const user: User = { isAuthenticated: true, permission: "wedding&reception" }
        req.session.user = user
        await req.session.save()
        res.status(200).json(user)
    } else if (body.password == process.env.ALLPASS) {
        const user: User = { isAuthenticated: true, permission: "all" }
        req.session.user = user
        await req.session.save()
        res.status(200).json(user)
    }else {
        const user: User = { isAuthenticated: false, permission: "none" }
        req.session.user = user
        await req.session.save()
        res.status(400).json(user)
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)