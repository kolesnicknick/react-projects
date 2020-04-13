import {Request, Response} from "express";
import * as HttpStatus from "http-status-codes";
import Contact, {IContact} from "../models/Contact"
import {validationResult} from "express-validator";


export const getContacts = async (_: Request, res: Response) => {
    try {
        const contacts = await Contact.find({user: _.user}).sort({date: -1});
        res.json({
            contacts
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const createContact = async (_: Request, res: Response) => {
    const errors = validationResult(_);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json(errors)
    }

    const {name, email, phone, type} = _.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: _.user
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
};

export const updateContact = async (_: Request, res: Response) => {
    const {name, email, phone, type} = _.body;
    const contactFields: IContact = _.body;

    try {
        let contact = await Contact.findById(_.params.id);
        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        if (contact.user.toString() !== _.user) {
            return res.status(403).json({msg: 'You have no rights to update this user'});
        }

        contact = await Contact.findByIdAndUpdate(_.params.id,
            {$set: contactFields},
            {new: true});

        res.json(contact);
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Something went wrong'});
    }
};

export const deleteContact = async (_: Request, res: Response) => {
    try {
        let contact = await Contact.findById(_.params.id);
        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        if (contact.user.toString() !== _.user) {
            return res.status(403).json({msg: 'You have no rights to update this user'});
        }

        contact = await Contact.findByIdAndDelete(_.params.id);

        res.json({msg: `Contact with id ${_.params.id} is deleted`});
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Something went wrong'});
    }
};