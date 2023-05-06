
var twoSum = function(nums, target) {
  //base
  if(nums.length===2)return [0,1];
  let memo = {};

  for(let i=0; i<nums.length; i++){
    console.log(memo, 'memo nowwwwwwwww');
    console.log(i, 'iiiiiiiiiiiiiii');
      let num2 = target - nums[i];
      if(memo[num2] !== undefined){
        console.log('Entering', memo[num2]);
          return [memo[num2], i]
      }
      memo[nums[i]] = i;
      console.log('numi', memo[nums[i]]);
  }
};
console.log(twoSum([1,3,5,7,8],15))