"""
Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: ""

"""


str1 = 'ABCABC'
str2 = 'ABC'

new_str = ''
max_len = max(len(str1), len(str2))
    
for i in range(max_len):
    if str2 in str1:
        pass
        