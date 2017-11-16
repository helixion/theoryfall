const Powers = require('../db/models/Powers');

async function fetchAll(req, res, next) {
    try {
        const limit = req.query.limit || 50;
        const offset = req.query.page ? (req.query.page - 1) * limit : 0;

        const total = await Powers.query().count().where('is_combo_child', false).first();
        const totalPages = Math.ceil(Number(total.count) / limit);

        const meta = {
            total: Number(total.count),
            perPage: limit,
            totalPages
        };

        let results = await Powers.query()
            .eager('[class, combos.[combos.^], discipline]')
            .modifyEager('[class, discipline]', qb => qb.select('icon_svg', 'data_type', 'name', 'id'))
            .modifyEager('discipline', qb => qb.select('discipline_type'))
            .where('is_combo_child', false)
            .orderBy('name')
            .limit(limit)
            .offset(offset);


        results = results.map(data => {
            const source = data.discipline ? data.discipline : data.class;
            delete data.class;
            delete data.discipline;
            return Object.assign(data, { source });
        })    

        const powers = Object.assign({}, { results, meta });

        if (results.length > 0) {
            res.status(200).json({ powers });
        } else {
            res.sendStatus(404);
        }
    }
    catch(e) {
        console.log(e);
        next(e);
    }
}

async function fetchOne(req, res, next) {
    try {
        const power = await Powers
        .query()
        .eager('[class, combos.[combos.^], childOf.[childOf.^]]')
        .where({ slug: req.params.slug })
        .first();

        if (power) {
            res.status(200).json({ power });
        } else {
            res.sendStatus(404);
        }   
    } 
    catch(e) {
        next(e);
    }
}

module.exports = {
    fetchAll,
    fetchOne
};