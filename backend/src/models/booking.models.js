import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const bookingSchema=new Schema ({
            visitDate:{
                type:string,
                required:true
               
            },
            name:{
                type:String,
                required:true

            },
              visitSlot:{
                type:string,
                required:true
            
            },
            total:{
                type:Number,
                required:true
                
            },
            temple:{
                type:string,
                required:true
            }

            
}
)

bookingSchema.plugin(mongooseAggregatePaginate)

export const Booking= mongoose.model("Booking",bookingSchema)

export default Booking