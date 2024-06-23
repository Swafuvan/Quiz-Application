import { faIcons, faTable, faCamera, faQuestion, faCode } from "@fortawesome/free-solid-svg-icons";


 function convertFaToText(icon){
    if(icon === faCode){
        return 'faCode';
    }else if(icon === faTable){
        return 'faTable';
    }else if(icon === faCamera){
        return 'faCamera'
    }else{
        return 'faQuestion'
    }
}

export default convertFaToText