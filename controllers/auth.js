const authController = {
    protect : async (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id);
            if (!user) {
                res.json({ message: 'User not found', success: false});
            } else {
                req.user = user;
                next();
            }
        } else {
            res.json({ message: 'You must be logged in to view this page', succcess: false});
        }
    },
    authorize : (roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                res.json({ message: `You must be a ${roles} to view this page`, success: false});
            } else {
                next();
            }
        }
    },
    getInfo: async (req, res) => {
        res.json(req.user);
    }
    
}