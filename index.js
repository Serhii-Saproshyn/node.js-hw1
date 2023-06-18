const contactsOperation = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list": {
      const allContacts = await contactsOperation.listContacts();
      console.log(allContacts);
      break;
    }
    case "get": {
      const contact = await contactsOperation.getContactById(id);
      console.log(contact);
      break;
    }
    case "add": {
      const contact = await contactsOperation.addContact(name, email, phone);
      console.log(contact);
      break;
    }
    case "remove": {
      const contact = await contactsOperation.removeContact(id);
      console.log(contact);
      break;
    }
    default:
      console.warn("\x1B[31m Unknown action type!"); // не розумію до чого тут "\x1B[31m", якщо можна поясніть:))
  }
};

invokeAction(options);
