const PersonService = require("../services/PersonService");

exports.create = async (req, res) => {
  try {
    const createdPerson = await PersonService.createPerson(req.body);
    res.status(201).json(createdPerson);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.read = async (req, res) => {
  let id = req.params.id;

  try {
    const person = await PersonService.readPersonById(id);
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.readAll = async (req, res) => {
  try {
    const people = await PersonService.readAllPeople();

    /*if (!people) {
      return res.status(404).json("There are no people published yet!");
    }*/

    res.json(people);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;

  try {
    const person = {};
    person.name = req.body.name;
    person.email = req.body.email;
    
    const updatedPerson = await PersonService.updatePerson(id, person);

    if (updatedPerson.nModified === 0) {
      return res.status(404).json({});
    }

    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResponse = await PersonService.deletePerson(id);
    res.json(deleteResponse);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
