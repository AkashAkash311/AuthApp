const bcrypt = require('bcrypt');
const User = require("../Models/User");
const jwt = require("jsonwebtoken")

require("dotenv").config()

// Sign up route handler
exports.signup = async (req,res) =>{
    try {
        // get data
        const {name, email, password, role} = req.body;
        
        // check if user already exists
        const existingUser = await User.findOne({email}); 
        
        if(existingUser){
            return res.status(400).json({
                Success: false,
                message: "User already exist babyyyyyyy",
            })
        }

        // Secure Password
        let hashedPassword;
        try {
            hashedPassword= await bcrypt.hash(password,12);

        }  catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        // Create entry of the user 
        let user = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        });

        return res.status(200).json({
            success : true,
            message : "User bn gya sexyfullyyy",
            data : user
        });

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : 'User cannot be register, Please try again later',
        })
    }
}


// login route handler

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please provide an email and a password"
            })
        }

        //check for registered user
        let user = await User.findOne( {email} );
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User does not exist",
            })
        }

        // Verify password & generate a JWT token

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };
        
        if(await bcrypt.compare(password,user.password)){
            //Password match
            let token = jwt.sign(payload, process.env.JWT,{
                expiresIn : "2h",  //Token will expire in 2 hours
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60* 1000),
                httpOnly : true,
            }

            res.cookie( 'token', token ,options ).status(200).json({
                success:true,
                token,
                user,
                message: "User logged in successfully"
            });
        }
        else{
            // Password not match
            return res.status(403).json({
                success : false,
                message : "Login false"
            })
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Login false" 
        })
    }
}