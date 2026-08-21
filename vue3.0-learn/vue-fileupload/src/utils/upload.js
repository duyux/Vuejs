import SpartMD5 from 'spark-md5'
import axios from 'axios'

//核心配置(可根据企业需求微调)
export const UPLOAD_CONFIG = {
    chunkSize: 2 * 1024 * 1024,//分片大小：2MB(适配大多数场景)
    baseUrl: '/http://localhost:3000/upload',//上传接口地址
    maxRetry: 3,//分片失败最大重试次数(企业级常用配置)
    concurrency: 3,//并发上传数(避免请求国多压垮服务器)
    retryDelay: 1000,//失败重试延迟(1秒，避免频繁重试)
}

//切割文件为分片
export function createFileChunk(file) {
    const chunks = []
    let current = 0
    while (current < file.size) {
        chunks.push({
            chunk: file.slice(current, current + UPLOAD_CONFIG.chunkSize),
            index: chunks.length,
            progress: 0//单个分片进度
        });
        current += UPLOAD_CONFIG.chunkSize;
    }
    return chunks;
}

//计算文件哈希值(秒传/断点续传校验用，优化计算速度)
export async function calculateFileHash(file, chunks) {
    return new Promise((resolve, reject) => {
        const spark = new SpartMD5.ArrayBuffer();
        const fileReader = new FileReader();
        let currentChunk = 0;

        const loadNextChunk = () => {
            if (currentChunk >= chunks.length) {
                resolve(spark.end());//计算完成，返回哈希值
                return;
            };
            //读取当前分片(ArrayBuffer格式，计算哈希更高效)
            fileReader.readAsArrayBuffer(chunks[currentChunk].chunk);
            currentChunk++;
        }
        fileReader.onload = (e) => spark.append(e.target.result);
        fileReader.onloadend = loadNextChunk;
        fileReader.onerror = (err) => reject(`哈希计算失败：${err.message}`);

        loadNextChunk();//开始读取第一个分片
    });
}

//校验文件(秒传、断点续传核心接口)
export async function checkFile(fileHash, filename) {
    try {
        const res = await axios.post(`${UPLOAD_CONFIG.bashUrl}/check`, { fileHash, filename });
        return res.data;//后端返回{isExist:boolean,uploadedChunks:[]}        
    } catch (err) {
        console.error('文件校验失败:', err);
        return { isExist: false, uploadedChunks: [] }
    }
}
//单个分片上传(带失败自动重试)
export async function uploadSingleChunk(chunkInfo,fileHash,retryCount=0){
    const {chunk,index,total}=chunkInfo;
    const formData=new FormData();
    formData.append('chunk',chunk);
    formData.append('fileHash',fileHash);
    formData.append('index',index);
    formData.append('total',total);

    try{
        const res=await axios.post(`${UPLOAD_CONFIG.bashUrl}/upload`,formData,{
            onUploadProgress:(e)=>{
                chunkInfo.progress=e.loaded/e.total*100;
            },
            timeout:30000 //超时时间30秒，适配大分片上传
        });
        return res.data;//后端返回{index:number,progress:number}
    } catch(err){
        //失败自动重试（未超过最大重试次数)
        if(retryCount<UPLOAD_CONFIG.maxRetry){
            await new Promise(resolve=>{
                setTimeout(()=>resolve(),UPLOAD_CONFIG.retryDelay);//重试延迟1秒，避免频繁重试
            });
            console.log(`分片${index}上传失败，第${retryCount+1}次重试`);
            return uploadSingleChunk(chunkInfo,fileHash,retryCount+1);
        }
        throw new Error(`分片${index}上传失败，已超过最大重试次数${UPLOAD_CONFIG.maxRetry}`);
    }
}

//合并分片(所有分片上传完成后调用)
export async function mergeChunks(fileHash,filename){
    try{
        const res=await axios.post(`${UPLOAD_CONFIG.bashUrl}/merge`,{fileHash,filename});
        return res.data;
    } catch(err){
        console.error('分片合并失败:', err);
        throw new Error(`分片合并失败,请重试`);
    }
}

//取消上传(删除后端临时分片)
export async function cancelUpload(fileHash){
    try{
        const res=await axios.post(`${UPLOAD_CONFIG.bashUrl}/cancel`,{fileHash});
        return {code:0,msg:'取消上传成功'};
    } catch(err){
        console.error('取消上传失败:', err);
        throw {code:1,msg:'取消上传失败'};
    }
}

