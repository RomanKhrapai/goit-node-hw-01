const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const message = {
            title: "get contacts = ok",
            data: JSON.parse(data),
        };
        return message;
    } catch (err) {
        console.log(err);
    }
}

async function getContactById(contactId) {
    const { data } = await listContacts();
    const newData = data.filter(({ id }) => id === contactId);
    const message = {
        title: `get contact (${contactId}) = ok`,
        data: newData,
    };
    return message;
}

async function removeContact(contactId) {
    const { data } = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData), "utf8");
    const message = {
        title: `delete contact (${contactId}) = ok`,
        data: newData,
    };
    return message;
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };
    try {
        const { data } = await listContacts();
        const newData = [...data, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newData), "utf8");
        const message = {
            title: "add contact = ok",
            data: newContact,
        };
        return message;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    contactsPath,
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
