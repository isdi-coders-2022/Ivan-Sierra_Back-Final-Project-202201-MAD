import bcrypt from 'bcryptjs';

export default {
    services: [
        {
            name: 'Cambiar el aceite',
            price: '0',
        },
        {
            name: 'Cambiar bombilla',
            price: '0',
        },
        {
            name: 'Cambiar neumático',
            price: '0',
        },
    ],
    garages: [
        {
            user: 'Pepe',
            pass: bcrypt.hashSync('1234'),
            garage_name: 'Aurgi',
            cif_nif: '6518498419',
            email: 'jsbdfin',
            phone: 658414984,
            web: 'sffsgsfgs',
            address: 'adgsfgdfg',
            services: [],
        },
        {
            user: 'Juan',
            pass: bcrypt.hashSync('1234'),
            garage_name: 'Norauto',
            cif_nif: '6518498419',
            email: 'ghrehtyh',
            phone: 658414984,
            web: 'rghnfgjt',
            address: 'dsgnghgdh',
            services: [],
        },
    ],
};
