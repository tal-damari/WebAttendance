import jwt from 'jsonwebtoken';

export const generateToken = (username, password) => {
    return jwt.sign({username, password}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

export const verifyToken = (req, res, next) => {
    if (!req.headers.cookie) {
        res.status(401).send({message: "Unauthorized"})
    }

    const token = req.headers.cookie.split('=')[1]
    if (!token) return res.status(401).send({message: "Unauthorized"})

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(401).send({message: err + "Unauthorized"})
        }
        return next();
    })
}
