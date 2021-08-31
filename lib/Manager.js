const Employee = require('./Employee');

class Manager extends Employee {
    constructor (name, id, email, officePhone) {
        this.officePhone = officePhone;

        super(name, id, email);
    }

    getOfficePhone() {
        return this.officePhone;
    }

    getRole(){
        return "Manager"
    }
}

module.exports = Manager;