const knex = require('../setup');
const request = require('got');

(async function() {
    try {
        const data = await request('https://api.malekai.network/races', { json: true });
        const classTable = await knex.select('id', 'slug').from('classes');
        const races = await knex.select('id', 'slug').from('races');

        let query = [];

        data.body.forEach(d => {
            const { classes } = d;
            const raceMatch = races.find(r => r.slug === d.id);
            let raceId;
            let classId;
            if (raceMatch) {
                raceId = raceMatch.id;
                for (let i = 0; i < classes.length; i++) {
                    const classMatch = classTable.find(cl => cl.slug === classes[i]);
                    if (classMatch) {
                        query.push({
                            class_id: classMatch.id,
                            race_id: raceId
                        });
                    }
                }
            }
        })

        if (query.length > 0) {
            
            const sortedQuery = query.sort((a, b) => {
                return a.class_id-b.class_id;
            });

            const results = await knex.insert(sortedQuery).into('class_races').returning(['class_id', 'race_id']);

            if (results.length > 0) {
                results.forEach(r => console.log(`class_id:${r.class_id} race_id: ${r.race_id}`));
            }
        }
        process.exit(0);
    }
    catch(e) {
        console.log(e);
        process.exit(1);
    }
})();