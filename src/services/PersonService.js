const Person = require("../models/Person");

module.exports = class PersonService {
  static async createPerson(data, userScope) {
    try {
      const newPerson = {
        code: data.code,
        email: data.email,
        name: data.name
      }
      if (userScope.canEditPersonalData) {
        newPerson.personalData = data.personalData;
      }
      if (userScope.canEditSensitiveData) {
        newPerson.sensitiveData = data.sensitiveData;
      }
      const response = await new Person(newPerson).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async readAllPeople(userScope) {
    try {
      let fields = "code email name";
      if (userScope.canViewPersonalData) {
        fields += " personalData";
      }
      if (userScope.canViewSensitiveData) {
        fields += " sensitiveData";
      }

      const allPeople = await Person.find({}).select(fields);
      return allPeople;
    } catch (error) {
      console.log(`Could not fetch people ${error}`);
    }
  }  

  static async readPersonById(personId) {
    try {
      const person = await Person.findById({ _id: personId });
      return person;
    } catch (error) {
      console.log(`Person not found. ${error}`);
    }
  }

  static async updatePerson(id, person) {
    try {
      const updateResponse = await Person.updateOne(
        { _id: id },
        { ...person, date: new Date() }
      );

      return updateResponse;
    } catch (error) {
      console.log(`Could not update Person ${error}`);
    }
  }

  static async deletePerson(personId) {
    try {
      const deletedResponse = await Person.findOneAndDelete({ _id: personId });
      return deletedResponse;
    } catch (error) {
      console.log(`Could not delete person ${error}`);
    }
  }
};
