import { CustomError } from "@utils/errors";
import StatusCodes from "http-status-codes";
import { errors } from "@constants";
import { userModel } from "@models/index";
const jwt = require("jsonwebtoken");


function signUp(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { role, name, email, phoneNumber, countryCode, dob } = user
            const userFound: any = await userModel.findOne({ phoneNumber: phoneNumber, isDelete: false })
            if (userFound) {
                new CustomError(errors.en.noSuchAccountExist, StatusCodes.BAD_REQUEST)
            } else {
                const userData = await userModel.create(user);
                const token: string = jwt.sign({
                    id: userData.id,
                    role,
                },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: "30d" }
                );
                await userModel.findOneAndUpdate({ _id: userData._id },
                    { $set: { token: token } })
                resolve({ token, name: userData.name, email: userData.email, phoneNumber: userData.phoneNumber });
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}


function login(body: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { phoneNumber } = body;
            const { devicetoken, devicetype, timezone, language, currentversion } = headers;
            let userData: any;
            let token: string = "";
            userData = await userModel.findOne({ phoneNumber, isDelete: false });
            if (!userData) {
                reject(new CustomError(errors.en.noSuchAccountExist, StatusCodes.BAD_REQUEST));
            } else {
                token = jwt.sign(
                    {
                        id: userData.id,

                    },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: "365d" }
                );
                await userModel.findOneAndUpdate({ _id: userData._id },
                    { $set: { token: token } })
                resolve({
                    token, name: userData.name, email: userData.email,
                    phoneNumber: userData.phoneNumber
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}








// Export default
export default {
    signUp,
    login

} as const;
