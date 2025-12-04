import mongoose, {Schema} from 'mongoose'
//import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const bookingSchema=new Schema ({
            date:{
                type:String,
                required:true
               
            },
            username:{
                type:String,
                required:true

            },
              slot:{
                type:String,
                required:true
            
            },
            phone:{
                type:Number,
                required:true
            },
            visitors:{
                type:Number,
                required:true,
                default:1
                
            },
            city:{
                type:String,
                required:true
            },
            elders:{
                type:Number,
                default:0
            },
            differentlyAbled:{
                type:Number,
                default:0
            },
            temple:{
                type:String,
                required:true
            },
            id:{
                type:String,
                required:true,
                unique:true
            },
            bookedBy: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            status:{
                type:String,
                default:"SCHEDULED"
            }

            
},
{
    timestamps:true
}
)

//bookingSchema.plugin(mongooseAggregatePaginate)

export const Booking= mongoose.model("Booking",bookingSchema)

export default Booking