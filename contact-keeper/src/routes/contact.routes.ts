import * as express from "express";
import * as contactController from '../controllers/contact.controller'
const router = express.Router();


//@route    GET api/contacts/
//@desc     Get list of available contact for user
//@access   Private
router.get("/", contactController.getContacts);

//@route    POST api/contacts/
//@desc     Create a contact
//@access   Private
router.post("/", contactController.createContact);

//@route    PUT api/contacts/
//@desc     Create a contact
//@access   Private
router.put("/:id", contactController.updateContact);

//@route    Delete api/contacts/
//@desc     Create a contact
//@access   Private
router.delete("/:id", contactController.deleteContact);

export default router;