import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        const user = await User.findOne({ email }); //check if user exists
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        const validPassword = await bcryptjs.compare(password, user.password); //check if password is correct
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        const tokenData = { id: user._id, username: user.username, email: user.email }; //token data
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRETE!, { expiresIn: "1d" }); //create token
        const response = NextResponse.json({ message: "Login successful", success: true, id: user._id });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};