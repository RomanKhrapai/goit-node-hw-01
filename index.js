const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require("./contacts.js");
const { Command } = require("commander");
const argv = require("yargs").argv;

const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const arg = program.opts();

async function showMessage({ title, data }) {
    console.log(title);
    console.table(data);
}

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            showMessage(await listContacts());
            break;

        case "get":
            showMessage(await getContactById(id));
            break;

        case "add":
            showMessage(await addContact(name, email, phone));
            break;

        case "remove":
            showMessage(await removeContact(id));
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(arg);
