
export const isAuth = async (req, res, next) => {
    console.log(req.headers)
    next()

}