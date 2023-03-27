const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")

noteRouter.get("/", async(req,res)=>{
//    logic
try{
    const notes=await NoteModel.find()
    res.status(200).send(notes)
}catch(err){
    res.status(400).send({"msg":err.message})
}
    
})

noteRouter.post("/add",async(req,res)=>{
    // logic
   try{
    const note=new NoteModel(req.body)
    await note.save()
    res.status(200).send({"msg":"A new Note has been added"})
   }catch(err){
    res.status(400).send({"msg":err.message})
   }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    // logic
    const payload=req.body
    const noteID=re.params.noteID
    try{
        await NoteModel.findByIdAndUpdate({_id:noteID})
        res.status(200).send({"msg":"Note has been updated"})

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.delete("/delete/:noteID", async(req,res)=>{
    // logic
    const payload=req.body
    const noteID=re.params.noteID
    try{
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":"Note has been DELETED"})

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports={
    noteRouter
}