### quick intro to roadmap (Python) ###

# books i am currently using(re-reading): 
#   grokking algorithms, 
#   head first python (Paul Barry)

# worth checking: https://docs.python.org/3.12/tutorial/index.html

# off docs: https://docs.python.org/3/
# learn history of language

"""
high-level interpreted lang (release - 1991) `Guido van Rossum`
...
"""

# learn what interpreted is and why C/C++ is NOT: (below is a hint)

"""
basically, it reads and executes your code directly, one line at a time
"""

# decide why you need this (for what purpose)

"""
backend (server-side apps), big data, data science, ML/AI, etc...
"""

## section 1 ##
# ---

## learn the basics
# basic syntax

"""
this is just a set of rules that we use to create a Python program.
    Python uses indentations (to indicate a block of code)
"""

## 1 point:
# vars and data types

"""
vars (variables) - containers 
they store info (create with `=`)
you can name them as you want
also learn about `self-documenting code` or `Python clean code`
"""

var_to_store_a_number = 15
var_to_store_a_string = 'Hi!'
...

# we also have comments where you can write anything you want
# the interpreter won't read this in your code
# often uses for documentation of code

# <- single line comment

"""
also this is multiline comment
...
"""

"""# diff operators:
a = 1 + 1 == 2 # => True
b = 2 + 3 == 1 # => False
print(a, b) # => True False in console

# so 2 new things:
# `=` - this is assign operator
# `==` - this is equality operator
"""

## operators in python
# first: Arithmetic Operators: Perform basic mathematical operations.
5 + 3 # => 8, addition 
8 - 1 # => 7, subtraction
10 * 2 # => 20, multiplication
6 / 2 # => 3, division
7 // 2 # => 3, floor division

def foo(): # do not care about this
    # a bit more on floor division vs division
    5 // 3 # => 1
    -5 // 3 # => -2 
    # it rounds toward -infinity
    5.0 // 3.0 # => 1.0
    -5.0 // 3.0 # => -2.0
    # result of division is always a float
    10 / 3 # => 3.3333333333333335

7 % 3 # => 1, modulus (modulo operator)
# i % j => have the same sign as j
-7 % 3 # => 2
# modulo is just a reminder, also calculates by formula:
        # a % b => a - b * (a / b)
2 ** 3 # => 8, exponentiation (2 to the power of 3)

# enforce precedence with parentheses
1 + 3 * 2 # => 7
(1 + 3) * 2 # => 8

# boolean 