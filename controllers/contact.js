import Contact from "../models/Contact.js"

export const createContact = async (req, res, next) => {
    const newContact = new Contact(req.body)
    try {
        await newContact.save()
        res.status(200).send("Your message has been delivered Successfully")
    } catch (error) {
        next(error)
    }
}


export const getContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
        res.status(200).json(contact)
    } catch (error) {
        next(error)
    }
}

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}
export const deleteContact = async (req, res, next) => {
    try {
        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).send("Message has been successfully deleted")
    } catch (error) {
        next(error)
    }
}