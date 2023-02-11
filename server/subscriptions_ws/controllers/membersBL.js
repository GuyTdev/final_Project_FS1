import Member from '../models/Member.js'

/**Create POST */
export const createMember = async (req, res) => {
    try {
        console.log(req.body);
    const obj = req.body;

    const newMember = new Member(obj)

        await newMember.save();

        res.status(201).json(newMember );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/**Read GET */
export const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMember = async (req, res) => {
    const { id } = req.params;

    try {
        const member = await Member.findById(id);
        res.status(200).json(member);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/**Update PATCH / PUT */
export const updateMember = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, city } = req.body;

        const updatedMember = {  name, email, city };

        await Member.findByIdAndUpdate(id, updatedMember)
        return res.status(204).json(updatedMember)
       
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/**Delete DELETE */
export const deleteMember = async (req, res) => {
    try{
        const { id } = req.params;

        const resp = await Member.findByIdAndRemove(id);
        if(resp){
            res.status(202).json({message: `Member with id :${resp._id} deleted successfully`} );
        }else{
            res.status(404).send({ message:`No Member with id: ${id}`})

        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


