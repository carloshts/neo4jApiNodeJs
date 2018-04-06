'use strict'

const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', 'neo4j'));
const session = driver.session();
exports.get = (req, res, next) => {
    const resultPromise = session.run('MATCH (u:Usuario) RETURN u');
    let results;
    resultPromise.then(result => {
            session.close();
            if (result.records.length > 0) {
                const node = result.records.map(function(obj) {
                    return obj._fields[0].properties;
                });
                results = node;
            }
            // on application exit:
            driver.close();
            console.log(results)
            if (results) return res.status(200).send(results);
            else res.status(204).send('Usuarios não encontrados');
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Erro ao consultar');
        });
}
exports.getById = (req, res, next) => {
    const resultPromise = session.run('MATCH (u:Usuario) WHERE ID(u)=$id RETURN u,ID(u)', { id: Number(req.params.id) });
    let results;
    resultPromise.then(result => {
            session.close();

            const singleRecord = result.records[0];
            if (singleRecord) {
                const node = singleRecord.get(0);
                results = node.properties;
            }
            // on application exit:
            driver.close();
            console.log(results)
            if (results) return res.status(200).send(results);
            else res.status(204).send('Usuario não encontrado');
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Erro ao Consultar');
        });


}
exports.post = (req, res, next) => {
    const resultPromise = session.run('CREATE (u:Usuario $data) RETURN u', { data: req.body });
    let results;
    resultPromise.then(result => {
            session.close();

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            console.log(node.properties.nome);
            results = node.properties;


            // on application exit:
            driver.close();
            console.log(results)
            res.status(201).send(results);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Erro ao salvar');
        });


}
exports.update = (req, res, next) => {
    const resultPromise = session.run('MATCH (user:Usuario) WHERE ID(user)=$id SET user = $data RETURN user,ID(user)', { id: Number(req.params.id), data: req.body });
    let results;
    resultPromise.then(result => {
            session.close();

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            console.log(node.properties.nome);
            results = node.properties;


            // on application exit:
            driver.close();
            console.log(results)
            res.status(201).send(results);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Erro ao salvar');
        });
}
exports.delete = (req, res, next) => {
    const resultPromise = session.run('MATCH (user:Usuario) WHERE ID(user)=$id DELETE user', { id: Number(req.params.id) });
    let results;
    resultPromise.then(result => {
            session.close();
            // on application exit:
            driver.close();
            res.status(200).send();
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Erro ao salvar');
        });
}