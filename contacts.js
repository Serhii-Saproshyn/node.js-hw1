const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find((el) => el.id === contactId) || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return removedContact;
}
async function addContact(name, email, phone) {
  const data = await listContacts();
  const contact = { id: nanoid(), name, email, phone };
  data.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
