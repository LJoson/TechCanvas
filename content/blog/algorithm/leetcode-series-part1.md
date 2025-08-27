---
title: '📚 LeetCode刷题实战：技术废柴的算法进阶之路'
description: '从"暴力解法"到"优雅算法"，分享我在LeetCode刷题过程中的实用技巧和解题思路，记录技术废柴在算法领域的成长轨迹。'
date: '2020-06-21'
readTime: '15分钟'
tags: ['LeetCode', '算法', '数据结构', 'C++', '排序', '位运算', '哈希表', '技术废柴', '刷题技巧', '跨界探索']
category: '算法学习'
slug: 'leetcode-series-part1'
featured: false
author: 'LJoson'
status: 'published'
---

# LeetCode刷题实战：技术废柴的算法进阶之路

> 从"暴力解法"到"优雅算法"，我的LeetCode刷题进化史

## 我与LeetCode的"相爱相杀"

### 第一次"翻车"：暴力解法的灾难

还记得第一次遇到LeetCode题目时，我信心满满地开始编码：

```cpp
// 我的第一个"杰作" - 暴力解法
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> result;

        // 暴力枚举所有组合
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    result.push_back(i);
                    result.push_back(j);
                    return result;
                }
            }
        }

        return result;
    }
};
```

结果呢？时间复杂度O(n²)，空间复杂度O(1)，小数组还能跑，大数组直接超时。导师看到后直接给我发了个"🤦‍♂️"的表情："你这是在做'暴力算法灾难'吗？"

### 第二次尝试：优化算法的觉醒

好不容易学会了哈希表，我又开始挑战优化算法：

```cpp
// 我的"优化算法"杰作
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        vector<int> result;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (numMap.find(complement) != numMap.end()) {
                result.push_back(numMap[complement]);
                result.push_back(i);
                return result;
            }

            numMap[nums[i]] = i;
        }

        return result;
    }
};
```

这次好多了！时间复杂度O(n)，空间复杂度O(n)，但代码复杂度直线上升，调试困难。我的"优化算法"变成了"复杂代码"。

### 觉醒时刻：LeetCode不是刷题，是思维训练

经过无数次的"翻车"经历，我终于明白：LeetCode不仅仅是刷题，更是一种思维训练。关键是要理解问题的本质，找到最优的解决方案。

## 排序算法：从基础到实战

### 1. 选择排序：简单但低效

**问题场景：** 需要理解排序算法的基本思想

**暴力解法：**
```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}
```

**优化思路：**
- 每次选择最小元素放到前面
- 时间复杂度：O(n²)
- 空间复杂度：O(1)
- 稳定性：不稳定

**实战应用：**
```cpp
// LeetCode 912: 排序数组
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        selectionSort(nums);
        return nums;
    }

private:
    void selectionSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            swap(arr[i], arr[minIndex]);
        }
    }
};
```

### 2. 冒泡排序：稳定但低效

**问题场景：** 需要稳定的排序算法

**基础实现：**
```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // 优化：如果没有交换，说明已经有序
    }
}
```

**优化技巧：**
- 添加swapped标志，提前退出
- 记录最后一次交换位置
- 双向冒泡（鸡尾酒排序）

**实战应用：**
```cpp
// LeetCode 283: 移动零
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // 使用冒泡排序的思想，将非零元素"冒泡"到前面
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (nums[j] == 0 && nums[j + 1] != 0) {
                    swap(nums[j], nums[j + 1]);
                }
            }
        }
    }
};
```

### 3. 插入排序：小数据量的王者

**问题场景：** 小数据量或部分有序数据

**基础实现：**
```cpp
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

**优化技巧：**
- 二分查找优化插入位置
- 希尔排序（分组插入）

**实战应用：**
```cpp
// LeetCode 147: 对链表进行插入排序
class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        if (!head || !head->next) return head;

        ListNode* dummy = new ListNode(0);
        ListNode* current = head;

        while (current) {
            ListNode* next = current->next;
            ListNode* prev = dummy;

            // 找到插入位置
            while (prev->next && prev->next->val < current->val) {
                prev = prev->next;
            }

            // 插入节点
            current->next = prev->next;
            prev->next = current;
            current = next;
        }

        return dummy->next;
    }
};
```

## 位运算：高效算法的秘密武器

### 1. 异或运算：消除重复元素

**核心性质：**
- a ⊕ a = 0（相同元素异或为0）
- a ⊕ 0 = a（任何数与0异或等于本身）
- a ⊕ b ⊕ a = b（交换律和结合律）

**实战应用：**
```cpp
// LeetCode 136: 只出现一次的数字
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;  // 异或运算消除重复元素
        }
        return result;
    }
};

// LeetCode 268: 丢失的数字
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int result = nums.size();  // 从0到n，总共n+1个数
        for (int i = 0; i < nums.size(); i++) {
            result ^= i ^ nums[i];  // 异或运算找出缺失的数字
        }
        return result;
    }
};
```

### 2. 位运算技巧：状态压缩

**问题场景：** 需要表示多个状态或组合

**基础技巧：**
```cpp
// 位运算基础操作
class BitOperations {
public:
    // 检查第i位是否为1
    bool isSet(int num, int i) {
        return (num & (1 << i)) != 0;
    }

    // 设置第i位为1
    int setBit(int num, int i) {
        return num | (1 << i);
    }

    // 清除第i位
    int clearBit(int num, int i) {
        return num & ~(1 << i);
    }

    // 翻转第i位
    int toggleBit(int num, int i) {
        return num ^ (1 << i);
    }

    // 计算1的个数
    int countOnes(int num) {
        int count = 0;
        while (num) {
            count += num & 1;
            num >>= 1;
        }
        return count;
    }

    // 计算1的个数（优化版）
    int countOnesOptimized(int num) {
        int count = 0;
        while (num) {
            num &= (num - 1);  // 清除最低位的1
            count++;
        }
        return count;
    }
};
```

**实战应用：**
```cpp
// LeetCode 78: 子集
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> result;
        int n = nums.size();
        int total = 1 << n;  // 2^n个子集

        for (int i = 0; i < total; i++) {
            vector<int> subset;
            for (int j = 0; j < n; j++) {
                if (i & (1 << j)) {  // 检查第j位是否为1
                    subset.push_back(nums[j]);
                }
            }
            result.push_back(subset);
        }

        return result;
    }
};

// LeetCode 338: 比特位计数
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> result(n + 1);
        for (int i = 0; i <= n; i++) {
            result[i] = countOnes(i);
        }
        return result;
    }

private:
    int countOnes(int num) {
        int count = 0;
        while (num) {
            count += num & 1;
            num >>= 1;
        }
        return count;
    }
};
```

## 哈希表：快速查找的利器

### 1. 基础哈希表操作

**C++ STL哈希表：**
```cpp
// unordered_map基础操作
class HashTableOperations {
public:
    // 基本操作
    void basicOperations() {
        unordered_map<int, int> hashMap;

        // 插入元素
        hashMap[1] = 100;
        hashMap.insert({2, 200});
        hashMap.emplace(3, 300);

        // 查找元素
        if (hashMap.find(1) != hashMap.end()) {
            cout << "找到元素: " << hashMap[1] << endl;
        }

        // 删除元素
        hashMap.erase(1);

        // 遍历
        for (const auto& pair : hashMap) {
            cout << pair.first << ": " << pair.second << endl;
        }
    }

    // 计数
    void countElements(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        // 找出出现次数最多的元素
        int maxCount = 0;
        int maxElement = 0;
        for (const auto& pair : count) {
            if (pair.second > maxCount) {
                maxCount = pair.second;
                maxElement = pair.first;
            }
        }
    }
};
```

### 2. 哈希表实战应用

**两数之和优化：**
```cpp
// LeetCode 1: 两数之和（优化版）
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }

            numMap[nums[i]] = i;
        }

        return {};
    }
};
```

**三数之和：**
```cpp
// LeetCode 15: 三数之和
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        int n = nums.size();

        if (n < 3) return result;

        sort(nums.begin(), nums.end());  // 排序

        for (int i = 0; i < n - 2; i++) {
            // 跳过重复元素
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});

                    // 跳过重复元素
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }
};
```

## 刷题技巧：从暴力到优雅

### 1. 解题思路框架

**四步解题法：**
```cpp
class ProblemSolvingFramework {
public:
    vector<int> solveProblem(vector<int>& nums, int target) {
        // 步骤1：理解问题
        // - 输入：整数数组nums，目标值target
        // - 输出：两个数的索引，使得它们的和等于target
        // - 约束：每个输入只有一个答案，不能重复使用同一个元素

        // 步骤2：分析复杂度要求
        // - 时间复杂度：O(n)或O(n²)
        // - 空间复杂度：O(1)或O(n)

        // 步骤3：选择算法
        // - 暴力解法：O(n²)时间，O(1)空间
        // - 哈希表：O(n)时间，O(n)空间

        // 步骤4：实现代码
        return twoSumOptimized(nums, target);
    }

private:
    // 暴力解法
    vector<int> twoSumBruteForce(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }

    // 优化解法
    vector<int> twoSumOptimized(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }

            numMap[nums[i]] = i;
        }

        return {};
    }
};
```

### 2. 常见优化技巧

**双指针技巧：**
```cpp
// 双指针模板
class TwoPointers {
public:
    // 有序数组的两数之和
    vector<int> twoSumSorted(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;

        while (left < right) {
            int sum = nums[left] + nums[right];

            if (sum == target) {
                return {left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }

        return {};
    }

    // 移除重复元素
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;

        int slow = 0;
        for (int fast = 1; fast < nums.size(); fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }

        return slow + 1;
    }

    // 盛最多水的容器
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int maxArea = 0;

        while (left < right) {
            int area = min(height[left], height[right]) * (right - left);
            maxArea = max(maxArea, area);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
};
```

**滑动窗口技巧：**
```cpp
// 滑动窗口模板
class SlidingWindow {
public:
    // 最小子数组长度
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0;
        int sum = 0;
        int minLen = INT_MAX;

        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];

            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }

        return minLen == INT_MAX ? 0 : minLen;
    }

    // 无重复字符的最长子串
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> charSet;
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            while (charSet.find(s[right]) != charSet.end()) {
                charSet.erase(s[left]);
                left++;
            }

            charSet.insert(s[right]);
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};
```

## 总结与反思

### LeetCode刷题的价值

1. **算法思维训练**：培养逻辑思维和问题解决能力
2. **编程技巧提升**：掌握高效的编程技巧和方法
3. **面试准备**：为技术面试打下坚实基础
4. **代码质量**：提高代码的可读性和效率

### 我的学习心得

1. **从暴力开始**：先写暴力解法，再优化
2. **理解算法本质**：不要死记硬背，要理解原理
3. **多总结模式**：总结常见题型的解题模式
4. **坚持练习**：每天刷题，保持手感

### 给其他"废柴"的建议

1. **不要害怕困难**：算法学习需要时间和耐心
2. **保持练习**：每天刷题，保持手感
3. **学习他人**：参考优秀的解题思路和代码
4. **建立体系**：形成自己的算法知识体系

## 参考资料

- [LeetCode官方](https://leetcode.com/)
- [LeetCode中文网](https://leetcode.cn/)
- [算法可视化](https://visualgo.net/)
- [C++ STL文档](https://en.cppreference.com/)

## 结语

LeetCode刷题是一个充满挑战和乐趣的过程。从最初的"暴力解法"到后来的"优雅算法"，每一步都是思维的提升。

记住，好的算法不是一蹴而就的，而是通过不断练习和思考得来的。不要害怕犯错，不要害怕困难，每一次尝试都是学习的机会。

## 实用小贴士

### 🎯 LeetCode刷题路径
- [ ] 掌握基础数据结构（数组、链表、栈、队列）
- [ ] 学习基本算法（排序、查找、递归）
- [ ] 理解高级算法（动态规划、贪心、分治）
- [ ] 实践复杂问题（图论、字符串、数学）
- [ ] 优化算法性能（时间复杂度、空间复杂度）

### 🚀 快速开始
```cpp
// 1. 理解问题
// 2. 分析复杂度
// 3. 选择算法
// 4. 编写代码
// 5. 测试优化

// 示例：两数之和
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            numMap[nums[i]] = i;
        }
        return {};
    }
};
```

### 💡 进阶技巧
- 掌握常见算法模板
- 理解算法思想本质
- 学会复杂度分析
- 培养解题直觉
- 建立知识体系

