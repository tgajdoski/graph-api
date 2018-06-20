const admin = require("firebase-admin");
var serviceAccount = require('../qnary-dev.json');
const Lodash = require("lodash");

const query = async ({id}, ctx, ref) => {
   if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    if (!Lodash.isNil(id))
        ref = ref.child(`/${id}`)
    let value = await admin.database().ref(ref).once("value")
    const res = value.val();
    if (Lodash.isNil(id))
        return Object.keys(res).map(o => 
            Object.assign({
                id: o
            }, res[o])
        );
    return Object.assign({ id: id }, res);
};

const querynokey = async ({id}, ctx, ref) => {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
     if (!Lodash.isNil(id))
         ref = ref.child(`/${id}`)
     let value = await admin.database().ref(ref).once("value")
     return value.val();
 };

const create_mutation = async ({input}, ctx, ref) => {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    return (
        new Promise((resolve) => {
            const obj = ref.push(input, () => {
                resolve(Object.assign({
                    id: obj.key
                }, input));
            });
        })
    );
};


const create_mutation_key = async ({input}, ctx, ref) => {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    let idto = input.id;
    if (Lodash.isNil(input.token))
        idto = input.token;
    return (
        new Promise((resolve) => {
            const obj = ref.set(input, () => {
                resolve(Object.assign({
                    id: idto
                }, input));
            });
        })
    );
};

const update_mutation = async ({input}, ctx, ref) => {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    const refPath = ref.child(input.id);
    return refPath.once('value')
        .then(snapshot => {
            const obj = snapshot.val();
            if (obj === null) throw new Error('404');
            return obj;
        })
        .then((obj) => {
            const update = Object.assign(obj, input);
            delete update.id;
            return refPath.set(update).then(() => (Object.assign({ id: input.id }, update)));
        });
};

const delete_mutation = async ({input}, ctx, ref) => {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    const refPath = ref.child(input.id);
    return refPath.once('value')
        .then((snapshot) => {
            const obj = snapshot.val();
            if (obj === null) throw new Error('404');
            return Object.assign({
                id: input.id
            }, obj);
        })
        .then(obj => refPath.remove().then(() => (obj)));
};


export {
    query,
    querynokey,
    create_mutation,
    create_mutation_key,
    update_mutation,
    delete_mutation
}