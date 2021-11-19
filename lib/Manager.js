const Employee = require('./Employee');

class Manager extends Employee {
    constructor (name, id, email, officePhone) {
        super(name, id, email);
        this.officePhone = officePhone;
    }

    getOfficePhone() {
        return this.officePhone;
    }

    getRole(){
        return "Manager"
    }
}

module.exports = Manager;