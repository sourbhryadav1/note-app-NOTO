import Note from "../models/note.js";

export const getAllNotes = async (req, res) => {  // if not using any argument, skip them with a underscore,  (req,res) --> (request, response) the order never changes
    try {
        const notes = await Note.find({ owner: req.user.userId }).sort({createdAt:-1}); // newest first
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes: ", error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
};

export const getNoteWithId = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.user.userId });

        if (!note) return res.status(404).json({message: "Note not found!"});
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteWithId: ", error);
        res.status(500).json({message: "Internal server error!"});
    }
};

// can also write as regular fn ;
export async function createANote(req, res) {
    try {
        const {title, content} = req.body;
        // console.log(title, content)
        const note = new Note({title, content, owner: req.user.userId});

        const savedNote = await note.save()
        res.status(201).json({savedNote})
    } catch (error) {
        console.log("Error in createANote: ", error)
        res.status(500).json({
            message: "Internal server error!"
        });
    }
};

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.userId }, 
            { title, content }, 
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({message: "Note not found!"});
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        console.log("Error in updateNote: ", error)
        res.status(500).json({message: "Internal server error!"});
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });

        if (!deletedNote){
            return res.status(404).json({message: "Note not found!"});
        }

        res.status(200).json({message: "Note deleted successfully!"})
    } catch (error) {
        console.log("Error in deleteNote: ", error);
        res.status(500).json({message: "Internal server error!"});
    }
};
