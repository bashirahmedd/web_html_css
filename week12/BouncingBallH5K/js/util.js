/*Clone the give object.
 * It does not cover static/shared properties of the object
 * Example:
 * var newObject = cloneObject(oldObject);
 */
function cloneObject(o) {
    function CloneTwin() {}
    CloneTwin.prototype = o;
    return new CloneTwin();
}

Util.getUniqueRandomNum=function(maxL, count){
	var randNum=0, found=false;
	var list=new Array();
	while(true){
		randNum = Math.floor(Math.random() * maxL);
		found=false;
		for(var i=0; i < list.length; ++i){ //search from existing numbers
			if(list[i]===randNum){
				found=true;
				break;
			}
		}
		
		if(!found){         //if could not find
			list.push(randNum);
		}
		
		if(list.length===count){    //if list has generated required count of numbers
			break;
		}
	}
	return list;
};