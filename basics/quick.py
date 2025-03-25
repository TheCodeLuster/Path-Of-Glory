### quick intro to roadmap (Python) ###

# books i am currently using(re-reading): 
#   Grokking Algorithms, 
#   Head First Python (Paul Barry)

# worth checking: https://docs.python.org/3.12/tutorial/index.html

# official docs: https://docs.python.org/3/
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
True # => true
False # => false

# negative with not
not True # => false
not False# => true

# boolean operators
True and False # => False
False or True # => True
## basically it is just boolean algebra
## True and False is actually 1 and 0
True + True # => 2
True * 8 # => 8
False - 5 # => -5

# comparison operators 
0 == False # => True
2 > True # => True
2 == True # => False
-5 != False # => True

# None, 0 and empty strings/lists/dicts/tuples/sets...
# are all evaluate to False
# all other values are True
bool(0) # => False
bool("") # => False
bool([]) # => False
bool({}) # => False
bool(()) # => False
bool(set()) # => False
bool(4) # => True
bool(-5) # => True

# using boolean logical operators on ints casts them to bolleans
# for evaluation, but their non-cast values is returned.
# do not mix up with bool(ints) and bitwise and/or (&, |)
bool(0) # => False
bool(2) # => True
0 and 2 # => 0
bool(-7) # => True
bool(2) # => True
-5 or 0 # => -5

# equality is ==
1 == 1 # => True
1 == 2 # => False

# inequality is !=
1 != 1 # => False
1 != 2 # => True

# more comparisons
1 < 10 # => True 
...

# value in a range (with and)
1 < 2 and 2 < 3 # => True
2 < 3 and 3 < 2 # => False

# OR
1 < 2 < 3 # => True
2 < 3 < 2 # => False

# is vs ==
# is - checks if 2 vars refer to the same object
# == - checks of the objects pointed to have same values

p1 = [1, 2, 3, 4] # => point p1 at a new list 
p2 = p1 # => point p2 at what p1 is pointing to
p2 is p1 # => True, p2 and p1 refer to the same object
p2 == p1 # => True, p1's and p2's objects are equal 
p2 = [1, 2, 3, 4] # => point p2 at a new list
p2 is p1 # => False, p1 and p2 do not refer to the same object

# we can create a string with "" or ''
