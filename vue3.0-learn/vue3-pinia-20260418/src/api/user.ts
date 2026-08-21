//模拟接口
export async function loginApi(data:any){
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve({token:'TOKEN_'+Date.now()})
        },300)
    })
}

export async function getUserInfoApi(){
    return new Promise(resolve =>{
        setTimeout(() =>{
            resolve({
                userInfo:{id:1,name:"管理员"},
                roles:['admin'],
                permissions:['user:add','user:edit','user:del']
            })
        },300)
    })
}

