import mongoose from "mongoose";

// 1 - create a schema
const noteSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    }, 
    content: {
        type : String,
        required : true
    }
}
, {timestamps : true} // mongodb will defaultly create createdAt and updatedAt fields for us
);


// 2 - model based on that schema
const Note = mongoose.model("Note", noteSchema); // create a note model based on noteSchema

export default Note;