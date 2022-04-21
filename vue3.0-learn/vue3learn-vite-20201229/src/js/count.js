import {ref} from 'vue';
function userAddClick(){

    const countv3=ref(5);

     function myFunc(){
      // alert('123')
       countv3.value+=1;
     };

     return {countv3,myFunc};
}

export default userAddClick;