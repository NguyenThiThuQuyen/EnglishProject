let checkProduct = (productId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let product = await db.Temp.findOne({
                where: {id: productId}
            })
            if(product) {
                resolve(true)
            }else {
                resolve(false)
            }
        } catch(e) {
            reject(e);
        }
    })
}

let createNewTemp = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let check = await checkProduct(data.productId);
            console.log(check)
            if (check === true){
                resolve({
                    errCode: 1,
                    errMessange:'Sản phẩm này đã có đơn thu gom '
                })
            }
            else{
                await db.Temp.create({
                    productId: data.productId,
                    giverId: data.giverId,
                    date: data.date,
                    timeType: data.timeType,                
                })
                resolve({
                    errCode: 0,
                    errMessange:'OK'
                })
            }
        } catch (error) {
            reject(error)
        }

    })

}