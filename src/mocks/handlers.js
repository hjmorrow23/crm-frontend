import { rest } from 'msw'

export const handlers = [
    rest.post('/login', (req, res, ctx) => {
        const { username } = req.body

        return res(
            ctx.json({
            id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
            username,
            firstName: 'John',
            lastName: 'Maverick',
            email: 'jmavtest@gmail.com',
            roles: [
                'user',
                'moderator',
                'admin'
            ]
            })
        )
    }),
    rest.post('/signup', (req, res, ctx) => {
        const { username, firstName, lastName, email } = req.body

        return res(
            ctx.json({
            id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
            username,
            firstName,
            lastName,
            email,
            roles: [
                'user',
                'moderator',
                'admin'
            ]
            })
        )
    }),
    rest.post('/logout', (req, res, ctx) => {}),
    rest.get('/users/:id', (req, res, ctx) => {}),
    rest.put('/users/:id', (req, res, ctx) => {}),
    rest.delete('/users/:id', (req, res, ctx) => {}),
    rest.get('/users', (req, res, ctx) => {}),
    rest.get('/recipes/:id', (req, res, ctx) => {}),
    rest.put('/recipes/:id', (req, res, ctx) => {}),
    rest.delete('/recipes/:id', (req, res, ctx) => {}),
    rest.get('/recipes', (req, res, ctx) => {}),

]