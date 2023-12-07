import AdminSchool from "../models/adminSchool.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const CreateAdminSchool = async (req, res, next) => {
    try {
        const { password } = req.body


        const user = await User.findOne({ email: req.body.email })

        if(user){
            throw new Error("User already exists", {
                cause: { status: 400 },
              })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        
        await User.create({
            ...req.body,
            hash: hashPassword,
            usertype: "School Admin",
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

        const adminSchoolUsers = await User.find({
            // createdBy: req.user._id
            usertype: "School Admin"
        }).populate("roleid createdBy")
        
        res.json({
            message: "User Added in School",
            schoolUsers: adminSchoolUsers
        })
    } catch (error) {
        next(error)
    }
}