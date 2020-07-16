import * as express from 'express';
import * as contactController from '../controllers/contact.controller';
import { auth } from '../middleware/auth';
import { check } from 'express-validator';

const router = express.Router();


//@route    GET api/contacts/
//@desc     Get list of available contact for user
//@access   Private
router.get('/', auth, contactController.getContacts);

//@route    POST api/contacts/
//@desc     Create a contact
//@access   Private
router.post('/', [auth, [
  check('name', 'Name is required').notEmpty()
]], contactController.createContact);

//@route    PUT api/contacts/
//@desc     Create a contact
//@access   Private
router.put('/:id', auth, contactController.updateContact);

//@route    Delete api/contacts/
//@desc     Create a contact
//@access   Private
router.delete('/:id', auth, contactController.deleteContact);

export default router;
