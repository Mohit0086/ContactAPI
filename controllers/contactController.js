import { Contact } from "../model/Contact.js";

// API - /api/contact/save
export const save = async (req, res) => {
  const { name, email, mobile, bloodgroup } = req.body;

  if (!name || !email || !mobile || !bloodgroup) {
    return res.json({ message: "All fields required", status: false });
  }

  let checkData = await Contact.findOne({ email });
  if (!checkData) {
    await Contact.create({ name, email, mobile, bloodgroup }); // ✅ save once
    return res.json({ message: "Contact saved successfully", status: true });
  } else {
    return res.json({ message: "Contact already exists", status: false }); // ✅ fixed
  }
};

// API - /api/contact/getAllContact
export const getContacts = async (req, res) => {
  let contacts = await Contact.find();
  if (!contacts) {
    return res.json({ message: "No Contact Available", status: false }); // ✅ return
  }
  return res.json({ message: "All contacts fetched", contacts, status: true });
};

// API - /api/contact/getContactById
export const getContactById = async (req, res) => {
  let id = req.params.id;
  let contact = await Contact.findById(id); // ✅ no need for {_id:id}
  if (!contact) {
    return res.json({ message: "No Data found", status: false }); // ✅ return
  }
  return res.json({ message: "Data fetched successfully", contact, status: true });
};

// API - /api/contact/update/:id
export const updateContactById = async (req, res) => {
  let id = req.params.id;
  let { name, email, mobile, bloodgroup } = req.body;

  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, mobile, bloodgroup },
    { new: true }
  );

  if (updatedContact) {
    return res.json({ message: "Contact updated successfully", status: true });
  } else {
    return res.json({ message: "Contact not found", status: false });
  }
};

// API - /api/contact/deleteContactById
export const deleteContactById = async (res) => {
  let id = req.params.id;
  let deletedContact = await Contact.findByIdAndDelete(id);

  if (deletedContact) {
    return res.json({ message: "Contact deleted successfully", status: true });
  } else {
    return res.json({ message: "Contact not found", status: false });
  }
};