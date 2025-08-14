// class Shape{
//     color:string='black';
//     constructor(color:string){
//         this.color=color;
//     }
//     getColor(){
//         return this.color;
//     }
//     switchColor(){
//         this.color=this.color==="black"?"white":"black"
//     }
// }

// class Circle extends Shape{
//     color:string='red'
//     radius:number;
//     constructor(radius:number,color:string){
//         super(color);
//         this.radius=radius;
//         this.color=color;
//     }
//     switchColor(){
//         this.color=this.color==="red"?"green":"red"
//     }
// }
// const c=new Circle(10,'black');
// console.log(c.color);  
// c.switchColor();
// console.log(c.color);

interface Color{
    color:string;
}
interface Shape{
    area():number;
}

class Circle implements Shape,Color{
    radius:number=1;
    color:string='black';

    area():number{
        return Math.PI * this.radius * this.radius;
    }
}

class Container<T>{
    constructor(private readonly data:T){}
}

//泛型类
const a=new Container<boolean>(true);
const b=new Container<number>(0);

