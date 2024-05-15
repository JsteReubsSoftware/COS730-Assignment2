const jwt = require("jsonwebtoken")
const axios = require("axios")
const User = require("../models/userModel");
const Messages = require("../models/messageModel");

// GET requests
const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(200).json({success: true, data: { user: null, message: "No email provided." }});
        }

        // check if collection contains any documents
        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(200).json({success: true, data: { user: null, message: "No users found." }});
        }

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(200).json({success: true, data: { user: null, message: "User not found." }});
        }

        return res.status(200).json({success: true, data: { user: user, message: "User found." }});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(200).json({success: true, data: { user: null, message: "No id provided." }});
        }

        // check if collection contains any documents
        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(200).json({success: true, data: { user: null, message: "No users found." }});
        }

        const user = await User.findOne({_id: id});

        if (!user) {
            return res.status(200).json({success: true, data: { user: null, message: "User not found with provided id." }});
        }

        return res.status(200).json({success: true, data: { user: user, message: "User found." }});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const getUserContacts = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(200).json({success: true, data: { contacts: [], message: "No email provided." }});
        }

        // check if collection contains any documents
        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(200).json({success: true, data: { contacts: [], message: "No users found." }});
        }

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(200).json({success: true, data: { contacts: [], message: "User not found." }});
        }

        return res.status(200).json({success: true, data: { contacts: user.contacts, message: "User found." }});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const getUnknownContacts = async (req, res) => {
    try {
      const email = req.query.email;
  
      if (!email) {
        return res.status(200).json({ success: true, data: { unknownContacts: [], message: "No email provided." }});
      }
  
      // check if collection contains any documents
      const count = await User.countDocuments();
  
      if (count === 0) {
        return res.status(200).json({ success: true, data: { unknownContacts: [], message: "No users found." }});
      }
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(200).json({ success: true, data: { unknownContacts: [], message: "User not found." }});
      }
  
      // Get all messages where my email is sender or receiver
      const messages = await Messages.find({
        $or: [
          { senderId: user._id },
          { receiverId: user._id },
        ],
      });
  
      // Find unknown user ids
      const unknownIds = messages.filter((message) => {
        return (message.senderId.toString() === user._id.toString() && !user.contacts.some((contact) => contact._id.toString() === message.receiverId.toString())) || (message.receiverId.toString() === user._id.toString() && !user.contacts.some((contact) => contact._id.toString() === message.senderId.toString()));
      }).map((message) => {
        return message.senderId.toString() === user._id.toString() ? message.receiverId.toString() : message.senderId.toString();
      })
  
      // Use Set to get distinct unknown Ids
      const distinctUnknownIds = new Set(unknownIds);
  
      // Find users with ids in distinctUnknownIds
      const unknownContacts = await User.find({ _id: { $in: [...distinctUnknownIds] } });
  
      return res.status(200).json({ success: true, data: { unknownContacts, message: "Unknown contacts retrieved." }});

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error retrieving unknown contacts." });
    }
};        

// PUT requests
const updateUserLanguage = async (req, res) => {
    try {
        const { language, email } = req.body;

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to update language. No users found."}});
        }

        const user = await User.findOneAndUpdate({email: email}, {language: language}, {new: true});

        if (!user) {
            return res.status(404).json({success: false, data: {message: "Unable to update language. User with provided email not found."}});
        }

        return res.status(200).json({success: true, data: {user}});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const updateUserBlurText = async (req, res) => {
    try {
        const { blurTextBoolean, email } = req.body;

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to update censorText field. No users found."}});
        }

        const user = await User.findOneAndUpdate({email: email}, {censorText: blurTextBoolean}, {new: true});

        if (!user) {
            return res.status(404).json({success: false, data: {message: "Unable to update censorText field. User with provided email not found."}});
        }

        return res.status(200).json({success: true, data: {user}});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const updateUsername = async (req, res) => {
    try {
        const { username, email } = req.body;
        
        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to update censorText field. No users found."}});
        }

        const user = await User.findOneAndUpdate({email: email}, {name: username}, {new: true});

        if (!user) {
            return res.status(404).json({success: false, data: {message: "Unable to update censorText field. User with provided email not found."}});
        }

        return res.status(200).json({success: true, data: {user}});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const addContact = async (req, res) => {
    try {
        const { newContactEmail, myEmail } = req.body;

        if (newContactEmail === myEmail) {
            return res.status(404).json({success: false, data: {message: "Unable to add contact. Email cannot be the same."}});
        }

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to add contact. No users schema."}});
        }

        // check if user exists
        const newContact = await User.findOne({email: newContactEmail});

        if (!newContact) {
            return res.status(404).json({success: false, data: {message: "Unable to add contact. No user found with provided email."}});
        }

        const user = await User.findOneAndUpdate({email: myEmail}, {$push: {contacts: newContact}}, {new: true});

        if (!user) {
            return res.status(404).json({success: true, data: { user: null, message: "User with provided email not found" }});
        }

        return res.status(200).json({success: true, data: { user: user, message: "User found and contact added" }});

    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

// DELETE requests

const removeContact = async (req, res) => {
    try {
        const { contactEmail, myEmail } = req.body;

        if (contactEmail === myEmail) {
            return res.status(404).json({success: false, data: {message: "Unable to remove contact. Email cannot be the same."}});
        }

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to remove contact. No users schema."}});
        }

        
        //check if the user is one of our contacts
        const contact = await User.findOne({contacts: {$elemMatch: {email: contactEmail}}});
        if (!contact) {
            return res.status(200).json({success: false, data: {message: "Unable to remove contact. User is not one of our contacts."}});
        }

        // check if user exists
        const user = await User.findOneAndUpdate({email: myEmail}, {$pull: {contacts: {email: contactEmail}}}, {new: true});

        if (!user) {
            return res.status(404).json({success: false, data: { user: null, message: "User with provided email not found" }});
        }

        // also remove all messages exhanges between users if the other user does not exist

        // check if user exists
        const otherUser = await User.findOne({email: contactEmail});

        if (otherUser) {
            return res.status(200).json({success: true, data: { user: user, message: "User found and contact removed. No need to clear chat history." }});
        }

        const messages = await Messages.deleteMany({$or: [{senderId: contactEmail, receiverId: myEmail}, {senderId: myEmail, receiverId: contactEmail}]});

        if (!messages) {
            return res.status(404).json({success: false, data: { user: null, message: "User found and contact removed but unable to clear messages" }});
        }

        return res.status(200).json({success: true, data: { user: user, message: "User found and contact removed and chat history cleared" }});

    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json({success: false, data: {message: "No email provided."}});
        }

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to delete account. No users schema."}});
        }

        // check if user exists
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({success: false, data: { user: null, message: "User with provided email not found" }});
        }

        // run through user contacts and remove user from contacts' list of contacts

        const contacts = user.contacts;

        for (let i = 0; i < contacts.length; i++) {
            const contact = await User.findOneAndUpdate({email: contacts[i].email}, {$pull: {contacts: {email: email}}}, {new: true});
        }

        // delete all messages with the user as the sender or receiver

        const messages = await Messages.deleteMany({$or: [{senderId: user._id.toString()}, {receiverId: user._id.toString()}]});

        if (!messages) {
            return res.status(404).json({success: false, data: { user: null, message: "User found but unable to clear messages" }});
        }

        // delete user

        const deletedUser = await User.findOneAndDelete({email: email});

        if (!deletedUser) {
            return res.status(404).json({success: false, data: { user: null, message: "User found but unable to delete user" }});
        }

        return res.status(200).json({success: true, data: { user: deletedUser, message: "User found and deleted" }});
    } 
    catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

module.exports = {
    getUserByEmail,
    getUserContacts,
    getUnknownContacts,
    getUserById,
    updateUserLanguage,
    updateUserBlurText,
    updateUsername,
    addContact,
    removeContact,
    deleteAccount
}