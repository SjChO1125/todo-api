import mongoose from "mongoose";
const TaskSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:30,

        },
        description:{
            type:String,
        },
        isComplete:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps:true,
    },

);
const Task=mongoose.model('Task',TaskSchema);
//Task몽고디비 컬렉션 이름을 결정지음->tasks로 지어짐


export default Task;