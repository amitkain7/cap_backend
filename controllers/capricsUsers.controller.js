import AdminSchool from "../models/adminSchool.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const CreateAdminSchool = async (req, res, next) => {
    try {

        // const user = await User.findOne({ email: req.body.email })

        // if(user){
        //     throw new Error("User already exists", {
        //         cause: { status: 400 },
        //       })
        // }

        // const hashPassword = await bcrypt.hash(password, 10)
        
        await AdminSchool.create({
            branchRoleId: req.body.roles.map(item => item.value),
            // branchId: req.body.branchId,
            createdBy: req.user._id
        })

        res.json({
            message: "User Added in School"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const FetchAdminSchool = async (req, res, next) => {
    try {

        const adminCapricsUsers = await AdminSchool.find({
            createdBy: req.user._id
        }).populate("createdBy branchRoleId")
        
        res.json({
            message: "User Added in School",
            capricsUsers: adminCapricsUsers
        })
    } catch (error) {
        next(error)
    }
}