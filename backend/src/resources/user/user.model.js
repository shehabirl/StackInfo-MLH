import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    description: {
        type: String
    }

})

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }

            resolve(same)
        })
    })
}

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            console.log(`Hash error ${err} with user ${this.username} `);
            return next(err)
        }
        this.password = hash
        next()
    })
})
/**
 * function: isValidPassword
 * parameters: req.body.password (String)
 * return type: void
 * description: used in authentication process, making sure the password 
 *  in the HTTP request, matches the password inside the database
 *  is thrown.
 *  test cases:
 */
userSchema.methods.isValidPassword = async function(password){
try {
    return await bcrypt.compare(password, this.password);
} catch (error) {
    throw error
}
}

export const User = mongoose.model('user', userSchema);