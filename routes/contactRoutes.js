import express from "express";
import { getContactById, getContacts, save, updateContactById, deleteContactById } from "../controllers/contactController.js";
import { isAuthenticate } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/save",isAuthenticate, save);
router.get("/getAllContacts", getContacts);  
router.put("/update/:id", updateContactById); 
router.delete("/delete/:id", deleteContactById);
router.get("/:id", getContactById);        

export const contactRoutes = router;