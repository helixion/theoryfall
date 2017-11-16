const knex = require('../../setup');
const request = require('got');

(async function update() {
    try {
        const powers = await request('https://api.malekai.network/powers', {json: true});
        const dbPowers = await knex.select().from('powers');

        let query = [];
    
        // if (Array.isArray(powers.body)) {
        //     query = powers.body.map((power) => {
        //         let p;
        //         dbPowers.forEach(dbPow => {
        //             if (power.id !== dbPow.slug || !dbPow) {
        //                 p = power;
        //             }
        //         })
        //         return p;
        //     });
        // } else {
        //     console.log('problem with array');
        // }

        powers.body.forEach(power => {
            let p;
            dbPowers.forEach(dbPow => {
                if (power.name !== dbPow.name) {
                    p = power;
                }
            })
            query.push(p);
        });

        console.log(query);
        process.exit(0);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
})();