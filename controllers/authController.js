require('dotenv').config()
const bcrypt = require('bcryptjs');
const { User } = require('../schemas/user')
const Response = require('../models/apiResponse')
const admin = require("firebase-admin");



const signup = async (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .then(dbUser => {
            //checks if the email exists or not
            if (dbUser) {
                return res.json(Response.failure('Email is taken'))
            }
            //checks if the password is provided or not
            else if (!req.body.password) {
                return res.json(Response.failure('Password should not be empty'))
            }
            //cheks if the email is provided or not
            else if (!req.body.email) {
                return res.json(Response.failure('Email should not be empty'))
            }
            //if the all credentials are provided and unique
            else if (req.body.password && req.body.email) {
                //hashes the password for safety
                bcrypt.hash(req.body.password, 12, async (err, hashedPassword) => {
                    if (err) {
                        return res.json(Response.failure('Could not hash the password'))
                    }
                    else if (hashedPassword) {
                        //creates the user
                        const newUser = await new User({
                            username: req.body.name,
                            email: req.body.email,
                            password: hashedPassword
                        });
                        //saves the user to the database
                        await newUser.save((err, data) => {
                            if (err) {
                                return res.json(Response.failure('Error while creating user'))
                            }
                            else {
                                return res.json(Response.success('User is successfully created', data))
                            }
                        })
                    }
                })
            }
        })
}

const login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .then(dbUser => {
            if (!dbUser) {
                return res.json(Response.failure('User not found'))
            }
            else {

            }
        });
}

//this part is actually doing the work of expressJWT 
//but I keep getting an invalid signature error wheter I use this one or expressJWT
//login and signup functions are working perfectly, but because of this, I can't protect any routes

const serviceAccount = {
    "type": "service_account",
    "project_id": "uni-social-2",
    "private_key_id": "3b73192642f9d8a40a591085b108dced961ec23b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqH1z9VQQmpUJ1\nupBINf4LZPD9Rv2DL+jZJQFUw3+rgIG4qlxZZPkUtRdJ+BFINnzuPhL9bQ9OuF84\ndxyiG0jPxLiBZdnjGw6fBketKxMR9skv8bEbg62PDBs+MSei9UOP3EOeOpu1uJcX\nPPUEKeQYvdJiwTp0ke9vqgnSKslbhDACw++jrNVTqNHlsxBiStOI8NkIA2siHCEv\ni+XunrO5VUg3fX6DldTTBOx7ZAlFgwJoK2uRFf5jDBTWmRNV+78Cohwbi1ouvaHd\n6e+rnBHd2Q3cxYmjZQ/bDuGlyw4sPLqdJi3h03vytfNHbwMBo2GguMupcuXmhLTO\njNXNUqobAgMBAAECggEANfyU+GnJ0u+/yveFAP1tXLVQSrgEDGUgSgSVyw3tToIN\n6Inbm5zQ9JLRTK514Yo1FC/Lu/Onl24n/ZXDFuh8rz545MtrHUiBV9LY3Sndt+Yu\ni1HyR85+PfZ0EMTtlKerpJQcOzLTJhRpkjzMbmFS2s0mXiN+xu5m4vM9gZ4FX05r\nmdSF8dIRhzzASpzEzmklRoRN7CJlXI/3eez+eVD7cXiGOZkHjmjfTeP9cq51Iorv\nr5ZbYs5nbxDZHmf0gkDAP0/G5t0YaSNh+CRN5CpgxsMlIWjC6oMcLJmSrgx3kaWu\nmQtKLcTi+l1nePMTb8fB8knXRgpZW/iLbTcU5LjjLQKBgQDYX6chx1jYY2ljdb/m\n5T6lrIGnEWh+qU6Z7yxyfSwBkEV7Y1t0A4NDuB2VB/Trl9OuXfIanBwQTAnWkVy/\nbOWXFUUUx5B8BRrhMnVid/IPrMADQg5ORcKkwCXNlQCejhVSPK4705EL9XdO1SKX\n8oX9YlyKx/IXs6XYXGnTn4GbZwKBgQDJR0wAElpV1N/5MbIKmK0VFKljNPc2N3Yz\nT3VGvqbVmvC/cN/1E7DvGdEc/IQsS6wWkVEHukhXuK4bl6abMLqYHLqRzfOaHu3n\nqjb/yDhdZqmCY/D2zODV/T4IaEUufqVA8Q2vEYbccTeN5ds+MA7TuJY/Ua5n8Uay\nRw+KS9Q/LQKBgHfXyw9XhascrMOs9WRi9ub2fD1X1APLrMBwC7NCBzy6dvGXn5DL\nXUoF0US5Snuu9UzvteftLVINe6l/i9pu619aJZAT1MAMZ83xj7jBbK4n5ZYoYRoT\nY3KzBn0umVA4rDCHcY2rafwwsitUu7tjVbl5YH5xrnJYS3RiAy92emfjAoGBAIKu\nLaPmRoxvl7M9FrFWixmivo9QtiiXPcD2l9gEtGD/JcvFx0JhNIEoq+I7+LyhrOtC\nEfAIfCuoFjKH9X3Q13UnQeKkasLnzeKZWvga0K2jl+62YJ58SoXk07+1oyUayMQv\nPYkqwfqh70XLtNrdbOL9d19I8wk9V38sL+TEcttJAoGAEiDJHW6x3cBT1jzb39Ko\nBBaYyz1oushS3pPEIo/u1NIWgjx9Dgi6a8a3U+IRIMboMMDpDOnuysRoqdXFB/1z\nkOqOHzHZq701Gb8q1P/Orx40rqEAStuEl7nbx4Ll6/tVL6Edc97GkyfxAeZfZvSf\nlPhUKEDtHPWdGiH13vMUlwc=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-t2awu@uni-social-2.iam.gserviceaccount.com",
    "client_id": "104866973247080524207",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t2awu%40uni-social-2.iam.gserviceaccount.com"
}

const isAuth = async (req, res, next) => {

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    try {
        const nonSecurePaths = ['/login', '/signup']
        if (nonSecurePaths.includes(req.path)) return next();

        const token = req.headers.authorization.split(' ')[1];
        console.log(token);

        const decodeValue = admin.auth().verifyIdToken(token);
        if (decodeValue) {
            return next();
        }
        return res.json(Response.failure('Unauthorized'))
    } catch (error) {
        console.log(error.message);
        return res.json(Response.failure('Something went wrong while authorizing the user'));
    }
};

module.exports = { signup, login, isAuth };