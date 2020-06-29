const employeers = [
    {
        dept_unit_id: 0,
        id: 0,
        name: "YarikHead",
        tel: "123-123-3", 
        salary: 3000
    },
    {
        id: 1,
        name: "MashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2000
    },
    {
        id: 2,
        name: "SashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2200
    },
    {
        id: 3,
        name: "MirraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1200
    },
    {
        id: 4,
        name: "IraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1000
    },
    {
        id: 5,
        name: "DanikHead3",
        dept_unit_id: 3,
        tel: "123-123-33",
        salary: 3000
    },
    {
        id: 7,
        name: "KoliaLead",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2000
    },
    {
        id: 6,
        name: "OliaLead3",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2200
    },
    {
        id: 9,
        name: "SienaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1000
    },
{
        id: 8,
        name: "LenaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1200
    }
];

let developer = {
    name: 'Developers',
    id: 2,
    dept_units: [],
};
let devLead = {
    name: 'Lead Developers',
    id: 1,
    dept_units: [developer]
};
let devDeptHead = {
    name: 'Development Management',
    id: 0,
    dept_units: [devLead],
};
let qaTester = {
    name: 'Testers',
    id: 5,
    dept_units: [],
};
let qaLead = {
    name: 'Lead QA',
    id: 4,
    dept_units: [qaTester],
};
let qaDeptHead = {
    name: 'Quality Assurance Management',
    id: 3,
    dept_units: [qaLead],
};