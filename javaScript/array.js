/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDifference = function(nums) {
    const middle = parseInt(nums.length/2);
    // divide array into two parts
    const firstHalf = nums.slice(0, middle);
    const secondHalf = nums.slice(middle);
    // calculate the two arrays sum
    const firstHalfSum = firstHalf.reduce((a, b) => a+b);
    const secondHalfSum = secondHalf.reduce((a, b) => a+b);
    // k is the number of elements in that subset
    // index is the index of the element in the array; whether we consider that element in that array 
    const findKSum = (array, set, sum, index, k) => {
        // if the set is populated for all k elements return the set with sum
        if (k===0) return set.add(sum);
        // if index has reached array length, there are no more elements to consider
        if (index===array.length) return;
        // Array sum when we don't consider this element in k subarray
        findKSum(array, set, sum, index+1, k);
        // Array sum when we consider this element in k subarray
        findKSum(array, set, sum+array[index], index+1, k-1);
    }
    // dp such that dp[i] holds all possible sum of array of length i
    const populateArray = (array, dp, isSecondArray) => {
        for(let i=1; i<=array.length; i++) {
            // holds all possible sum of i elements; using set so that no duplicate values
            let set = new Set();
            findKSum(array, set, 0, 0, i);
            // converting set to array, since easy to sort
            set = [...set.values()];
            // sorting values of only second array as we will perform binary search on this array
            if(isSecondArray) {
                set.sort((a,b) => a-b);
            }
            dp[i] = (set);
        }
    }
    // dp[i] has the sum of subset of i elements
    // dp[0] will be 0 as the sum of 0 elements is 0
    const firstDp = [[0]];
    const secondDp = [[0]];
    populateArray(firstHalf, firstDp, false);
    populateArray(secondHalf, secondDp, true);
    let min = Infinity;
    // iterate through number elements we'll consider from first half to find the second half sum
    for (let i = 1; i<firstDp.length; i++) {
        // for each possible sum in first half for i elements
        for (const num1 of firstDp[i]) {
            // considering num1 to be a part of sum of one half; calculating the remaining sum in firstHalf that we have
            const remainingNum1 = firstHalfSum-num1;
            // remaining length from second to be considered in the sum of one half
            const remainingLength = secondHalf.length - i;
            // We have to find the minimum difference of considering num1 in one half
            // left will be 0; right will be length of secondDp of remaining length
            let left = 0;
            let right = secondDp[remainingLength].length -1;
            while(left <= right) {
                let mid = left+parseInt((right-left)/2);
                // considering mid element as num2
                const num2 = secondDp[remainingLength][mid];
                // remaining num will be part of the other array with remainingNum1
                const remainingNum2 = secondHalfSum-num2;
                const firstSum = num1+num2;
                const secondSum = remainingNum1+remainingNum2;
                // if they are equal; min difference if 0; we can return
                if(firstSum === secondSum) return 0;
                // if not; we need to check if this difference is the least and store it in min
                min = Math.min(min, Math.abs(firstSum-secondSum));
                if(firstSum > secondSum) right = mid-1;
                else left = mid+1;
            }
        }
    }
    return min;
};
let num1=[3,9,7,3];
let num2=[-36,36];
let num3=[2,-1,0,4,-2,-9];
console.log(minimumDifference(num1));
console.log(minimumDifference(num2));
console.log(minimumDifference(num3));