import { connect } from '@/bdConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { send } from 'process';

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { username, email, password }  = reqBody

        //validation
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "user already exists" },
                { status: 400 })
        }

        const salt = await bcryptjs.genSaltSync(10);
        const hashpassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);


        // send verification email
        await sendEmail({ email, eamilType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }),
            { status: 500 }
    }

}

