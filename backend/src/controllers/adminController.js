const Role = require("../models/Role")
const Group = require("../models/Group")


function getRoles(req, res) {
    const errors = {}
    try{
        Role.find().then((roles)=>{
            if(!roles){
                errors.roles("Unable to find roles")
                return res.status(404).json(errors);
            };
            return res.status(200).json(roles)
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Internal server error." })
    }        
}


function getGroups(req, res) {
    const errors = {}
    try{
        Group.find().then((groups)=>{
            if(!groups){
                errors.groups("Unable to find roles")
                return res.status(404).json(errors);
            };
            return res.status(200).json(groups)
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Internal server error." })
    }  
}


module.exports = {
    getRoles: getRoles,
    getGroups: getGroups,
};