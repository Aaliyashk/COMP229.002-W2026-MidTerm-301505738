let UsersModel = require('../models/users');


// GET ALL USERS
module.exports.usersList = async function (req, res, next) {
    try {

        let users = await UsersModel.find();

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found.",
                data: []
            });
        }

        let formattedUsers = users.map(user => {
            let obj = user.toObject();
            obj.id = obj._id;
            delete obj._id;
            delete obj.__v;
            return obj;
        });

        res.json({
            success: true,
            message: "User list retrieved successfully.",
            data: formattedUsers
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


// GET USER BY ID
module.exports.getByID = async function (req, res, next) {
    try {

        let user = await UsersModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
                data: null
            });
        }

        let obj = user.toObject();
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: obj
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


// ADD USER
module.exports.processAdd = async (req, res, next) => {
    try {

        let newUser = await UsersModel.create(req.body);

        let obj = newUser.toObject();
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;

        res.json({
            success: true,
            message: "User created successfully.",
            data: obj
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


// UPDATE USER
module.exports.processEdit = async (req, res, next) => {
    try {

        let updatedUser = await UsersModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            message: "User updated successfully."
        });

    } catch (error) {
        next(error);
    }
};


// DELETE USER
module.exports.performDelete = async (req, res, next) => {
    try {

        let deletedUser = await UsersModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};