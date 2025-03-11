#Check if Number is a Sum of Powers of Three

"""
Example 1:

Input: n = 12
Output: true
Explanation: 12 = 3^1 + 3^2
Example 2:

Input: n = 91
Output: true
Explanation: 91 = 3^0 + 3^2 + 3^4
Example 3:

Input: n = 21
Output: false

`^` - to the power
 
"""

def foo(n: int) -> bool:
    while n:
        if n % 3 > 1:
            return False
        n //= 3
    return True
    