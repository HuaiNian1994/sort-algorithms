//这个库的算法有：
//mergeSort(arr); 
//quickSort(arr)
// bubbleSort(arr)
 //bubbleSortPlus(arr)
 //insertSort(arr)
// shellSort(arr[,n])

//归并排序:从小到大
//给出的是闭区间
function  mergeSort(arr,start,end)  {
	if(!start){
		start=0;
		end=arr.length-1;
	}
    	if (arr.length > 2) {
    		var pivot=Math.floor(arr.length/2);
    		for(var i=0,arr1=[];i<pivot;i++){
    			arr1.push(arr[i]);
    		}
        		for(var arr2=[];i<arr.length;i++){
			arr2.push(arr[i]);	
        		}
        		arr1=mergeSort(arr1,start,pivot-1);
        		arr2=mergeSort(arr2,pivot,arr.length-1);
        		return merge(arr1,arr2);
        
   	}else{
    		return arr.sort((a,b)=>a-b);
    	}
} 
function merge(arr1,arr2){
	var p1=0;
	var p2=0;
	var length=arr1.length+arr2.length;
	for(var i=0,arr=[];i<length;i++){
		if (p1==arr1.length){
			arr.push(arr2[p2]);
			p2++;
		}else if(p2==arr2.length){
			arr.push(arr1[p1]);
			p1++;
		}else{
			if(arr1[p1]<arr2[p2]){
				arr.push(arr1[p1]);
				p1++;
			}else{
				arr.push(arr2[p2]);
				p2++;
			}
		}
	}
	return arr;
}
/////////////////////////////归并排序结束,递归式快速排序开始/////////////////////////

//递归式快速排序
function quickSort(arr){//从小到大排序
	var left=[],right=[];
	var n=arr.length;
	if(n<=1){
		return arr;
	}
	// var pivot=getRandomInteger(1,n-1);
	var pivot=0;
	for(var i=0 ;i<n;i++){
		if(i==pivot) continue;
		if(arr[i]<arr[pivot]){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(arr[pivot],quickSort(right));	
}

/////////////////////////////////快速排序结束，两种冒泡排序开始/////////////////
//冒泡排序：从小到大排序
function bubbleSort(userArr){
	var temp=null;
	for(var i=0,arr=[];i<userArr.length;i++){
		arr.push(userArr[i]);
	}
	for(i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	return arr;
}

//冒泡排序plus：从小到大排序
function bubbleSortPlus(userArr){
	var temp=null;
	for(var i=0,arr=[];i<userArr.length;i++){
		arr.push(userArr[i]);
	}
	for(var i=0;i<arr.length-1;i++){ 
 	       	for(var j=i+1;j<arr.length;j++){ 
 	           		if(arr[i]>arr[j]){//如果前面的数据比后面的大就交换位置	
 	             	 		temp=arr[i]; 
 	             	 		arr[i]=arr[j]; 
 	             	 		arr[j]=temp; 
 	           		}  
 	       	} 
 	}  
 	return arr;	
}

//////////////////////两种冒泡排序结束，直接插入排序开始////////////////////
//直接插入排序,依赖于binarySearch插件
function insertSort(userArr){
	if(userArr.length==0) return [];
	for(var i=1,arr=[userArr[0]];i<userArr.length;i++){
		insert(arr,binarySearch(arr,userArr[i]),"before",userArr[i]);
	}
	return arr;
}
//要插入哪个数组、要插入的索引是多少、要插在索引前还是索引后、插入的值是多少
function insert(arr,index,position,value){
	if(index>arr.length-1) {
		arr.push(value);
		return "DONE";
	}else if(position=="before"){
		for(var i=arr.length-1;i>=index;i--){
			arr[i+1]=arr[i];
		}
		arr[index]=value;
		return "DONE";
	}else  if(position=="after"){
		for(var i=arr.length-1;i>index;i--){
			arr[i+1]=arr[i];
		}
		arr[index+1]=value;
		return "DONE";
	}
}

//////////////////////直接插入排序结束，希尔排序开始////////////////////
//shell排序
function shellSort(userArr,n){
	if(userArr.length==0||userArr.length==1) return userArr;
	if(!n||n>=userArr.length) n=Math.floor(userArr.length/3);
	for(var i=0,arr=[];i<userArr.length;i++){
		arr.push(userArr[i])
	}
	//增量每次缩小为原来的1/3，最多缩小四次
	//第一次增量：划分为n趟的直接插入排序,前n-1趟小排，最后一趟大排
	for(var k=0;k<4&&n>2;k++,n=Math.floor(n/3)){
		for(var i=0,index=[];i<arr.length;i++){
			if(i%n==0) index.push(i);
		}
		index.pop();
		for(var j=0;j<n-1;j++){
			for(var i=0,arr0=[];i<index.length;i++){
				arr0.push(arr[index[i]+j]);
			}
			arr0=insertSort(arr0);
			for(var i=0;i<arr0.length;i++){
				arr[index[i]+j]=arr0[i];
			}
		}
	}
	arr=insertSort(arr);
	return arr;
}

///////////////////////shellSort结束，插件函数开始//////////////////
//使用二分法获取value在升序数组中的位置
//若没有这个value，那么说出这个value该插在该数组的哪个索引之前,从而保证新数组仍为有序的
function binarySearch(arr,value) {
	if(arr.length==0) return 0;
	var start=0;
	var end=arr.length-1;
	var medium=Math.floor((start+end)/2);
	while(true){
		if(value==arr[medium]) return medium;
                       	if(medium==start) {
                       		if(value<arr[start]){	
                       			return start;
                       		}else if(value<=arr[end]){
                       			return end;
                       		}else {
                       			return end+1;
                       		}
                       	}
		if(value<arr[medium]){
			end=medium-1;
		}else{
			start=medium+1;
		}
		medium=Math.floor((start+end)/2);	
	}
}


//获得区间内的随机整数
function getRandomInteger(min,max){
	min=Math.ceil(min);
	max=Math.floor(max);
	return Math.floor(Math.random()*(max-min+1))+min;
}