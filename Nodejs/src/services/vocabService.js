import db from "../models/index";
import bcrypt from "bcryptjs";


// let getSearchVocabFromLession = (id) => {
//     return new Promise(async(resolve, reject) => {
//         try{
//             let search = await db.Vocab.findAll({
//                 where: { lessonId: id },
//             })
//             console.log("check search", search)
//             resolve(search)
//         }
//         catch(e) {
//             reject(e)
//         }
//     })
// }

let checkVocabName = (nameVocab) => {
    return new Promise(async(resolve, reject) => {
        try
        {   
            let name = await db.Vocab.findOne({
                where: {vocab: nameVocab}
            })
            // console.log("check danh sách danh mục",name)
            if(name)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}

let getAllVocabs = (vocabId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let vocabs = '';
            if(vocabId === 'ALL') {
                vocabs = await db.Vocab.findAll({
                    include:[
                        {model: db.Lesson, as: 'lessonData1', attributes: ['lessonName']},
                        {model: db.WordMeaning, as: 'vocabData', attributes: ['wordmeaning']},
                        {model: db.VocabType, as: 'vocabData1', attributes: ['vocabType']},
                    ],
                    raw: true,
                    nest: true,
                })
            }
            if(vocabId && vocabId !== 'ALL') {
                vocabs = await db.Vocab.findOne({
                    where: { id: vocabId},
                    include:[
                        {model: db.Lesson, as: 'lessonData1', attributes: ['lessonName']},
                        {model: db.WordMeaning, as: 'vocabData', attributes: ['wordmeaning']},
                        {model: db.VocabType, as: 'vocabData1', attributes: ['vocabType']},
                    ],
                    raw: true,
                    nest: true,
                })
            }
            resolve(vocabs)
        }catch(e) {
            reject(e)
        }
    })
}

let createNewVocab = async (data) => {
    console.log('check data: ', data)
    return new Promise(async(resolve, reject) => {
        try{
            let check = await checkVocabName(data.vocab);
            if(check === true)
            {
                resolve({
                    errCode: 1,
                    errMessage: "sản phẩm da ton tai! vui long nhap sản phẩm khac"
                })
            }
            else{
                let createVocab = await db.Vocab.create({
                    vocab: data.vocab,
                    lessonId: data.lessonId
                })
                let createVocabType = await db.VocabType.create({
                    vocabType: data.vocabType,
                    vocabId: createVocab.id 
                })
                let createWordMeaning = await db.WordMeaning.create({
                    wordmeaning: data.wordmeaning,
                    vocabId: createVocab.id
                })                
            }
            resolve({
                errCode: 0,
                message: 'create a new vocab succeed!'
            });
        }catch(e){
            reject(e);
        }
    })
}
let updateVocabData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id){
                // console.log('check nodejs ', data)
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let vocab = await db.Vocab.findOne({
                    where: {id: data.id},
                    raw: false
                })
                let vocabType = await db.VocabType.findOne({
                    where: {vocabId: data.id},
                    raw: false
                })
                let wordmeaning = await db.WordMeaning.findOne({
                    where: {vocabId: data.id},
                    raw: false
                })
                
                if (vocab) {
                    vocab.vocab = data.vocab;
                    vocab.lessonId = data.lessonId;
                    await vocab.save();
                }
                if (vocabType) {
                    vocabType.vocabType =  data.vocabType,
                    vocabType.vocabId = data.vocabId 
                    await vocabType.save();
                }
                if (wordmeaning) {
                    wordmeaning.wordmeaning = data.wordmeaning;
                    wordmeaning.vocabId = data.vocabId  
                    await wordmeaning.save();
                }
                resolve({
                    errCode: 0,
                    message: 'Update the vocab succeeds!'
                });

                // else {
                //     resolve({
                //         errCode: 1,
                //         errMessage: `Vocab not found!`
                //     });
                // }
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteVocab = (vocabId) => {
    console.log('check vocabId: ', vocabId)
    return new Promise (async(resolve, reject) => {
        let foundVocab = await db.Vocab.findOne({
            where: {id: vocabId}
        })
        if(!foundVocab) {
            resolve({
                errCode: 2,
                errMessage: `The Vocab isn't exist`
            })
        }
        await db.Vocab.destroy({
            where: {id: vocabId}
        })
        await db.VocabType.destroy({
            where: {vocabId: vocabId}
        })
        await db.WordMeaning.destroy({
            where: {vocabId: vocabId}
        })
        resolve({
            errCode: 0,
            message: `The Vocab is deleted`
        })
    })
}

module.exports = {
    checkVocabName: checkVocabName,
    getAllVocabs: getAllVocabs,
    createNewVocab: createNewVocab,
    updateVocabData: updateVocabData,
    deleteVocab: deleteVocab,
    // getSearchVocabFromLession: getSearchVocabFromLession

}