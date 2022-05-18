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

async function showeMesage({ title, data }) {
    console.log(title);
    console.table(data);
}

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            showeMesage(await listContacts());
            break;

        case "get":
            showeMesage(await getContactById(id));
            break;

        case "add":
            showeMesage(await addContact(name, email, phone));
            break;

        case "remove":
            showeMesage(await removeContact(id));
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(arg);
