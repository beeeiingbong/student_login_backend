const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const bcrypt= require('bcryptjs');


const userSchema = new Schema({
    firstName:{type: String, required:true },
    lastName:{type:String, required:true},
    email:{
        type:String,
        required:true,
        unique: true,
          },
    password:{
        type:String,
        required:true
    }      
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
        
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isPasswordValid = async function(value){
    try{
        return await bcrypt.compare(value, this.password)
    }
    catch(error){
        throw new Error(error)
    }
}

module.exports = mongoose.model('user', userSchema)

