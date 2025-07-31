import { ApiError } from "../utils/ApiError";   
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async(req, _, next) => { //verifyJWT is a middleware function that checks if the request has a valid JWT token 
    //(req, res , next) 
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        //console.log(token);
        if(!token){
            throw new ApiError(401, "Unauthorised request, no token provided");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next();    
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
})